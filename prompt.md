## 🧠 PROJECT CONTEXT

I have a fullstack project called "job recommendation" on my MacBook.
The root structure already exists as:

job recommendation/
├── backend/     ← Python project with venv already created
└── frontend/    ← React project already created

My OS is macOS. I am using:
- Python (venv already set up in /backend)
- React (already scaffolded in /frontend)
- SQLite3 as the database (no external DB server needed)
- Anthropic Claude API as the AI engine

Your job is to FULLY build this project end-to-end — every file,
every folder, every line of code. Do not skip anything. Do not use
placeholders. Every file must be complete and runnable.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🗂️ STEP 1 — FINAL FOLDER STRUCTURE TO CREATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### BACKEND — /backend

backend/
├── venv/                          ← already exists, do not touch
├── app/
│   ├── __init__.py
│   ├── main.py                    ← FastAPI app entry point
│   ├── database.py                ← SQLite3 connection + table creation
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py                ← User model (id, email, password_hash)
│   │   ├── profile.py             ← Profile model (skills, education, etc.)
│   │   ├── job.py                 ← Job model (title, skills, salary range)
│   │   ├── resume.py              ← Resume model (raw text, ai feedback)
│   │   └── course.py              ← Course model (title, platform, skill tags)
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── auth.py                ← POST /auth/register, /auth/login
│   │   ├── profile.py             ← GET/POST/PUT /api/profile
│   │   ├── jobs.py                ← GET /api/jobs/match
│   │   ├── career.py              ← GET /api/career/paths
│   │   ├── skills.py              ← GET /api/skills/gap
│   │   ├── resume.py              ← POST /api/resume/analyze
│   │   ├── salary.py              ← GET /api/salary/estimate
│   │   └── courses.py             ← GET /api/courses/recommend
│   ├── services/
│   │   ├── __init__.py
│   │   ├── ai_service.py          ← All Anthropic Claude API calls
│   │   ├── matching_engine.py     ← Job matching scoring algorithm
│   │   ├── resume_parser.py       ← Extract text from resume input
│   │   └── salary_estimator.py    ← Salary range lookup logic
│   ├── middleware/
│   │   ├── __init__.py
│   │   └── auth_middleware.py     ← JWT token verification
│   └── utils/
│       ├── __init__.py
│       ├── jwt_handler.py         ← Generate and decode JWT tokens
│       ├── password_hasher.py     ← bcrypt hash and verify
│       └── seed_data.py           ← Seed SQLite with jobs + courses data
├── database/
│   └── career_compass.db          ← SQLite3 database file (auto-created)
├── requirements.txt               ← All Python dependencies
├── .env                           ← ANTHROPIC_API_KEY, JWT_SECRET
└── run.py                         ← Entry point: uvicorn app.main:app

### FRONTEND — /frontend

frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── main.jsx                   ← React DOM entry
│   ├── App.jsx                    ← Router setup with all routes
│   ├── index.css                  ← Tailwind base + custom CSS vars
│   │
│   ├── pages/
│   │   ├── Landing.jsx            ← Hero section, features, CTA button
│   │   ├── Login.jsx              ← Login form page
│   │   ├── Register.jsx           ← Register form page
│   │   ├── Onboarding.jsx         ← 5-step profile wizard
│   │   ├── Dashboard.jsx          ← Main hub with summary cards
│   │   ├── JobMatches.jsx         ← Job cards with match scores
│   │   ├── CareerPaths.jsx        ← Career trajectory cards
│   │   ├── SkillGap.jsx           ← Radar chart + skill gap list
│   │   ├── ResumeAnalyzer.jsx     ← Paste resume + AI feedback
│   │   ├── SalaryInsights.jsx     ← Bar charts + salary ranges
│   │   └── Courses.jsx            ← Recommended courses list
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx         ← Top nav with logo + user menu
│   │   │   ├── Sidebar.jsx        ← Collapsible left sidebar
│   │   │   └── Footer.jsx         ← Simple footer
│   │   ├── ui/
│   │   │   ├── Button.jsx         ← Reusable button (variants: primary/ghost)
│   │   │   ├── Card.jsx           ← Base card wrapper with shadow
│   │   │   ├── Badge.jsx          ← Colored badge (High/Medium/Low)
│   │   │   ├── Input.jsx          ← Styled input with label + error
│   │   │   ├── Modal.jsx          ← Overlay modal with backdrop
│   │   │   ├── Loader.jsx         ← Spinning loader + skeleton variants
│   │   │   └── ProgressBar.jsx    ← Step progress indicator
│   │   ├── charts/
│   │   │   ├── RadarChart.jsx     ← Skills coverage radar (Recharts)
│   │   │   ├── SalaryBarChart.jsx ← Horizontal salary range bars
│   │   │   └── MatchDonut.jsx     ← Donut chart for match score
│   │   ├── cards/
│   │   │   ├── JobCard.jsx        ← Job match card with expand
│   │   │   ├── CourseCard.jsx     ← Course recommendation card
│   │   │   ├── PathCard.jsx       ← Career path timeline card
│   │   │   └── StatCard.jsx       ← Dashboard stat card (icon + number)
│   │   └── forms/
│   │       ├── StepWizard.jsx     ← Multi-step form shell
│   │       ├── SkillsInput.jsx    ← Tag-style skill input
│   │       └── ResumeTextArea.jsx ← Large paste area for resume
│   │
│   ├── context/
│   │   ├── AuthContext.jsx        ← Login state + token storage
│   │   └── UserContext.jsx        ← Global profile state
│   │
│   ├── hooks/
│   │   ├── useAuth.js             ← Login/logout/register logic
│   │   ├── useProfile.js          ← Fetch and update profile
│   │   ├── useJobs.js             ← Fetch job matches
│   │   ├── useSkillGap.js         ← Fetch skill gap analysis
│   │   └── useResume.js           ← Post resume + get AI feedback
│   │
│   ├── services/
│   │   ├── api.js                 ← Axios instance (baseURL + interceptors)
│   │   ├── authService.js         ← Login, register, logout API calls
│   │   └── careerService.js       ← All career-related API calls
│   │
│   └── utils/
│       ├── formatSalary.js        ← Currency and number formatting
│       ├── matchScore.js          ← Score to label (High/Med/Low)
│       └── constants.js           ← API base URL, color maps, etc.
│
├── .env                           ← VITE_API_BASE_URL=http://localhost:8000
├── tailwind.config.js             ← Tailwind custom theme config
├── postcss.config.js
└── package.json                   ← All dependencies listed

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🐍 STEP 2 — BACKEND SETUP (Python + FastAPI + SQLite3)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Activate venv and install dependencies
Run these commands from /backend:
  source venv/bin/activate
  pip install fastapi uvicorn python-dotenv anthropic
               pyjwt bcrypt python-multipart aiofiles

### requirements.txt must contain EXACT versions:
  fastapi==0.115.0
  uvicorn==0.30.6
  python-dotenv==1.0.1
  anthropic==0.34.2
  PyJWT==2.9.0
  bcrypt==4.2.0
  python-multipart==0.0.12
  aiofiles==24.1.0

### database.py — SQLite3 setup
Create all tables on app startup using raw SQL (no ORM):

Tables to create:
  users         (id, email, password_hash, created_at)
  profiles      (id, user_id, full_name, location, work_preference,
                 skills_json, education_json, experience_json,
                 interests_json, short_term_goal, long_term_goal,
                 current_salary, desired_salary, currency)
  jobs          (id, title, industry, description, required_skills_json,
                 nice_skills_json, salary_min, salary_max, currency,
                 location, work_type, seniority_level)
  resumes       (id, user_id, raw_text, score, feedback_json,
                 improved_bullets_json, ats_keywords_json, analyzed_at)
  courses       (id, title, platform, url, skill_tags_json,
                 duration_hours, cost_type, cost_amount, level, rating)
  saved_courses (id, user_id, course_id, status, saved_at)

All JSON fields store Python dicts/lists as JSON strings.
Use sqlite3 module directly — NOT SQLAlchemy.

### main.py — FastAPI App
  - Include CORS middleware (allow origins: http://localhost:5173)
  - Register all routers with prefix /api
  - On startup: call database.create_all_tables()
  - On startup: call seed_data.seed() if tables are empty

### JWT Auth Flow
  - Register: hash password with bcrypt, insert user, return JWT
  - Login: verify password, return access token (exp: 24h)
  - Protected routes: decode JWT from Authorization: Bearer header
  - jwt_handler.py: create_token(user_id) and decode_token(token)

### AI Service — ai_service.py
  All Claude calls use anthropic Python SDK:

  import anthropic
  client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

  def call_claude(system_prompt: str, user_prompt: str) -> str:
    message = client.messages.create(
      model="claude-sonnet-4-20250514",
      max_tokens=1000,
      system=system_prompt,
      messages=[{"role": "user", "content": user_prompt}]
    )
    return message.content[0].text

  Functions to implement:
    analyze_resume(resume_text, user_profile) -> dict
    generate_career_paths(profile) -> list
    estimate_salary(role, location, level) -> dict
    recommend_courses(skill_gaps) -> list
    generate_job_explanation(job, profile) -> str

### Matching Engine — matching_engine.py
  Score formula (returns 0–100):
    base_score = (len(matched_skills) / len(required_skills)) * 70
    level_bonus = 15 if user_level matches job_level else 0
    edu_bonus   = 15 if education field relevant to job else 0
    total = base_score + level_bonus + edu_bonus

  Label: score >= 75 → "High", 50–74 → "Medium", < 50 → "Low"

### Seed Data — seed_data.py
  Insert at least:
  - 30 diverse job records across tech, healthcare, finance,
    education, creative fields, engineering
  - 50 course records across platforms:
    Coursera, Udemy, edX, YouTube, freeCodeCamp, LinkedIn Learning
  - Skill tags must match skills used in job records

### API Routes — full list with request/response shapes:

POST /auth/register
  Body: { email, password, full_name }
  Returns: { token, user_id }

POST /auth/login
  Body: { email, password }
  Returns: { token, user_id }

GET /api/profile
  Headers: Authorization: Bearer <token>
  Returns: full profile object or null

POST /api/profile
  Headers: Authorization: Bearer <token>
  Body: full profile JSON
  Returns: { success: true, profile_id }

PUT /api/profile
  Headers: Authorization: Bearer <token>
  Body: partial profile fields to update
  Returns: { success: true }

GET /api/jobs/match
  Headers: Authorization: Bearer <token>
  Returns: [{ job, match_score, match_label, matched_skills,
               missing_skills, explanation }] top 10

GET /api/career/paths
  Headers: Authorization: Bearer <token>
  Returns: [{ path_name, description, steps: [{role, timeline,
               salary_range}], why_it_fits }]

GET /api/skills/gap
  Headers: Authorization: Bearer <token>
  Query: ?job_id=xxx (optional)
  Returns: { has: [], missing: [{ skill, priority, learn_time }],
              partial: [] }

POST /api/resume/analyze
  Headers: Authorization: Bearer <token>
  Body: { resume_text: string }
  Returns: { score, strengths, weaknesses, ats_keywords,
              improved_bullets: [{original, improved}],
              missing_sections }

GET /api/salary/estimate
  Headers: Authorization: Bearer <token>
  Query: ?role=xxx&location=yyy&level=zzz
  Returns: { role, location, level, min, max, median, currency,
              disclaimer }

GET /api/courses/recommend
  Headers: Authorization: Bearer <token>
  Returns: [{ skill_gap, courses: [{title, platform, url,
               duration_hours, cost_type, cost_amount, rating}] }]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚛️ STEP 3 — FRONTEND SETUP (React + Vite + Tailwind)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Install all dependencies from /frontend:
  npm install axios react-router-dom recharts
              @headlessui/react framer-motion
              lucide-react clsx tailwind-merge

### tailwind.config.js — Custom Theme
  colors:
    primary:    #4F46E5  (Indigo)
    secondary:  #7C3AED  (Purple)
    success:    #10B981  (Emerald)
    warning:    #F59E0B  (Amber)
    danger:     #F43F5E  (Rose)
    surface:    #1E1B4B  (Dark Indigo surface)
    background: #0F0E1A  (Near black)
    card:       #1A1730  (Slightly lighter)
    border:     #2D2A4A  (Subtle border)
    text:       #E2E8F0  (Light gray)
    muted:      #94A3B8  (Muted text)
  borderRadius:
    DEFAULT: 12px
    lg: 16px
    xl: 20px
  fontFamily:
    sans: ['Inter', 'sans-serif']

### index.css
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
  @tailwind base; @tailwind components; @tailwind utilities;
  body { background: #0F0E1A; color: #E2E8F0; font-family: 'Inter'; }
  Custom scrollbar: thin, indigo thumb

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎨 STEP 4 — UI DESIGN SCREENS (Build Every Screen)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Build ALL screens in a dark, modern, premium style.
Use framer-motion for all page entry animations (fadeInUp).
Every screen must be fully responsive (mobile + desktop).

### Landing.jsx
  - Full-screen hero: gradient text headline, subtitle, two CTA buttons
    "Get Started Free" (primary) and "See How It Works" (ghost)
  - Animated gradient background (indigo → purple blobs)
  - Features section: 6 feature cards in grid (icon + title + desc)
    Icons: Briefcase, Map, BarChart2, FileText, DollarSign, GraduationCap
  - How It Works: 3-step timeline (Build Profile → Get Matched → Grow)
  - Footer: simple dark bar with logo and copyright

### Login.jsx / Register.jsx
  - Centered card on dark background
  - Logo at top, form fields with floating labels
  - Submit button full width (indigo gradient)
  - Link to toggle between login/register
  - Show/hide password toggle
  - Error message display below form

### Onboarding.jsx (5-Step Wizard)
  - Top progress bar showing current step (1/5, 2/5 etc.)
  - Step names shown as breadcrumbs
  - Step 1: Personal Info (name, location, work preference radio)
  - Step 2: Skills (tag chip input — type + Enter to add, click X to remove)
  - Step 3: Education (dynamic list — add/remove education entries)
  - Step 4: Experience + Interests (years slider, industry dropdown)
  - Step 5: Goals + Salary (short/long term text areas + salary inputs)
  - Back / Next / Submit navigation buttons
  - Animated slide transition between steps

### Dashboard.jsx
  - Welcome banner: "Good morning, [Name] 👋" + date
  - Top stat cards row (4 cards):
    Jobs Matched | Skills Identified | Profile Complete % | Courses Available
  - Quick Actions: 4 icon buttons linking to main features
  - Recent Activity feed (last 5 actions)
  - Profile Completion ring chart (center %)
  - "Complete your profile" CTA if profile < 80%

### JobMatches.jsx
  - Filter bar: Industry | Work Type | Seniority | Match Level
  - Job cards grid (2 columns desktop, 1 mobile):
    Each card: Job Title, Company type, Industry badge,
    Match score badge (colored), Matched skills list (green chips),
    Missing skills (red chips), Expand button → shows full details
  - Empty state: illustrated icon + "Complete your profile to see matches"
  - Skeleton loader (3 ghost cards) while fetching

### CareerPaths.jsx
  - 3 path cards side by side (or stacked mobile)
  - Each card: Path name + icon, "Why this fits you" paragraph,
    Visual timeline: Role bubbles connected by dotted line
    (Entry → Mid → Senior → Peak), salary range per level,
    "Explore This Path" button
  - Cards have subtle gradient border (indigo → purple)

### SkillGap.jsx
  - Left panel: Recharts RadarChart showing current skill coverage
    across 6 categories (Technical, Soft Skills, Domain, Tools, etc.)
  - Right panel: scrollable skill list split into 3 sections:
    ✅ You Have (green badge list)
    ⚠️ Partial Match (amber badge list)
    ❌ Missing (rose badge list with priority tag + estimated learn time)
  - Top: dropdown to select which target job to analyze gap for
  - "Find Courses for Gaps" CTA button at bottom

### ResumeAnalyzer.jsx
  - Two column layout:
    LEFT: Large textarea "Paste your resume here..." + Analyze button
    RIGHT: Results panel (hidden until analysis complete)
  - Results panel shows:
    Score gauge ring (0–100, colored by score range)
    4 sub-scores: Structure | Impact | Keywords | Clarity
    Strengths list (green checkmarks)
    Weaknesses list (red X marks)
    ATS Keywords section: missing keywords as red chips
    Before/After bullet comparison table
  - Loading state: animated pulsing ring + "Analyzing your resume..."

### SalaryInsights.jsx
  - Filter bar: Role | Location | Seniority Level
  - Main chart: horizontal bar chart (Recharts) showing min/max/median
  - Below chart: 3 salary range cards (Junior | Mid | Senior)
    Each card: range + median + currency
  - Your Target section: compares user's desired vs. market median
  - Disclaimer note at bottom (italic, muted color)

### Courses.jsx
  - Filter bar: Skill Gap | Platform | Cost (Free/Paid) | Duration
  - Grouped by skill gap:
    Skill gap heading → row of 3 course cards beneath it
  - Each CourseCard: Platform logo icon, Title, Duration badge,
    Cost badge (Free = green, Paid = amber), Rating stars,
    "View Course" external link button
  - "Add to Learning Plan" button saves to user profile
  - Progress bar per skill group showing courses completed

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔗 STEP 5 — WIRING EVERYTHING TOGETHER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### api.js (Axios instance)
  - baseURL: import.meta.env.VITE_API_BASE_URL
  - Request interceptor: attach Authorization: Bearer <token>
    (read token from localStorage key "cc_token")
  - Response interceptor: if 401 → clear token + redirect to /login

### AuthContext.jsx
  - State: { user, token, isAuthenticated, isLoading }
  - login(email, password): call authService → store token in localStorage
  - logout(): clear localStorage + redirect to /
  - Register on mount: check localStorage for existing token + validate

### App.jsx — React Router setup
  Public routes (no auth needed):
    /            → Landing.jsx
    /login       → Login.jsx
    /register    → Register.jsx

  Protected routes (redirect to /login if not authenticated):
    /onboarding  → Onboarding.jsx
    /dashboard   → Dashboard.jsx (default after login)
    /jobs        → JobMatches.jsx
    /career      → CareerPaths.jsx
    /skills      → SkillGap.jsx
    /resume      → ResumeAnalyzer.jsx
    /salary      → SalaryInsights.jsx
    /courses     → Courses.jsx

  Layout: Protected routes share Navbar + Sidebar wrapper

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ▶️ STEP 6 — HOW TO RUN THE PROJECT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After building everything, the way to run the project is:

TERMINAL 1 — Backend:
  cd backend
  source venv/bin/activate
  python run.py
  → Runs on http://localhost:8000
  → SQLite DB auto-created at database/career_compass.db
  → Seed data auto-inserted on first run

TERMINAL 2 — Frontend:
  cd frontend
  npm run dev
  → Runs on http://localhost:5173

Backend .env file must contain:
  ANTHROPIC_API_KEY=your_key_here
  JWT_SECRET=your_random_secret_here
  DATABASE_PATH=database/career_compass.db

Frontend .env file must contain:
  VITE_API_BASE_URL=http://localhost:8000

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ✅ DELIVERABLES CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Before finishing, verify:
  □ All backend files created with complete, working code
  □ All frontend files created with complete, working code
  □ SQLite tables created automatically on first run
  □ Seed data inserts 30 jobs + 50 courses on first run
  □ JWT auth working (register → login → protected routes)
  □ All 8 API endpoints returning correct JSON
  □ All 10 frontend pages fully styled and connected to API
  □ Recharts working in SkillGap and SalaryInsights
  □ Framer Motion animations on all page loads
  □ Axios interceptors attaching token on every request
  □ CORS configured so frontend can reach backend
  □ Both .env files in place with correct variable names
  □ requirements.txt has all packages with pinned versions
  □ package.json has all npm packages listed
  □ README.md created with setup and run instructions

Build everything now. Start with the backend, then the frontend.
Do not ask for clarification. Make reasonable decisions and build.