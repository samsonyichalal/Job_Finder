import json
import sqlite3
from app.database import get_db_connection

def seed():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # 1. Seed Jobs
    cursor.execute("SELECT COUNT(*) FROM jobs")
    if cursor.fetchone()[0] == 0:
        print("Seeding jobs...")
        jobs_data = [
            ("Software Engineer", "Tech", "Build and maintain modern web applications with python, javascript, and react.", 
             ["Python", "Javascript", "React", "SQL"], ["Docker", "AWS", "Git"], 80000, 130000, "USD", "Remote", "remote", "mid"),
            
            ("Data Scientist", "Tech", "Analyze complex data sets, develop machine learning models and predictive tools.", 
             ["Python", "Machine Learning", "SQL", "Statistics"], ["Docker", "AWS", "Git"], 95000, 160000, "USD", "San Francisco, CA", "hybrid", "mid"),
            
            ("Financial Analyst", "Finance", "Analyze financial performance, construct models, and prepare valuation sheets.", 
             ["Excel", "Financial Analysis", "Valuation"], ["Accounting", "Risk Management"], 70000, 110000, "USD", "New York, NY", "on-site", "mid"),
            
            ("Registered Nurse", "Healthcare", "Provide high-quality clinical patient care, manage nursing notes and coordinate treatments.", 
             ["Nursing", "Patient Care", "Medical Terminology"], ["Pharmacology", "Anatomy"], 65000, 95000, "USD", "Boston, MA", "on-site", "mid"),
            
            ("Graphic Designer", "Creative", "Create premium visual concepts and graphics using photoshop, illustrator and figma.", 
             ["Photoshop", "Illustrator", "Figma"], ["Graphic Design", "Branding"], 50000, 80000, "USD", "Los Angeles, CA", "hybrid", "entry"),
            
            ("Mechanical Engineer", "Engineering", "Design thermal systems, CAD schematics, and mechanical components using solidworks.", 
             ["CAD", "SolidWorks", "Thermodynamics"], ["MATLAB", "Structural Analysis"], 75000, 115000, "USD", "Austin, TX", "on-site", "mid"),
            
            ("Project Manager", "Business", "Coordinate complex business and engineering flows using agile methodologies.", 
             ["Agile", "Scrum", "Communication"], ["Risk Management", "Budgeting"], 85000, 135000, "USD", "Remote", "remote", "senior"),
            
            ("Product Manager", "Business", "Lead cross-functional teams to build awesome web platforms from strategy to launch.", 
             ["Product Strategy", "Figma", "Roadmap", "Communication"], ["User Research", "Agile"], 100000, 170000, "USD", "Seattle, WA", "hybrid", "senior"),
            
            ("UI/UX Designer", "Creative", "Establish delightful user interfaces, run user research sessions, build high fidelity figma mockups.", 
             ["Figma", "User Research", "Wireframing"], ["CSS", "HTML", "Branding"], 65000, 110000, "USD", "Remote", "remote", "mid"),
            
            ("Marketing Specialist", "Business", "Drive user acquisition through content campaigns, SEO optimization, and web analytics.", 
             ["Copywriting", "SEO", "Google Analytics"], ["Branding", "Social Media"], 55000, 85000, "USD", "Chicago, IL", "hybrid", "entry"),
            
            ("DevOps Engineer", "Tech", "Maintain server pipelines, CI/CD pipelines, container orchestration and cloud health.", 
             ["Docker", "AWS", "Git", "Linux"], ["Kubernetes", "Python", "Terraform"], 90000, 150000, "USD", "Remote", "remote", "mid"),
            
            ("Pediatrician", "Healthcare", "Examine child patients, prescribe medications and manage general pediatrics health.", 
             ["Patient Care", "Pediatrics", "Anatomy"], ["Pharmacology", "Medical Terminology"], 140000, 220000, "USD", "Denver, CO", "on-site", "senior"),
            
            ("Accountant", "Finance", "Manage accounting books, reconcile bank records, run internal tax audits and prepare balance sheets.", 
             ["Accounting", "Excel", "Auditing"], ["Tax", "Financial Analysis"], 60000, 90000, "USD", "Atlanta, GA", "on-site", "mid"),
            
            ("High School Teacher", "Education", "Establish modern lesson plans, coordinate classrooms, and adapt curriculum tags.", 
             ["Lesson Planning", "Classroom Management", "Curriculum Development"], ["Educational Technology", "Communication"], 48000, 72000, "USD", "Miami, FL", "on-site", "entry"),
            
            ("Civil Engineer", "Engineering", "Perform structural load analysis, civil drafts and municipal utility alignments.", 
             ["Structural Analysis", "AutoCAD", "Civil Design"], ["GIS", "SolidWorks"], 72000, 108000, "USD", "Phoenix, AZ", "on-site", "mid"),
            
            ("Content Writer", "Creative", "Produce professional articles, newsletters, and copy targeting search engines.", 
             ["Copywriting", "SEO", "Editing"], ["Branding", "User Research"], 45000, 70000, "USD", "Remote", "remote", "entry"),
            
            ("Cybersecurity Analyst", "Tech", "Audit network logs, patch vulnerabilities, run threat detection models.", 
             ["Networking", "Security", "Linux"], ["Cryptography", "Python", "Git"], 80000, 130000, "USD", "Washington, DC", "hybrid", "mid"),
            
            ("Healthcare Administrator", "Healthcare", "Oversee clinical systems operations, coordinate regulatory compliance, manage staff schedules.", 
             ["Leadership", "Communication", "Healthcare Compliance"], ["Budgeting", "Medical Terminology"], 75000, 120000, "USD", "Boston, MA", "on-site", "senior"),
            
            ("Financial Planner", "Finance", "Consult clients on personal wealth management, portfolio optimization and tax schedules.", 
             ["Personal Finance", "Portfolio Management", "Taxation"], ["Valuation", "Risk Management"], 68000, 105000, "USD", "Dallas, TX", "hybrid", "mid"),
            
            ("Video Editor", "Creative", "Edit high quality marketing assets, apply after effects motions and stitch sound loops.", 
             ["Premiere Pro", "After Effects", "Sound Editing"], ["Photoshop", "Graphic Design"], 48000, 78000, "USD", "Remote", "remote", "entry"),
            
            ("Curriculum Developer", "Education", "Design academic curricula and build digital modules for e-learning platforms.", 
             ["Curriculum Development", "Educational Technology", "Lesson Planning"], ["Communication", "Special Education"], 58000, 88000, "USD", "Remote", "remote", "mid"),
            
            ("Frontend Developer", "Tech", "Develop premium user interfaces with React, state managers, CSS and HTML layouts.", 
             ["React", "Javascript", "CSS", "HTML"], ["TypeScript", "Figma", "Git"], 70000, 120000, "USD", "Remote", "remote", "mid"),
            
            ("Backend Developer", "Tech", "Design databases, server routes, APIs, and business modules with Python and Django.", 
             ["Node.js", "Django", "SQL", "Python"], ["Docker", "AWS", "Git"], 75000, 130000, "USD", "Remote", "remote", "mid"),
            
            ("Database Administrator", "Tech", "Fine-tune SQL structures, ensure cluster backups, and establish security controls.", 
             ["SQL", "Database Tuning", "Backup Recovery"], ["Linux", "Networking"], 82000, 125000, "USD", "Chicago, IL", "on-site", "mid"),
            
            ("QA Test Engineer", "Tech", "Build automated testing scripts, debug web features and report software errors.", 
             ["Test Automation", "Selenium", "Git"], ["Java", "Python", "SQL"], 62000, 98000, "USD", "Remote", "remote", "mid"),
            
            ("Investment Banker", "Finance", "Advise firms on corporate transitions, capital structures and large scale valuations.", 
             ["Corporate Finance", "Financial Modeling", "Valuation"], ["Financial Analysis", "Excel"], 120000, 250000, "USD", "New York, NY", "on-site", "senior"),
            
            ("Special Education Teacher", "Education", "Deliver specialized lesson plans and individualized plans to school kids.", 
             ["Special Education", "Empathy", "Lesson Planning"], ["Classroom Management", "Communication"], 50000, 76000, "USD", "Houston, TX", "on-site", "entry"),
            
            ("Copywriter", "Creative", "Write high conversion advertising texts and taglines for branding campaigns.", 
             ["Copywriting", "Branding", "Creative Writing"], ["SEO", "Communication"], 52000, 85000, "USD", "Remote", "remote", "mid"),
            
            ("Electrical Engineer", "Engineering", "Build circuit patterns, power distributions and analog schematics using MATLAB.", 
             ["MATLAB", "Circuit Design", "Electrical Schematics"], ["CAD", "AutoCAD"], 78000, 118000, "USD", "Portland, OR", "hybrid", "mid"),
            
            ("Data Analyst", "Tech", "Design clean executive dashboards, clean datasets and present key metrics.", 
             ["Excel", "SQL", "Python", "Tableau"], ["Data Visualization", "Statistics"], 58000, 92000, "USD", "Remote", "remote", "entry")
        ]
        
        for job in jobs_data:
            cursor.execute("""
            INSERT INTO jobs (title, industry, description, required_skills_json, nice_skills_json, salary_min, salary_max, currency, location, work_type, seniority_level)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                job[0], job[1], job[2], 
                json.dumps(job[3]), json.dumps(job[4]), 
                job[5], job[6], job[7], job[8], job[9], job[10]
            ))
        conn.commit()
        print("Jobs seeded successfully!")

    # 2. Seed Courses
    cursor.execute("SELECT COUNT(*) FROM courses")
    if cursor.fetchone()[0] == 0:
        print("Seeding courses...")
        courses_data = [
            # Python
            ("Python for Everybody Specialization", "Coursera", "https://www.coursera.org/specializations/python", ["Python"], 40, "free", 0, "beginner", 4.8),
            ("Complete Python Bootcamp", "Udemy", "https://www.udemy.com/course/complete-python-bootcamp/", ["Python"], 22, "paid", 15, "beginner", 4.7),
            ("CS50's Introduction to Programming with Python", "edX", "https://www.edx.org/course/cs50s-introduction-to-programming-with-python", ["Python"], 30, "free", 0, "beginner", 4.9),
            # React / Frontend
            ("Modern React with Redux", "Udemy", "https://www.udemy.com/course/react-redux/", ["React", "Javascript"], 40, "paid", 19, "intermediate", 4.7),
            ("Full Stack Open - React", "freeCodeCamp", "https://fullstackopen.com/", ["React", "Javascript", "CSS", "HTML"], 80, "free", 0, "intermediate", 4.9),
            ("Learn React for Free", "YouTube", "https://www.youtube.com/watch?v=Ke90Tje7VS0", ["React"], 12, "free", 0, "beginner", 4.6),
            # SQL / Databases
            ("SQL for Data Science", "Coursera", "https://www.coursera.org/learn/sql-for-data-science", ["SQL"], 14, "free", 0, "beginner", 4.6),
            ("The Ultimate MySQL Bootcamp", "Udemy", "https://www.udemy.com/course/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/", ["SQL"], 20, "paid", 12, "beginner", 4.7),
            ("Introduction to Databases", "edX", "https://www.edx.org/course/introduction-to-databases", ["SQL", "Database Tuning"], 24, "free", 0, "intermediate", 4.5),
            # Machine Learning
            ("Machine Learning Specialization", "Coursera", "https://www.coursera.org/specializations/machine-learning-introduction", ["Machine Learning", "Python", "Statistics"], 60, "free", 0, "intermediate", 4.9),
            ("Machine Learning A-Z", "Udemy", "https://www.udemy.com/course/machinelearning/", ["Machine Learning", "Python"], 44, "paid", 20, "beginner", 4.5),
            ("Intro to Machine Learning", "YouTube", "https://www.youtube.com/playlist?list=PL2-dafEMk2A7YdKv4XfKlfGP55WobydIc", ["Machine Learning"], 8, "free", 0, "beginner", 4.4),
            # Finance
            ("Financial Markets", "Coursera", "https://www.coursera.org/learn/financial-markets-global", ["Financial Analysis", "Portfolio Management"], 33, "free", 0, "beginner", 4.8),
            ("Excel Skills for Business", "Coursera", "https://www.coursera.org/specializations/excel-skills-business", ["Excel"], 28, "free", 0, "beginner", 4.8),
            ("The Complete Financial Analyst Course", "Udemy", "https://www.udemy.com/course/the-complete-financial-analyst-course/", ["Financial Analysis", "Excel", "Valuation"], 18, "paid", 15, "beginner", 4.6),
            ("Corporate Finance Fundamentals", "Udemy", "https://www.udemy.com/course/corporate-finance-fundamentals/", ["Corporate Finance", "Accounting"], 6, "paid", 10, "intermediate", 4.5),
            # Creative
            ("Graphic Design Masterclass", "Udemy", "https://www.udemy.com/course/graphic-design-masterclass/", ["Photoshop", "Illustrator", "Graphic Design"], 29, "paid", 15, "beginner", 4.7),
            ("Figma UI/UX Design Essentials", "Udemy", "https://www.udemy.com/course/figma-ux-ui-design-essentials/", ["Figma", "User Research", "Wireframing"], 12, "paid", 18, "beginner", 4.8),
            ("Adobe Photoshop CC: Complete Guide", "LinkedIn Learning", "https://www.linkedin.com/learning/adobe-photoshop-cc-complete-guide", ["Photoshop"], 8, "paid", 30, "beginner", 4.6),
            ("Adobe Illustrator CC Masterclass", "YouTube", "https://www.youtube.com/watch?v=yQ4E_n4D2m0", ["Illustrator"], 5, "free", 0, "beginner", 4.4),
            # Healthcare
            ("Clinical Epidemiology", "Coursera", "https://www.coursera.org/learn/clinical-epidemiology", ["Medical Terminology", "Clinical Trials"], 18, "free", 0, "intermediate", 4.6),
            ("Anatomy Specialization", "Coursera", "https://www.coursera.org/specializations/anatomy", ["Anatomy"], 35, "free", 0, "beginner", 4.8),
            ("Introduction to Nursing Care", "edX", "https://www.edx.org/course/introduction-to-nursing-care", ["Nursing", "Patient Care"], 40, "free", 0, "beginner", 4.7),
            # Agile
            ("Agile with Atlassian Jira", "Coursera", "https://www.coursera.org/learn/agile-atlassian-jira", ["Agile", "Scrum"], 12, "free", 0, "beginner", 4.7),
            ("Scrum Certification Prep", "Udemy", "https://www.udemy.com/course/scrum-certification-prep/", ["Scrum"], 4, "paid", 10, "beginner", 4.6),
            # Engineering
            ("Introduction to CAD, 3D Printing, and Cam", "Coursera", "https://www.coursera.org/specializations/autodesk-cad-cam-3d-printing", ["CAD"], 22, "free", 0, "beginner", 4.7),
            ("SolidWorks Complete Course", "Udemy", "https://www.udemy.com/course/solidworks-complete-course/", ["SolidWorks"], 15, "paid", 14, "beginner", 4.6),
            ("MATLAB Onramp", "YouTube", "https://www.youtube.com/watch?v=T_ekAD7U-wU", ["MATLAB"], 2, "free", 0, "beginner", 4.5),
            # Education
            ("Classroom Management Strategies", "Coursera", "https://www.coursera.org/learn/classroom-management", ["Classroom Management", "Communication"], 15, "free", 0, "beginner", 4.7),
            ("Foundations of Special Education", "edX", "https://www.edx.org/course/foundations-of-special-education", ["Special Education", "Empathy"], 20, "free", 0, "beginner", 4.8),
            # DevOps
            ("Docker and Kubernetes: The Complete Guide", "Udemy", "https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/", ["Docker", "Kubernetes"], 22, "paid", 19, "intermediate", 4.8),
            ("AWS Certified Solutions Architect", "Udemy", "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/", ["AWS"], 27, "paid", 18, "intermediate", 4.7),
            ("Git Complete: The Definitive Guide", "Udemy", "https://www.udemy.com/course/git-complete/", ["Git"], 6, "paid", 10, "beginner", 4.6),
            ("Linux Command Line Basics", "YouTube", "https://www.youtube.com/watch?v=wBp0Rb-ZJak", ["Linux"], 4, "free", 0, "beginner", 4.5),
            # Writing & SEO
            ("SEO Specialization", "Coursera", "https://www.coursera.org/specializations/seo", ["SEO"], 35, "free", 0, "beginner", 4.7),
            ("Copywriting Secrets", "Udemy", "https://www.udemy.com/course/copywriting-secrets-how-to-write-copy-that-sells/", ["Copywriting", "Creative Writing"], 3, "paid", 12, "beginner", 4.6),
            # Cybersecurity
            ("Google Cybersecurity Certificate", "Coursera", "https://www.coursera.org/professional-certificates/google-cybersecurity", ["Security", "Networking", "Linux"], 120, "free", 0, "beginner", 4.8),
            # Extra Matches
            ("Node.js, Express, MongoDB & More", "Udemy", "https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/", ["Node.js", "Javascript"], 42, "paid", 19, "intermediate", 4.7),
            ("Django 4 Course", "Udemy", "https://www.udemy.com/course/django-4-course/", ["Django", "Python"], 15, "paid", 15, "beginner", 4.6),
            ("Tableau for Beginners", "YouTube", "https://www.youtube.com/watch?v=aHaoiQsnSHg", ["Tableau", "Data Visualization"], 3, "free", 0, "beginner", 4.5),
            ("Curriculum Design in Higher Education", "Coursera", "https://www.coursera.org/learn/curriculum-design", ["Curriculum Development"], 16, "free", 0, "intermediate", 4.6),
            ("Introduction to Educational Technology", "edX", "https://www.edx.org/course/introduction-to-educational-technology", ["Educational Technology"], 12, "free", 0, "beginner", 4.6),
            ("Video Editing with Premiere Pro", "Udemy", "https://www.udemy.com/course/adobe-premiere-pro-video-editing/", ["Premiere Pro", "Sound Editing"], 10, "paid", 15, "beginner", 4.7),
            ("After Effects CC Complete Course", "Udemy", "https://www.udemy.com/course/after-effects-complete-course/", ["After Effects"], 18, "paid", 15, "beginner", 4.6),
            ("Intro to Statistics", "Udemy", "https://www.udemy.com/course/intro-to-statistics/", ["Statistics"], 8, "free", 0, "beginner", 4.4),
            ("Introduction to Web Development", "freeCodeCamp", "https://www.youtube.com/watch?v=zJSY8tJY_3M", ["CSS", "HTML", "Javascript"], 11, "free", 0, "beginner", 4.7),
            ("Database Systems", "edX", "https://www.edx.org/course/database-systems", ["Database Tuning", "SQL"], 32, "free", 0, "advanced", 4.5),
            ("Agile Planning & Project Management", "LinkedIn Learning", "https://www.linkedin.com/learning/agile-planning-and-project-management", ["Agile"], 3, "paid", 25, "beginner", 4.6),
            ("Practical Guide to Clinical Trials", "LinkedIn Learning", "https://www.linkedin.com/learning/practical-clinical-trials", ["Clinical Trials"], 4, "paid", 20, "intermediate", 4.5),
            ("Introduction to Circuit Design", "edX", "https://www.edx.org/course/introduction-to-circuit-design", ["Circuit Design", "Electrical Schematics"], 20, "free", 0, "beginner", 4.6)
        ]
        
        for course in courses_data:
            cursor.execute("""
            INSERT INTO courses (title, platform, url, skill_tags_json, duration_hours, cost_type, cost_amount, level, rating)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                course[0], course[1], course[2], 
                json.dumps(course[3]), course[4], 
                course[5], course[6], course[7], course[8]
            ))
        conn.commit()
        print("Courses seeded successfully!")
        
    conn.close()
