import json
from fastapi import APIRouter, Depends, HTTPException, status
from app.database import get_db_connection
from app.middleware.auth_middleware import get_current_user_info

router = APIRouter()


def _require_admin(user_info=Depends(get_current_user_info)):
    if user_info["role"] != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required.")
    return user_info


def _serialize_course(row):
    course = dict(row)
    try:
        course["skill_tags_json"] = json.loads(course.get("skill_tags_json") or "[]")
    except Exception:
        course["skill_tags_json"] = []
    return course


def _serialize_job(row):
    job = dict(row)
    try:
        job["required_skills_json"] = json.loads(job.get("required_skills_json") or "[]")
    except Exception:
        job["required_skills_json"] = []
    try:
        job["nice_skills_json"] = json.loads(job.get("nice_skills_json") or "[]")
    except Exception:
        job["nice_skills_json"] = []
    return job


@router.get("/stats")
def get_admin_stats(user_info=Depends(_require_admin)):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) AS total FROM users")
    users_total = cursor.fetchone()["total"]
    cursor.execute("SELECT COUNT(*) AS total FROM users WHERE role = 'job_finder'")
    finders = cursor.fetchone()["total"]
    cursor.execute("SELECT COUNT(*) AS total FROM users WHERE role = 'job_poster'")
    posters = cursor.fetchone()["total"]
    cursor.execute("SELECT COUNT(*) AS total FROM users WHERE role = 'admin'")
    admins = cursor.fetchone()["total"]
    cursor.execute("SELECT COUNT(*) AS total FROM jobs")
    jobs = cursor.fetchone()["total"]
    cursor.execute("SELECT COUNT(*) AS total FROM courses")
    courses = cursor.fetchone()["total"]

    conn.close()
    return {
        "users_total": users_total,
        "job_finders": finders,
        "job_posters": posters,
        "admins": admins,
        "jobs": jobs,
        "courses": courses,
    }


@router.get("/users")
def list_users(user_info=Depends(_require_admin)):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        """
        SELECT u.id, u.email, u.role, u.created_at, p.full_name
        FROM users u
        LEFT JOIN profiles p ON p.user_id = u.id
        ORDER BY u.id DESC
        """
    )
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]


@router.put("/users/{target_user_id}/role")
def update_user_role(target_user_id: int, payload: dict, user_info=Depends(_require_admin)):
    role = payload.get("role")
    if role not in {"job_finder", "job_poster", "admin"}:
        raise HTTPException(status_code=400, detail="Invalid role.")

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM users WHERE id = ?", (target_user_id,))
    if not cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=404, detail="User not found.")

    cursor.execute("UPDATE users SET role = ? WHERE id = ?", (role, target_user_id))
    conn.commit()
    conn.close()
    return {"success": True}


@router.get("/jobs")
def list_jobs(user_info=Depends(_require_admin)):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        """
        SELECT j.*, u.email AS posted_by_email
        FROM jobs j
        LEFT JOIN users u ON u.id = j.posted_by_user_id
        ORDER BY j.id DESC
        """
    )
    rows = cursor.fetchall()
    conn.close()
    return [_serialize_job(row) for row in rows]


@router.delete("/jobs/{job_id}")
def delete_job(job_id: int, user_info=Depends(_require_admin)):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM jobs WHERE id = ?", (job_id,))
    if not cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=404, detail="Job not found.")

    cursor.execute("DELETE FROM jobs WHERE id = ?", (job_id,))
    conn.commit()
    conn.close()
    return {"success": True}


@router.get("/courses")
def list_courses(user_info=Depends(_require_admin)):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM courses ORDER BY id DESC")
    rows = cursor.fetchall()
    conn.close()
    return [_serialize_course(row) for row in rows]


@router.post("/courses")
def create_course(payload: dict, user_info=Depends(_require_admin)):
    required_fields = ["title", "platform", "url", "skill_tags_json", "duration_hours", "cost_type", "cost_amount", "level", "rating"]
    if any(field not in payload for field in required_fields):
        raise HTTPException(status_code=400, detail="Missing required course fields.")

    skill_tags = payload.get("skill_tags_json") or []
    if not isinstance(skill_tags, list):
        raise HTTPException(status_code=400, detail="skill_tags_json must be a list.")

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        """
        INSERT INTO courses (title, platform, url, skill_tags_json, duration_hours, cost_type, cost_amount, level, rating)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            payload["title"],
            payload["platform"],
            payload["url"],
            json.dumps(skill_tags),
            float(payload["duration_hours"]),
            payload["cost_type"],
            float(payload["cost_amount"]),
            payload["level"],
            float(payload["rating"]),
        ),
    )
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    return {"success": True, "course_id": new_id}


@router.delete("/courses/{course_id}")
def delete_course(course_id: int, user_info=Depends(_require_admin)):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM courses WHERE id = ?", (course_id,))
    if not cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=404, detail="Course not found.")

    cursor.execute("DELETE FROM courses WHERE id = ?", (course_id,))
    conn.commit()
    conn.close()
    return {"success": True}