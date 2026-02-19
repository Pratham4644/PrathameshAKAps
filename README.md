rathamesh Shinde — Portfolio
A single-page, fully responsive portfolio website with a "Neural Terminal 3D" aesthetic. Built with Flask so you can easily edit content in Python.

Quick Start
cd portfolio
pip install -r requirements.txt
python app.py
Then open http://127.0.0.1:5000 in your browser.

Editing Content
All portfolio content is in content.py. Edit that file to update:

Identity: name, email, location, resume URL, role titles, bio
Stats: B.Tech year, CGPA, project count
Skills: skill groups and percentages
Projects: title, description, stack, GitHub URL
Experience: internships, roles, certificates
Certifications: certificates and achievement links
Social links: GitHub, LinkedIn, LeetCode, Kaggle
No HTML or CSS changes needed for content updates.

Structure
portfolio/
├── app.py           # Flask app and routes
├── content.py       # All content (edit this)
├── requirements.txt
├── README.md
└── templates/
    └── index.html   # Single-page template (HTML + CSS + JS)
Tech Stack
Backend: Flask (Python)
Frontend: Vanilla HTML, CSS, JavaScript
3D: Three.js (CDN) for hero neural network canvas
Fonts: JetBrains Mono, Syne (Google Fonts)
