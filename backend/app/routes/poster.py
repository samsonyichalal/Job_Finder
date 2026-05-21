import json
from fastapi import APIRouter, Depends, HTTPException, status
from app.database import get_db_connection
from app.middleware.auth_middleware import get_current_user_info
from app.models.job import JobCreateRequest, JobUpdateRequest

router = APIRouter()


def _require_poster(user_info=Depends(get_current_user_info)):
    if user_info["role"] != "job_poster":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="This area is available to job posters only.",
        )
    return user_info


def _serialize_job(row):
    job = dict(row)
    try:
        job["required_skills_json"] = json.loads(job.pop("required_skills_json", "[]"))
    except Exception:
        job["required_skills_json"] = []

    try:
        job["nice_skills_json"] = json.loads(job.pop("nice_skills_json", "[]"))
    except Exception:
        job["nice_skills_json"] = []

    return job


@router.get("/stats")
def get_poster_stats(user_info=Depends(_require_poster)):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) AS job_count FROM jobs WHERE posted_by_user_id = ?", (user_info["id"],))
    job_count = cursor.fetchone()["job_count"]
    conn.close()
    return {"job_count": job_count}


@router.get("/jobs")
def get_my_jobs(user_info=Depends(_require_poster)):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        """
        SELECT * FROM jobs
        WHERE posted_by_user_id = ?
        ORDER BY id DESC
        """,
        (user_info["id"],),
    )
    rows = cursor.fetchall()
    conn.close()
    return [_serialize_job(row) for row in rows]


@router.post("/jobs")
def create_job(job_data: JobCreateRequest, user_info=Depends(_require_poster)):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            """
            INSERT INTO jobs (
                title, industry, description, required_skills_json, nice_skills_json,
                salary_min, salary_max, currency, location, work_type, seniority_level,
                company_name, posted_by_user_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                job_data.title,
                job_data.industry,
                job_data.description,
                json.dumps([s.strip() for s in job_data.required_skills_json if s.strip()]),
                json.dumps([s.strip() for s in (job_data.nice_skills_json or []) if s.strip()]),
                job_data.salary_min,
                job_data.salary_max,
                job_data.currency,
                job_data.location,
                job_data.work_type,
                job_data.seniority_level,
                job_data.company_name or "",
                user_info["id"],
            ),
        )
        conn.commit()
        return {"success": True, "job_id": cursor.lastrowid}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    finally:
        conn.close()


@router.put("/jobs/{job_id}")
def update_job(job_id: int, job_data: JobUpdateRequest, user_info=Depends(_require_poster)):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM jobs WHERE id = ? AND posted_by_user_id = ?", (job_id, user_info["id"]))
    if not cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")

    payload = job_data.model_dump(exclude_none=True)
    if not payload:
        conn.close()
        return {"success": True, "message": "No fields updated."}

    field_mappings = {
        "required_skills_json": lambda value: json.dumps([s.strip() for s in value if s.strip()]),
        "nice_skills_json": lambda value: json.dumps([s.strip() for s in value if s.strip()]),
    }

    update_parts = []
    values = []
    for key, value in payload.items():
        update_parts.append(f"{key} = ?")
        values.append(field_mappings[key](value) if key in field_mappings else value)

    values.append(job_id)
    try:
        cursor.execute(f"UPDATE jobs SET {', '.join(update_parts)} WHERE id = ?", tuple(values))
        conn.commit()
        return {"success": True}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    finally:
        conn.close()


@router.delete("/jobs/{job_id}")
def delete_job(job_id: int, user_info=Depends(_require_poster)):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM jobs WHERE id = ? AND posted_by_user_id = ?", (job_id, user_info["id"]))
    if not cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")

    try:
        cursor.execute("DELETE FROM jobs WHERE id = ?", (job_id,))
        conn.commit()
        return {"success": True}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    finally:
        conn.close()