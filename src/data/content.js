// Portfolio content — single source of truth
export const FULL_NAME = "Prathamesh Shinde";
export const EMAIL = "prathamps8666@gmail.com";
export const LOCATION = "Sangli, Maharashtra, India";
export const RESUME_URL =
  "https://drive.google.com/file/d/1PaJd6jgDSsjpuL7jRK9A45K1C0eobQcw/view?usp=drive_link";

export const ROLE_TITLES = [
  "AI/ML Engineer",
  "Computer Vision Developer",
  "RAG & LLM Systems Builder",
  "Edge AI Engineer",
];

export const BIO =
  "I am a Final year Computer Science student focused on building practical AI, machine learning, and automation systems from scratch. I design, develop, and deploy complete solutions independently, combining machine learning, backend development, and system integration to solve real-world problems. My work centers on intelligent automation, scalable software products, and real-world execution rather than academic theory.";

export const COLLEGE = "Annasaheb Dange College of Engineering and Technology";
export const BRANCH =
  "Computer Science and Engineering (Internet of Things and Cyber Security Including Blockchain Technology)";
export const YEAR = "Final Year B.Tech";
export const CGPA = "7.5";
export const YEAR_RANGE = "Graduate 2027";

export const STATS = [
  { value: "Final Year", label: "B.Tech" },
  { value: "7.5", label: "CGPA" },
];

export const MODEL_PERFORMANCE = [
  { task: "Car Price Prediction", algorithm: "Random Forest + GridSearchCV", dataset: "Custom (8K rows)", metric: "R² / RMSE", score: "0.91 / ₹1.2L" },
  { task: "Hotel Booking Classifier", algorithm: "XGBoost + GridSearchCV", dataset: "Kaggle Hotel Bookings", metric: "F1 (macro)", score: "0.88" },
  { task: "Fashion MNIST CNN", algorithm: "CNN (TensorFlow/Keras)", dataset: "Fashion MNIST (70K)", metric: "Accuracy", score: "93.4%" },
  { task: "Traffic Vehicle Detector", algorithm: "YOLOv8 Nano (50 epochs)", dataset: "Custom traffic data", metric: "mAP@0.5", score: "87.6%" },
  { task: "RAG Retrieval (Vasudha)", algorithm: "SentenceTransformers + FAISS", dataset: "30+ agri documents", metric: "Retrieval Acc.", score: "91%+" },
];

export const SKILL_LEVELS = [
  {
    name: "Daily use",
    accent: "#00ff88",
    skills: ["Python", "NumPy", "Pandas", "Scikit-learn", "Pickle", "Matplotlib", "Flask", "Git", "GitHub"],
  },
  {
    name: "Used in projects",
    accent: "#00e5ff",
    skills: ["Seaborn", "Gemini API", "OpenAI API", "OpenRouter", "LangChain", "Selenium WebDriver", "PyAutoGUI", "REST API Design", "Node.js", "Express.js", "SQLite", "Whisper", "Streamlit"],
  },
  {
    name: "Learning",
    accent: "#7b61ff",
    skills: ["Composio", "ElevenLabs", "TensorFlow", "Keras"],
  },
];

export const PROJECTS = [
  {
    title: "Vasudha — Offline Multimodal RAG for Agricultural Advisory",
    category: "RAG/LLM",
    featured: true,
    image: "",
    demo: "",
    problem: "Provide agricultural guidance in low-resource environments without internet access.",
    approach: "Retrieve agronomic documents with sentence embeddings and FAISS, then answer locally with TinyLlama via Ollama.",
    result: "91%+ top-3 retrieval accuracy; ADCET Internal Hackathon, 2nd place.",
    accent: "#ffd700",
    description: "An end-to-end offline Retrieval-Augmented Generation pipeline built for agricultural advisory in low-resource, no-internet environments. Vasudha indexes domain-specific agronomic documents using all-MiniLM-L6-v2 (384-dim) sentence embeddings stored in a FAISS IndexFlatIP index, and answers natural language queries entirely on-device via TinyLlama-1.1B through Ollama. No GPU, no API calls, no cloud dependency. Achieved 91% top-3 retrieval accuracy, won 2nd place at ADCET Internal Hackathon, and was selected for the DIPEX state-level project exhibition.",
    stack: "Python, PyMuPDF, Sentence-Transformers (all-MiniLM-L6-v2), FAISS, TinyLlama-1.1B, Ollama, FastAPI, EfficientNet-B0 (research), PyTorch",
    github: "https://github.com/Pratham4644/Vasudha_chatboat.git",
    badge: "ADCET Internal Hackathon · 2nd place",
    architecture: [
      "Extract agronomic text from documents with PyMuPDF.",
      "Embed document chunks with all-MiniLM-L6-v2 and index them in FAISS.",
      "Retrieve relevant passages and generate answers with TinyLlama-1.1B via local Ollama.",
      "Serve the advisory experience through FastAPI without requiring an internet connection.",
    ],
  },
  {
    title: "FatigueGuard",
    category: "CV",
    featured: true,
    image: "",
    demo: "",
    problem: "TODO: add project problem statement",
    approach: "TODO: add project approach",
    result: "TODO: add metric",
    accent: "#ff6b6b",
    description: "TODO: add project description",
    stack: "TODO: add tech stack",
    github: "",
    badge: null,
  },
  {
    title: "SentinelEdge",
    category: "IoT/Edge",
    featured: true,
    image: "",
    demo: "",
    problem: "TODO: add project problem statement",
    approach: "TODO: add project approach",
    result: "TODO: add metric",
    accent: "#00e5ff",
    description: "TODO: add project description",
    stack: "TODO: add tech stack",
    github: "",
    badge: null,
  },
  {
    title: "Face-Recognition Attendance",
    category: "CV",
    featured: true,
    image: "",
    demo: "",
    problem: "TODO: add project problem statement",
    approach: "TODO: add project approach",
    result: "TODO: add metric",
    accent: "#7b61ff",
    description: "TODO: add project description",
    stack: "TODO: add tech stack",
    github: "",
    badge: null,
  },
  {
    title: "Multi-Camera Person Tracking",
    category: "CV",
    featured: true,
    image: "",
    demo: "",
    problem: "TODO: add project problem statement",
    approach: "TODO: add project approach",
    result: "TODO: add metric",
    accent: "#39c5ff",
    description: "TODO: add project description",
    stack: "TODO: add tech stack",
    github: "",
    badge: null,
  },
  {
    title: "AI Automation Chatbot",
    category: "Web",
    featured: false,
    image: "",
    demo: "",
    problem: "Automate web and desktop workflows while supporting conversational interaction.",
    approach: "Combine conversational AI with a Flask dashboard, Selenium browser control, and PyAutoGUI desktop automation.",
    result: "TODO: add metric",
    accent: "#00e5ff",
    description: "An intelligent automation assistant integrating conversational AI with web and desktop automation. Supports context-aware chat, browser control via Selenium, form automation, screenshot capture, and desktop-level mouse and keyboard simulation via PyAutoGUI. Includes a Flask web dashboard, Streamlit interface, and CLI version.",
    stack: "Python, Flask, Streamlit, Selenium, PyAutoGUI, Gemini API",
    github: "https://github.com/Pratham4644/Python",
    badge: null,
    architecture: [
      "Expose the assistant through Flask and Streamlit interfaces, with a CLI option.",
      "Use Gemini API for conversational responses.",
      "Automate browser tasks with Selenium and desktop actions with PyAutoGUI.",
    ],
  },
  {
    title: "CodeSahayak — AI Coding Mentor",
    category: "RAG/LLM",
    featured: false,
    image: "",
    demo: "",
    problem: "TODO: add project problem statement",
    approach: "TODO: add project approach",
    result: "TODO: add metric",
    accent: "#00ff88",
    description: "An AI-powered coding mentor for Indian computer science students offering code review and feedback in a Marathi-English mixed language. Integrates GitHub, Notion, Google Calendar, and Slack in a single automated workflow using LangChain and Composio.",
    stack: "Python, LangChain, Composio, OpenRouter, GPT-4o mini, Whisper, ElevenLabs",
    github: "https://github.com/Pratham4644/code-sahayak-ui",
    badge: null,
    architecture: [
      "Coordinate coding-mentor conversations and review workflows with LangChain.",
      "Generate responses with GPT-4o mini through OpenRouter.",
      "Connect GitHub, Notion, Google Calendar, and Slack through Composio.",
      "Support voice input and output with Whisper and ElevenLabs.",
    ],
  },
  {
    title: "Mess Attendance System",
    category: "Web",
    featured: false,
    image: "",
    demo: "",
    problem: "Automate cafeteria meal tracking and prevent duplicate attendance records.",
    approach: "Use QR scanning, real-time validation, and an admin dashboard with CSV reporting.",
    result: "TODO: add metric",
    accent: "#7b61ff",
    description: "A QR-code-based cafeteria management platform for hostels and institutions. Automates meal tracking with real-time validation, duplicate prevention, webcam QR scanning, live counters, and an admin panel with CSV reporting and date-range analytics.",
    stack: "Node.js, Express.js, SQLite, REST API, QR Code, Webcam JS",
    github: "https://github.com/Pratham4644/buddy-s",
    badge: "Freelance Project",
    architecture: [
      "Capture attendance with webcam-based QR scanning.",
      "Validate scans and serve attendance operations through a Node.js/Express REST API.",
      "Persist attendance in SQLite and present records in an admin dashboard with CSV reporting.",
    ],
  },
  {
    title: "House Price Prediction",
    category: "Web",
    featured: false,
    image: "",
    demo: "",
    problem: "Predict property prices from housing features.",
    approach: "Preprocess and engineer features, train a Scikit-learn regression model, and serve it through Flask.",
    result: "TODO: add metric",
    accent: "#ff6b6b",
    description: "An end-to-end machine learning pipeline predicting property prices from housing features. Covers data preprocessing, feature engineering, regression modeling with Scikit-learn, model serialization via Pickle, and a Flask REST API for real-time inference.",
    stack: "Python, Pandas, NumPy, Scikit-learn, Pickle, Flask",
    github: "https://github.com/Pratham4644/House-price-prediction",
    badge: null,
    architecture: [
      "Preprocess housing data and engineer model features with Pandas and NumPy.",
      "Train a Scikit-learn regression model and serialize it with Pickle.",
      "Serve real-time predictions through a Flask REST API.",
    ],
  },
  {
    title: "Vasu-Vaidya — IoT Smart Farming System",
    category: "IoT/Edge",
    featured: false,
    image: "",
    demo: "",
    problem: "Turn real-time agricultural sensor readings into crop-specific guidance.",
    approach: "Stream IoT telemetry over MQTT and process it with a Python ML layer and Node.js backend.",
    result: "TODO: add metric",
    accent: "#39ff14",
    description: "An AI-driven precision agriculture platform that fuses real-time IoT sensor data with cloud-based machine learning to deliver actionable crop-specific guidance. Sensors continuously monitor soil NPK levels, pH, electrical conductivity, moisture, and ambient temperature, streaming telemetry to a Node.js backend over MQTT. A Python ML layer — built on Scikit-learn and XGBoost — processes incoming readings to generate fertilizer dosage recommendations, detect nutrient deficiencies, and trigger threshold-based alerts before crop damage occurs. Designed for low-connectivity rural environments, the system supports offline edge inference and syncs to the cloud when connectivity is available.",
    stack: "Node.js, Express.js, Python, Scikit-learn, XGBoost, Pandas, NumPy, MQTT, SQLite, REST API, IoT Sensors (NPK / pH / EC / DHT22)",
    github: "https://github.com/Tanmay-Dhanaji-Patil/Team_Vasudha.git",
    badge: "Team Project",
    architecture: [
      "Collect soil and environmental readings from NPK, pH, EC, moisture, and temperature sensors.",
      "Stream telemetry over MQTT to a Node.js backend and SQLite storage.",
      "Use a Python Scikit-learn/XGBoost layer to generate crop guidance and alerts.",
      "Support edge inference in low-connectivity settings and sync when connectivity returns.",
    ],
  },
  {
    title: "Green-Signale — Smart Traffic Monitoring",
    category: "CV",
    featured: false,
    image: "",
    demo: "",
    problem: "Detect vehicles and estimate traffic density from live video.",
    approach: "Run YOLOv8 Nano detections on video streams with OpenCV.",
    result: "87.6% mAP@0.5.",
    accent: "#39c5ff",
    description: "A real-time traffic monitoring system using YOLOv8 Nano trained on a custom-labelled dataset covering 5 vehicle/object classes (car, bus, truck, bike, person). Trained for 50 epochs at 640px resolution, achieving 87.6% mAP@0.5. Deploys real-time detection on live video streams via OpenCV, estimating per-frame traffic density to enable adaptive signal control logic suitable for edge deployment.",
    stack: "Python, YOLOv8 (Ultralytics), OpenCV, Custom Dataset",
    github: "https://github.com/Pratham4644/Green-Signale.git",
    badge: "87.6% mAP@0.5",
    architecture: [
      "Train YOLOv8 Nano on a custom-labelled dataset of five vehicle and road-user classes.",
      "Run detections on live video streams with OpenCV.",
      "Estimate traffic density per frame to inform adaptive signal-control logic.",
    ],
  },
  {
    title: "AI-Powered E-Waste Condition Classifier",
    category: "CV",
    featured: false,
    image: "",
    demo: "",
    problem: "Classify discarded electronic devices by condition to support e-waste triage.",
    approach: "Train a YOLOv8 pipeline and present confidence-scored inference in a Streamlit app.",
    result: "TODO: add metric",
    accent: "#ff9500",
    description: "An end-to-end computer vision system that automates e-waste triage by classifying discarded electronic devices into Usable, Repairable, or Trash. Built a complete ML pipeline from scratch: dataset curation, YOLOv8 training, label mapping, confidence-scored inference, and result persistence. Supports ten device categories including batteries, mobile phones, PCBs, printers, and more. Wrapped in a full Streamlit web application with location-aware recycling centre mapping.",
    stack: "Python, YOLOv8 (Ultralytics), Streamlit, PyTorch, PIL, Pandas, JSON, CSV, Custom CSS, Geolocation API",
    github: "https://github.com/Pratham4644/E-waste-locator-.git",
    badge: "YOLOv8 · Streamlit Inference Pipeline",
    architecture: [
      "Train a YOLOv8 model to classify device condition across ten e-waste categories.",
      "Present confidence-scored inference in a Streamlit application.",
      "Persist results and map nearby recycling centres with location support.",
    ],
  },
];

export const PROOF_ITEMS = [
  {
    label: "Green-Signale",
    detail: PROJECTS.find((project) => project.title.startsWith("Green-Signale")).result,
  },
  {
    label: "Vasudha",
    detail: PROJECTS.find((project) => project.title.startsWith("Vasudha")).result,
  },
  ...MODEL_PERFORMANCE.slice(0, 3).map((model) => ({
    label: `TechnoHacks internship · ${model.task}`,
    detail: `${model.metric}: ${model.score}`,
  })),
];

export const ACHIEVEMENTS = [
  { title: "Hackathon Winner", detail: "ADCET Internal Hackathon — 2nd place for Vasudha (offline RAG agri-chatbot), hardware+software team" },
  { title: "DIPEX State-Level Project Exhibition", detail: "Represented college at state level with Vasudha project" },
  { title: "Kaggle Certifications", detail: "Machine Learning Badge, Data Analysis Badge", url: "https://www.kaggle.com/prashps" },
];

export const EXPERIENCES = [
  {
    title: "Machine Learning Intern",
    company: "TechnoHacks Solutions Pvt. Ltd.",
    duration: "Jun 2025 – Jul 2025",
    certificateUrl: "https://drive.google.com/file/d/1YI7i58eohDO6bgDxJMs3OSdeVK3YQjns/view?usp=drive_link",
    description: [
      "Built three end-to-end ML models: car price predictor (R²: 0.91), hotel booking classifier (F1: 0.88), Fashion MNIST CNN (93.4% accuracy)",
      "Applied GridSearchCV hyperparameter tuning; evaluated using F1, R², RMSE",
      "Deployed a Flask web application for live model inference",
    ],
    tags: ["Python", "Scikit-learn", "XGBoost", "TensorFlow", "Flask", "Pandas", "NumPy", "GridSearchCV"],
  },
];

export const CERTIFICATIONS = [
  { title: "College Event Certificate 1", issuer: "Annasaheb Dange College of Engineering and Technology", url: "https://drive.google.com/file/d/1c3EmPkKfZAqV5Lf8u3fT8rr-UdLcfTLO/view?usp=drive_link", isAchievement: false },
  { title: "College Event Certificate 2", issuer: "Annasaheb Dange College of Engineering and Technology", url: "https://drive.google.com/file/d/1YvdK72_I-DPYnlOCjI9295wgQ1LJcumK/view?usp=drivesdk", isAchievement: false },
  { title: "College Event Certificate 3", issuer: "Annasaheb Dange College of Engineering and Technology", url: "https://drive.google.com/file/d/14OXGUTS2ImNrBcRAMKatkiLC0vWR-nVd/view?usp=drive_link", isAchievement: false },
  { title: "Machine Learning Badge", issuer: "Kaggle", url: "https://www.kaggle.com/certification/badges/prashps/105", isAchievement: false },
  { title: "Data Badge", issuer: "Kaggle", url: "https://www.kaggle.com/certification/badges/prashps/30", isAchievement: false },
  { title: "Avishkar Hackathon Participation", issuer: "Annasaheb Dange College of Engineering and Technology", url: "https://drive.google.com/file/d/1YI7i58eohDO6bgDxJMs3OSdeVK3YQjns/view?usp=sharing", isAchievement: true, accent: "#7b61ff" },
];

export const SOCIAL_LINKS = {
  GitHub: "https://github.com/Pratham4644",
  LinkedIn: "https://www.linkedin.com/in/prathamesh-shinde-05942b288",
  LeetCode: "https://leetcode.com/u/prathamesh2310/",
  Kaggle: "https://www.kaggle.com/prashps",
};
