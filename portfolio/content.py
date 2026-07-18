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
RESUME_URL = "https://drive.google.com/file/d/1PaJd6jgDSsjpuL7jRK9A45K1C0eobQcw/view?usp=drive_link"

# Rotating role titles (displayed in typewriter animation)
ROLE_TITLES = [
    "Machine Learning Developer",
    "AI Systems Builder",
    "Automation Engineer",
    "Backend Developer",
]

BIO = (
    "I am a Final year Computer Science student focused on building "
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
YEAR = "Final Year B.Tech"
CGPA = "7.5"
YEAR_RANGE = "Graduate 2027"

# =============================================================================
# STATS (About section)
# =============================================================================
STATS = [
    {"value": "Final Year", "label": "B.Tech"},
    {"value": "7.5", "label": "CGPA"},
    {"value": "15+", "label": "Projects Built"},
]

# =============================================================================
# MODEL PERFORMANCE
# =============================================================================
MODEL_PERFORMANCE = [
    {
        "task": "Car Price Prediction",
        "algorithm": "Random Forest + GridSearchCV",
        "dataset": "Custom (8K rows)",
        "metric": "R² / RMSE",
        "score": "0.91 / ₹1.2L",
    },
    {
        "task": "Hotel Booking Classifier",
        "algorithm": "XGBoost + GridSearchCV",
        "dataset": "Kaggle Hotel Bookings",
        "metric": "F1 (macro)",
        "score": "0.88",
    },
    {
        "task": "Fashion MNIST CNN",
        "algorithm": "CNN (TensorFlow/Keras)",
        "dataset": "Fashion MNIST (70K)",
        "metric": "Accuracy",
        "score": "93.4%",
    },
    {
        "task": "Traffic Vehicle Detector",
        "algorithm": "YOLOv8 Nano (50 epochs)",
        "dataset": "Custom traffic data",
        "metric": "mAP@0.5",
        "score": "87.6%",
    },
    {
        "task": "RAG Retrieval (Vasudha)",
        "algorithm": "SentenceTransformers + FAISS",
        "dataset": "30+ agri documents",
        "metric": "Retrieval Acc.",
        "score": "91%+",
    },
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
        "tech_tags": ["Python", "Flask", "LangChain"],
        "snippet": """
    from flask import Flask, request, jsonify
    import joblib

    app = Flask(__name__)
    model = joblib.load('models/chatbot_fallback.pkl')

    @app.route('/api/intent', methods=['POST'])
    def intent():
        text = request.json.get('text','')
        # lightweight intent mapping + fallback model
        return jsonify({'intent':'assist','score':0.87})
    """,
        "snippet_lang": "python",
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
        "tech_tags": ["Python", "Scikit-learn", "Flask"],
        "snippet": """
    import joblib
    import pandas as pd

    model = joblib.load('models/house_price.pkl')
    def predict(features: dict):
        df = pd.DataFrame([features])
        return float(model.predict(df)[0])
    """,
        "snippet_lang": "python",
        "github": "https://github.com/Pratham4644/House-price-prediction",
        "badge": None,
    },
    {
        "title": "Green-Signale — Smart Traffic Monitoring",
        "accent": "#00a8ff",
        "description": (
            "YOLOv8 Nano trained on a custom-labelled traffic dataset (5 vehicle classes, 50 epochs, 640px resolution). "
            "Supports real-time OpenCV detection on live video streams and dynamic traffic density estimation for adaptive "
            "signal control, with an edge-friendly inference pipeline."
        ),
        "stack": "Python, YOLOv8 (Ultralytics), OpenCV, Custom Dataset Labeling",
        "github": None,  # TODO: add Green-Signale repo link if available
        "badge": "87.6% mAP@0.5",
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
        "badge": "91%+ Retrieval Accuracy · Hackathon Winner",
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
        "badge": "YOLOv8 · Streamlit Inference Pipeline",
    },
]

# =============================================================================
# ACHIEVEMENTS
# =============================================================================
ACHIEVEMENTS = [
    {
        "title": "Hackathon Winner",
        "detail": "ADCET Internal Hackathon — 2nd place for Vasudha (offline RAG agri-chatbot), hardware+software team",
    },
    {
        "title": "DIPEX State-Level Project Exhibition",
        "detail": "Represented college at state level with Vasudha project",
    },
    {
        "title": "Kaggle Certifications",
        "detail": "Machine Learning Badge, Data Analysis Badge",
        "url": "https://www.kaggle.com/prashps",
    },
]

# =============================================================================
# EXPERIENCE
# =============================================================================
EXPERIENCES = [
    {
        "title": "Machine Learning Intern",
        "company": "TechnoHacks Solutions Pvt. Ltd.",
        "duration": "Jun 2025 – Jul 2025",
        "certificate_url": "https://drive.google.com/file/d/1YI7i58eohDO6bgDxJMs3OSdeVK3YQjns/view?usp=drive_link",
        "description": [
            "Built three end-to-end ML models: car price predictor (R²: 0.91), hotel booking classifier (F1: 0.88), Fashion MNIST CNN (93.4% accuracy)",
            "Applied GridSearchCV hyperparameter tuning; evaluated using F1, R², RMSE",
            "Deployed a Flask web application for live model inference",
        ],
        "tags": ["Python", "Scikit-learn", "XGBoost", "TensorFlow", "Flask", "Pandas", "NumPy", "GridSearchCV"],
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
    "LinkedIn": "https://www.linkedin.com/in/prathamesh-shinde-05942b288",
    "LeetCode": "https://leetcode.com/u/prathamesh2310/",
    "Kaggle": "https://www.kaggle.com/prashps",
}
