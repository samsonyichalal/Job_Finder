from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import database
from app.utils import seed_data
from app.routes import auth, profile, jobs, career, skills, resume, salary, courses

app = FastAPI(
    title="Career Compass API",
    description="Fullstack AI-Powered Career Recommendation & Job Matching Engine",
    version="1.0.0"
)

# CORS configuration
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup events
@app.on_event("startup")
def startup_db():
    print("Database initialization starting...")
    database.create_all_tables()
    seed_data.seed()
    print("Startup complete.")

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(profile.router, prefix="/api/profile", tags=["User Profile"])
app.include_router(jobs.router, prefix="/api/jobs", tags=["Job Matches"])
app.include_router(career.router, prefix="/api/career", tags=["Career Trajectories"])
app.include_router(skills.router, prefix="/api/skills", tags=["Skills Gap Analysis"])
app.include_router(resume.router, prefix="/api/resume", tags=["Resume Analysis"])
app.include_router(salary.router, prefix="/api/salary", tags=["Salary Insights"])
app.include_router(courses.router, prefix="/api/courses", tags=["Courses Recommendations"])

@app.get("/")
def read_root():
    return {"status": "online", "service": "Career Compass API"}
