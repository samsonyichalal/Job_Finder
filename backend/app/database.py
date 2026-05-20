import os
import sqlite3
from dotenv import load_dotenv

load_dotenv()

# Determine database path
DB_PATH = os.getenv("DATABASE_PATH", "database/career_compass.db")

def get_db_connection():
    # Make sure parent directory exists
    dir_name = os.path.dirname(DB_PATH)
    if dir_name and not os.path.exists(dir_name):
        os.makedirs(dir_name, exist_ok=True)
    
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON;")
    return conn

def create_all_tables():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # 1. users
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)
    
    # 2. profiles
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER UNIQUE NOT NULL,
        full_name TEXT NOT NULL,
        location TEXT,
        work_preference TEXT,
        skills_json TEXT,       -- Stores skills list as JSON string
        education_json TEXT,    -- Stores education list as JSON string
        experience_json TEXT,   -- Stores work experience list as JSON string
        interests_json TEXT,    -- Stores interests as JSON string
        short_term_goal TEXT,
        long_term_goal TEXT,
        current_salary REAL,
        desired_salary REAL,
        currency TEXT DEFAULT 'USD',
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    """)
    
    # 3. jobs
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        industry TEXT NOT NULL,
        description TEXT,
        required_skills_json TEXT,
        nice_skills_json TEXT,
        salary_min REAL,
        salary_max REAL,
        currency TEXT DEFAULT 'USD',
        location TEXT,
        work_type TEXT,            -- e.g. remote, hybrid, on-site
        seniority_level TEXT       -- e.g. entry, mid, senior, lead
    );
    """)
    
    # 4. resumes
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS resumes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        raw_text TEXT NOT NULL,
        score REAL,
        feedback_json TEXT,
        improved_bullets_json TEXT,
        ats_keywords_json TEXT,
        analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    """)
    
    # 5. courses
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        platform TEXT NOT NULL,
        url TEXT,
        skill_tags_json TEXT,
        duration_hours REAL,
        cost_type TEXT,            -- e.g. free, paid
        cost_amount REAL,
        level TEXT,                -- e.g. beginner, intermediate, advanced, all
        rating REAL
    );
    """)
    
    # 6. saved_courses
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS saved_courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        course_id INTEGER NOT NULL,
        status TEXT DEFAULT 'saved', -- e.g. saved, in-progress, completed
        saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY(course_id) REFERENCES courses(id) ON DELETE CASCADE,
        UNIQUE(user_id, course_id)
    );
    """)
    
    conn.commit()
    conn.close()
    print("Database tables verified/created successfully.")
