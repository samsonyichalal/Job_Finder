import json
import os
from typing import Any, Dict, List

from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash-lite")

_GEMINI_CLIENT = None

def _get_gemini_client():
    global _GEMINI_CLIENT
    if not GEMINI_API_KEY:
        raise ValueError("Missing Gemini API Key")
    if _GEMINI_CLIENT is None:
        _GEMINI_CLIENT = genai.Client(api_key=GEMINI_API_KEY)
    return _GEMINI_CLIENT


def _extract_response_text(response: Any) -> str:
    text = getattr(response, "text", None)
    if text:
        return text.strip()

    candidates = getattr(response, "candidates", None) or []
    for candidate in candidates:
        content = getattr(candidate, "content", None)
        parts = getattr(content, "parts", None) or []
        for part in parts:
            part_text = getattr(part, "text", None)
            if part_text:
                return part_text.strip()

    return ""


def _strip_code_fences(text: str) -> str:
    cleaned = text.strip()
    if "```json" in cleaned:
        cleaned = cleaned.split("```json", 1)[1]
    elif "```" in cleaned:
        cleaned = cleaned.split("```", 1)[1]

    if "```" in cleaned:
        cleaned = cleaned.split("```", 1)[0]

    return cleaned.strip()


def call_gemini(system_prompt: str, user_prompt: str, response_mime_type: str = "text/plain") -> str:
    client = _get_gemini_client()
    config = types.GenerateContentConfig(
        system_instruction=system_prompt,
        temperature=0.2,
        response_mime_type=response_mime_type,
    )
    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=user_prompt,
        config=config,
    )
    return _extract_response_text(response)

def analyze_resume(resume_text: str, user_profile: Dict[str, Any]) -> Dict[str, Any]:
    system_prompt = (
        "You are an expert ATS resume checker and career coach. Your task is to analyze the user's resume text "
        "and their profile, and return a JSON object with: score (integer 0-100), strengths (list of strings), "
        "weaknesses (list of strings), ats_keywords (list of missing keywords as strings), "
        "improved_bullets (list of objects with original and improved keys), and missing_sections (list of strings). "
        "Only output valid JSON. No other text."
    )
    
    user_prompt = f"Resume:\n{resume_text}\n\nUser Profile:\n{json.dumps(user_profile)}"
    
    response_text = call_gemini(system_prompt, user_prompt, response_mime_type="application/json")
    return json.loads(_strip_code_fences(response_text))

def generate_career_paths(profile: Dict[str, Any]) -> List[Dict[str, Any]]:
    system_prompt = (
        "You are an expert career advisory coach. Review the user's profile and recommend 3 logical career trajectory paths "
        "as a JSON list. Each path must be an object with keys: path_name, description, why_it_fits, and steps. "
        "steps is a list of 4 objects representing Entry, Mid, Senior, Peak levels. "
        "Each step object has keys: role, timeline, and salary_range. "
        "Only output valid JSON. No other text."
    )
    user_prompt = f"User Profile:\n{json.dumps(profile)}"
    
    response_text = call_gemini(system_prompt, user_prompt, response_mime_type="application/json")
    return json.loads(_strip_code_fences(response_text))

def estimate_salary(role: str, location: str, level: str) -> Dict[str, Any]:
    system_prompt = (
        "You are an expert compensation researcher. Given a job role, location, and seniority level, "
        "estimate the salary range in USD and return a JSON object with: "
        "min (integer), max (integer), median (integer), currency (string), and disclaimer (string). "
        "Only output valid JSON. No other text."
    )
    user_prompt = f"Role: {role}, Location: {location}, Level: {level}"
    
    response_text = call_gemini(system_prompt, user_prompt, response_mime_type="application/json")
    return json.loads(_strip_code_fences(response_text))

def recommend_courses(skill_gaps: List[str]) -> List[Dict[str, Any]]:
    system_prompt = (
        "You are an academic curriculum designer. Given a list of user skill gaps, recommend learning resources "
        "and return a JSON list of objects. Each object has: skill_gap (string) and courses (list of objects "
        "with title, platform, url, duration_hours, cost_type, cost_amount, rating). "
        "Only output valid JSON. No other text."
    )
    user_prompt = f"Skill Gaps: {json.dumps(skill_gaps)}"
    
    response_text = call_gemini(system_prompt, user_prompt, response_mime_type="application/json")
    return json.loads(_strip_code_fences(response_text))

def generate_job_explanation(job: Dict[str, Any], profile: Dict[str, Any]) -> str:
    system_prompt = (
        "You are a talent recruiter. Summarize in exactly 2-3 sentences why this job is a great match "
        "based on the user's skills and goals, and highlight one area of growth or next steps."
    )
    user_prompt = f"Job:\n{json.dumps(job)}\n\nProfile:\n{json.dumps(profile)}"
    
    try:
        return call_gemini(system_prompt, user_prompt)
    except Exception:
        title = job.get("title", "Software Engineer")
        company = job.get("industry", "Tech")
        req_skills = job.get("required_skills", [])
        user_skills = profile.get("skills", [])
        
        user_skills_lower = [s.lower() for s in user_skills]
        matched = [s for s in req_skills if s.lower() in user_skills_lower]
        missing = [s for s in req_skills if s.lower() not in user_skills_lower]
        
        text = f"This {title} position in the {company} industry matches your background beautifully since you already have {', '.join(matched[:2])} in your toolbox. "
        if missing:
            text += f"To fully satisfy their engineering team, we recommend brushing up on {missing[0]} to bridge the remaining technical gap. "
        text += f"The offered range of ${int(job.get('salary_min', 0)):,} - ${int(job.get('salary_max', 0)):,} aligns well with your trajectory."
        return text
