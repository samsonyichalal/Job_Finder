from fastapi import APIRouter, Depends, HTTPException
from app.database import get_db_connection
from app.middleware.auth_middleware import get_current_user_id

router = APIRouter()

@router.get("/estimate")
def get_salary_estimate(role: str = "", location: str = "", level: str = "mid", user_id: int = Depends(get_current_user_id)):
    if not role:
        raise HTTPException(
            status_code=400,
            detail="Role parameter is required."
        )

    conn = get_db_connection()
    cursor = conn.cursor()

    query = "SELECT salary_min, salary_max, currency, location, seniority_level FROM jobs WHERE LOWER(title) LIKE ?"
    params = [f"%{role.lower()}%"]

    if location:
        query += " AND LOWER(location) LIKE ?"
        params.append(f"%{location.lower()}%")
    if level:
        query += " AND LOWER(seniority_level) = ?"
        params.append(level.lower())

    cursor.execute(query, tuple(params))
    rows = cursor.fetchall()
    conn.close()

    if not rows:
        raise HTTPException(
            status_code=404,
            detail="No salary data found for the selected filters. Ask an admin to add matching job data.",
        )

    mins = [float(r["salary_min"]) for r in rows if r["salary_min"] is not None]
    maxs = [float(r["salary_max"]) for r in rows if r["salary_max"] is not None]
    if not mins or not maxs:
        raise HTTPException(status_code=404, detail="Matching jobs do not contain salary ranges.")

    min_val = int(min(mins))
    max_val = int(max(maxs))
    median_val = int((min_val + max_val) / 2)

    return {
        "role": role,
        "location": location or "Any",
        "level": level or "any",
        "min": min_val,
        "max": max_val,
        "median": median_val,
        "currency": rows[0]["currency"] or "USD",
        "disclaimer": "Derived from live jobs in your database.",
    }
