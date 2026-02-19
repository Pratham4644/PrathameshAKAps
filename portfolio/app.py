# -*- coding: utf-8 -*-
"""
Flask application for Prathamesh Shinde's portfolio.
Run: python app.py
Then open: http://127.0.0.1:5000
"""

from flask import Flask, render_template

from content import (
    BIO,
    BRANCH,
    CERTIFICATIONS,
    CGPA,
    COLLEGE,
    EMAIL,
    EXPERIENCES,
    FULL_NAME,
    LOCATION,
    PROJECTS,
    RESUME_URL,
    ROLE_TITLES,
    SKILL_GROUPS_ABOUT,
    SKILLS_GROUPS,
    SOCIAL_LINKS,
    STATS,
    YEAR,
    YEAR_RANGE,
)

app = Flask(__name__)


@app.route("/")
def index():
    return render_template(
        "index.html",
        full_name=FULL_NAME,
        email=EMAIL,
        location=LOCATION,
        resume_url=RESUME_URL,
        role_titles=ROLE_TITLES,
        bio=BIO,
        stats=STATS,
        skill_groups_about=SKILL_GROUPS_ABOUT,
        skills_groups=SKILLS_GROUPS,
        projects=PROJECTS,
        experiences=EXPERIENCES,
        college=COLLEGE,
        branch=BRANCH,
        year=YEAR,
        cgpa=CGPA,
        year_range=YEAR_RANGE,
        certifications=CERTIFICATIONS,
        social_links=SOCIAL_LINKS,
    )


if __name__ == "__main__":
    app.run(debug=True, port=5000)
