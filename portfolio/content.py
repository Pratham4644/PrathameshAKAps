# -*- coding: utf-8 -*-
"""
Portfolio content configuration for Prathamesh Shinde.
Edit this file to update any text, links, or data on the portfolio.
"""

# =============================================================================
# IDENTITY
# =============================================================================
FULL_NAME = "Prathamesh Shinde"
EMAIL = "prathamps8666@gmail.com"
LOCATION = "Sangli, Maharashtra, India"
RESUME_URL = "https://drive.google.com/file/d/1XEY12uLUJDm1PK37rHmYlTDrV900geka/view?usp=sharing"

# Rotating role titles (displayed in typewriter animation)
ROLE_TITLES = [
    "Machine Learning Developer",
    "AI Systems Builder",
    "Automation Engineer",
    "Backend Developer",
]

BIO = (
    "I am a third-year engineering student focused on building "
    "practical AI, machine learning, and automation systems from scratch. I design, "
    "develop, and deploy complete solutions independently, combining machine learning, "
    "backend development, and system integration to solve real-world problems. My work "
    "centers on intelligent automation, scalable software products, and real-world "
    "execution rather than academic theory."
)

# =============================================================================
# EDUCATION
# =============================================================================
COLLEGE = "Annasaheb Dange College of Engineering and Technology"
BRANCH = "Computer Science and Engineering (Internet of Things and Cyber Security Including Blockchain Technology)"
YEAR = "Third Year B.Tech"
CGPA = "7.5"
YEAR_RANGE = "Graduate 2027"

# =============================================================================
# STATS (About section)
# =============================================================================
STATS = [
    {"value": "3rd Year", "label": "B.Tech"},
    {"value": "7.5", "label": "CGPA"},
    {"value": "4+", "label": "Projects Built"},
]

# =============================================================================
# SKILL GROUPS (About section progress bars)
# =============================================================================
SKILL_GROUPS_ABOUT = [
    {"name": "Core Data and ML Libraries", "percent": 80, "accent": "#00ff88"},
    {"name": "LLM and AI Frameworks", "percent": 40, "accent": "#00e5ff"},
    {"name": "Automation Systems", "percent": 60, "accent": "#7b61ff"},
    {"name": "Model Deployment", "percent": 70, "accent": "#00e5ff"},
    {"name": "Speech and Voice", "percent": 35, "accent": "#ff6b6b"},
]

# =============================================================================
# TECHNICAL SKILLS (Skills section - 4 groups)
# =============================================================================
SKILLS_GROUPS = [
    {
        "name": "Core Data and ML Libraries",
        "accent": "#00ff88",
        "skills": [
            ("Python", 85),
            ("NumPy", 80),
            ("Pandas", 80),
            ("Scikit-learn", 78),
            ("Pickle", 75),
            ("Matplotlib", 70),
            ("Seaborn", 65),
        ],
    },
    {
        "name": "LLM and AI Frameworks",
        "accent": "#00e5ff",
        "skills": [
            ("Gemini API", 55),
            ("OpenAI API", 45),
            ("OpenRouter", 42),
            ("LangChain", 40),
            ("Composio", 38),
        ],
    },
    {
        "name": "Automation and Backend",
        "accent": "#7b61ff",
        "skills": [
            ("Selenium WebDriver", 65),
            ("PyAutoGUI", 60),
            ("Flask", 72),
            ("REST API Design", 68),
            ("Node.js", 60),
            ("Express.js", 58),
            ("SQLite", 62),
        ],
    },
    {
        "name": "Speech, Voice and DevTools",
        "accent": "#ff6b6b",
        "skills": [
            ("Whisper", 40),
            ("ElevenLabs", 35),
            ("Git", 70),
            ("GitHub", 72),
            ("Streamlit", 65),
            ("TensorFlow", 30),
            ("Keras", 30),
        ],
    },
]

# =============================================================================
# PROJECTS
# =============================================================================
PROJECTS = [
    {
        "title": "AI Automation Chatbot",
        "accent": "#00e5ff",
        "description": (
            "An intelligent automation assistant integrating conversational AI with web and desktop automation. "
            "Supports context-aware chat, browser control via Selenium, form automation, screenshot capture, "
            "and desktop-level mouse and keyboard simulation via PyAutoGUI. Includes a Flask web dashboard, "
            "Streamlit interface, and CLI version."
        ),
        "stack": "Python, Flask, Streamlit, Selenium, PyAutoGUI, Gemini API",
        "github": "https://github.com/Pratham4644/Python",
        "badge": None,
    },
    {
        "title": "CodeSahayak — AI Coding Mentor",
        "accent": "#00ff88",
        "description": (
            "An AI-powered coding mentor for Indian computer science students offering code review and feedback "
            "in a Marathi-English mixed language. Integrates GitHub, Notion, Google Calendar, and Slack in a "
            "single automated workflow using LangChain and Composio."
        ),
        "stack": "Python, LangChain, Composio, OpenRouter, GPT-4o mini, Whisper, ElevenLabs",
        "github": "https://github.com/Pratham4644/code-sahayak-ui",
        "badge": None,
    },
    {
        "title": "Mess Attendance System",
        "accent": "#7b61ff",
        "description": (
            "A QR-code-based cafeteria management platform for hostels and institutions. Automates meal tracking "
            "with real-time validation, duplicate prevention, webcam QR scanning, live counters, and an admin "
            "panel with CSV reporting and date-range analytics."
        ),
        "stack": "Node.js, Express.js, SQLite, REST API, QR Code, Webcam JS",
        "github": "https://github.com/Pratham4644/buddy-s",
        "badge": "Freelance Project",
    },
    {
        "title": "House Price Prediction",
        "accent": "#ff6b6b",
        "description": (
            "An end-to-end machine learning pipeline predicting property prices from housing features. Covers "
            "data preprocessing, feature engineering, regression modeling with Scikit-learn, model serialization "
            "via Pickle, and a Flask REST API for real-time inference."
        ),
        "stack": "Python, Pandas, NumPy, Scikit-learn, Pickle, Flask",
        "github": "https://github.com/Pratham4644/House-price-prediction",
        "badge": None,
    },
    {
        "title": "Vasu-Vaidya — IoT Smart Farming System",
        "accent": "#39ff14",
        "description": (
            "An AI-driven precision agriculture platform that fuses real-time IoT sensor data with cloud-based "
            "machine learning to deliver actionable crop-specific guidance. Sensors continuously monitor soil NPK "
            "levels, pH, electrical conductivity, moisture, and ambient temperature, streaming telemetry to a "
            "Node.js backend over MQTT. A Python ML layer — built on Scikit-learn and XGBoost — processes "
            "incoming readings to generate fertilizer dosage recommendations, detect nutrient deficiencies, and "
            "trigger threshold-based alerts before crop damage occurs. "
            "Designed for low-connectivity rural environments, the system supports offline edge inference and "
            "syncs to the cloud when connectivity is available. The REST API exposes crop health scores and "
            "historical trend data to a lightweight Express.js dashboard, enabling farmers and agronomists to "
            "track field conditions over time. Reduces soil degradation through data-driven intervention, "
            "improves yield predictability, and lowers input costs by preventing over-fertilization."
        ),
        "stack": (
            "Node.js, Express.js, Python, Scikit-learn, XGBoost, Pandas, NumPy, "
            "MQTT, SQLite, REST API, IoT Sensors (NPK / pH / EC / DHT22)"
        ),
        "github": "https://github.com/Tanmay-Dhanaji-Patil/Team_Vasudha.git",
        "badge": "Team Project",
    },
    {
        "title": "Vasudha — Offline Multimodal RAG for Agricultural Advisory",
        "accent": "#ffd700",
        "description": (
            "An end-to-end offline Retrieval-Augmented Generation pipeline built for agricultural advisory in "
            "low-resource, no-internet environments. Vasudha indexes domain-specific agronomic documents — crop "
            "guides, field manuals, disease references — using all-MiniLM-L6-v2 (384-dim) sentence embeddings "
            "stored in a FAISS IndexFlatIP index, and answers natural language queries entirely on-device via "
            "TinyLlama-1.1B through Ollama. No GPU, no API calls, no cloud dependency. "
            "Built from scratch as undergraduate research at ADCET, Sangli. Achieved 91% top-3 retrieval "
            "accuracy on an internal pilot benchmark, won 2nd place at the ADCET Internal Hackathon, and was "
            "selected to represent the college at the DIPEX state-level project exhibition. "
            "Active research extension targets the core modality mismatch in field-level advisory: a farmer "
            "observing leaf discolouration cannot always translate a visual symptom into a precise text query. "
            "The ongoing work aligns EfficientNet-B0 visual crop embeddings (PlantVillage) into the same FAISS "
            "index as text, enabling joint image-text retrieval over a single unified knowledge base — making "
            "symptom photographs a first-class query modality."
        ),
        "stack": (
            "Python, PyMuPDF, Sentence-Transformers (all-MiniLM-L6-v2), FAISS, "
            "TinyLlama-1.1B, Ollama, FastAPI, EfficientNet-B0 (research), PyTorch"
        ),
        "github": "https://github.com/Pratham4644/Vasudha_chatboat.git",
        "badge": "Research Project · DIPEX Selected",
    },
    {
        "title": "AI-Powered E-Waste Condition Classifier",
        "accent": "#ff9500",
        "description": (
            "An end-to-end computer vision system that automates e-waste triage by classifying discarded "
            "electronic devices into Usable, Repairable, or Trash — directly addressing the global problem of "
            "inefficient e-waste sorting where millions of reusable devices are landfilled and recyclable "
            "components never reach processing facilities. "
            "Built a complete ML pipeline from scratch: dataset curation, YOLOv8 training, label mapping, "
            "confidence-scored inference, and result persistence. Supports ten device categories including "
            "batteries, mobile phones, PCBs, printers, televisions, keyboards, microwaves, and mice. "
            "Wrapped the model in a full Streamlit web application featuring a dark-themed responsive UI, "
            "file upload and model upload integration, dynamic confidence visualisation, and CSV-based "
            "session logging. Integrated location-aware recycling centre mapping so users can find nearby "
            "certified e-waste facilities directly from the app. "
            "The project demonstrated that practical AI deployment requires combining ML engineering, "
            "software architecture, UX design, and real-world usability — not model training alone."
        ),
        "stack": (
            "Python, YOLOv8 (Ultralytics), Streamlit, PyTorch, PIL, "
            "Pandas, JSON, CSV, Custom CSS, Geolocation API"
        ),
        "github": "https://github.com/Pratham4644/E-waste-locator-.git",
        "badge": None,
    },
]

# =============================================================================
# EXPERIENCE
# =============================================================================
EXPERIENCES = [
    {
        "title": "Machine Learning Intern",
        "company": "TechnoHacks Solutions Pvt. Ltd.",
        "duration": "30 Days | Academic Year 2024–25",
        "certificate_url": "https://drive.google.com/file/d/1YI7i58eohDO6bgDxJMs3OSdeVK3YQjns/view?usp=sharing",
        "description": (
            "Completed a structured machine learning internship focused on end-to-end model development. "
            "Built car price prediction, hotel booking classification, and Fashion MNIST image classification "
            "models using TensorFlow and Keras. Performed feature engineering, hyperparameter tuning with "
            "GridSearchCV, and model evaluation using accuracy, precision, recall, F1 score, R2 score, and RMSE. "
            "Deployed a Flask-based web application for model serving."
        ),
        "tags": ["Python", "Scikit-learn", "TensorFlow", "Keras", "Flask", "Pandas", "NumPy", "GridSearchCV"],
    },
]

# =============================================================================
# CERTIFICATIONS
# =============================================================================
CERTIFICATIONS = [
    {
        "title": "College Event Certificate 1",
        "issuer": "Annasaheb Dange College of Engineering and Technology",
        "url": "https://drive.google.com/file/d/1c3EmPkKfZAqV5Lf8u3fT8rr-UdLcfTLO/view?usp=drive_link",
        "is_achievement": False,
    },
    {
        "title": "College Event Certificate 2",
        "issuer": "Annasaheb Dange College of Engineering and Technology",
        "url": "https://drive.google.com/file/d/1YvdK72_I-DPYnlOCjI9295wgQ1LJcumK/view?usp=drivesdk",
        "is_achievement": False,
    },
    {
        "title": "College Event Certificate 3",
        "issuer": "Annasaheb Dange College of Engineering and Technology",
        "url": "https://drive.google.com/file/d/14OXGUTS2ImNrBcRAMKatkiLC0vWR-nVd/view?usp=drive_link",
        "is_achievement": False,
    },
    {
        "title": "Machine Learning Badge",
        "issuer": "Kaggle",
        "url": "https://www.kaggle.com/certification/badges/prashps/105",
        "is_achievement": False,
    },
    {
        "title": "Data Badge",
        "issuer": "Kaggle",
        "url": "https://www.kaggle.com/certification/badges/prashps/30",
        "is_achievement": False,
    },
    {
        "title": "Avishkar Hackathon Participation",
        "issuer": "Annasaheb Dange College of Engineering and Technology",
        "url": "https://drive.google.com/file/d/1YI7i58eohDO6bgDxJMs3OSdeVK3YQjns/view?usp=sharing",
        "is_achievement": True,
        "accent": "#7b61ff",
    },
]

# =============================================================================
# SOCIAL LINKS
# =============================================================================
SOCIAL_LINKS = {
    "GitHub": "https://github.com/Pratham4644",
    "LinkedIn": "https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile",
    "LeetCode": "https://leetcode.com/u/prathamesh2310/",
    "Kaggle": "https://www.kaggle.com/prashps",
}
