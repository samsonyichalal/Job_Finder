import os
import json
import anthropic
from dotenv import load_dotenv
from typing import Dict, Any, List

load_dotenv()

API_KEY = os.getenv("ANTHROPIC_API_KEY", "your_key_here")

def call_claude(system_prompt: str, user_prompt: str) -> str:
    # Check if a real key is present
    if not API_KEY or API_KEY == "your_key_here":
        raise ValueError("Missing Anthropic API Key")
        
    client = anthropic.Anthropic(api_key=API_KEY)
    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1500,
        system=system_prompt,
        messages=[{"role": "user", "content": user_prompt}]
    )
    return message.content[0].text

def analyze_resume(resume_text: str, user_profile: Dict[str, Any]) -> Dict[str, Any]:
    system_prompt = (
        "You are an expert ATS resume checker and career coach. Your task is to analyze the user's resume text "
        "and their profile, and return a JSON object with: score (integer 0-100), strengths (list of strings), "
        "weaknesses (list of strings), ats_keywords (list of missing keywords as strings), "
        "improved_bullets (list of objects with original and improved keys), and missing_sections (list of strings). "
        "Only output valid JSON. No other text."
    )
    
    user_prompt = f"Resume:\n{resume_text}\n\nUser Profile:\n{json.dumps(user_profile)}"
    
    response_text = call_claude(system_prompt, user_prompt)
    if "```json" in response_text:
        response_text = response_text.split("```json")[1].split("```")[0].strip()
    elif "```" in response_text:
        response_text = response_text.split("```")[1].split("```")[0].strip()
    return json.loads(response_text)

def generate_career_paths(profile: Dict[str, Any]) -> List[Dict[str, Any]]:
    system_prompt = (
        "You are an expert career advisory coach. Review the user's profile and recommend 3 logical career trajectory paths "
        "as a JSON list. Each path must be an object with keys: path_name, description, why_it_fits, and steps. "
        "steps is a list of 4 objects representing Entry, Mid, Senior, Peak levels. "
        "Each step object has keys: role, timeline, and salary_range. "
        "Only output valid JSON. No other text."
    )
    user_prompt = f"User Profile:\n{json.dumps(profile)}"
    
    response_text = call_claude(system_prompt, user_prompt)
    if "```json" in response_text:
        response_text = response_text.split("```json")[1].split("```")[0].strip()
    elif "```" in response_text:
        response_text = response_text.split("```")[1].split("```")[0].strip()
    return json.loads(response_text)

def estimate_salary(role: str, location: str, level: str) -> Dict[str, Any]:
    system_prompt = (
        "You are an expert compensation researcher. Given a job role, location, and seniority level, "
        "estimate the salary range in USD and return a JSON object with: "
        "min (integer), max (integer), median (integer), currency (string), and disclaimer (string). "
        "Only output valid JSON. No other text."
    )
    user_prompt = f"Role: {role}, Location: {location}, Level: {level}"
    
    response_text = call_claude(system_prompt, user_prompt)
    if "```json" in response_text:
        response_text = response_text.split("```json")[1].split("```")[0].strip()
    elif "```" in response_text:
        response_text = response_text.split("```")[1].split("```")[0].strip()
    return json.loads(response_text)

def recommend_courses(skill_gaps: List[str]) -> List[Dict[str, Any]]:
    system_prompt = (
        "You are an academic curriculum designer. Given a list of user skill gaps, recommend learning resources "
        "and return a JSON list of objects. Each object has: skill_gap (string) and courses (list of objects "
        "with title, platform, url, duration_hours, cost_type, cost_amount, rating). "
        "Only output valid JSON. No other text."
    )
    user_prompt = f"Skill Gaps: {json.dumps(skill_gaps)}"
    
    response_text = call_claude(system_prompt, user_prompt)
    if "```json" in response_text:
        response_text = response_text.split("```json")[1].split("```")[0].strip()
    elif "```" in response_text:
        response_text = response_text.split("```")[1].split("```")[0].strip()
    return json.loads(response_text)

def generate_job_explanation(job: Dict[str, Any], profile: Dict[str, Any]) -> str:
    system_prompt = (
        "You are a talent recruiter. Summarize in exactly 2-3 sentences why this job is a great match "
        "based on the user's skills and goals, and highlight one area of growth or next steps."
    )
    user_prompt = f"Job:\n{json.dumps(job)}\n\nProfile:\n{json.dumps(profile)}"
    
    try:
        return call_claude(system_prompt, user_prompt)
    except Exception:
        # Dynamic, contextual mock explanation
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
