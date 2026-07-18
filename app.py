import json

from flask import Flask, render_template
import numpy as np

from pygments import highlight
from pygments.lexers import get_lexer_by_name
from pygments.formatters import HtmlFormatter

from portfolio.content import (
    BIO,
    BRANCH,
    CERTIFICATIONS,
    CGPA,
    COLLEGE,
    EMAIL,
    EXPERIENCES,
    FULL_NAME,
    LOCATION,
    MODEL_PERFORMANCE,
    PROJECTS,
    RESUME_URL,
    ROLE_TITLES,
    SKILL_GROUPS_ABOUT,
    SKILLS_GROUPS,
    SOCIAL_LINKS,
    STATS,
    ACHIEVEMENTS,
    YEAR,
    YEAR_RANGE,
)


app = Flask(__name__, template_folder="portfolio/templates")


@app.route("/")
def index():
    first_name = FULL_NAME.split()[0] if FULL_NAME else ""
    last_name = FULL_NAME.split()[-1] if FULL_NAME else ""
    # Render Pygments-highlighted snippets for projects (if present)
    projects = []
    formatter = HtmlFormatter(nowrap=True)
    pygments_css = HtmlFormatter().get_style_defs('.codehilite')
    for p in PROJECTS:
        p_copy = dict(p)
        snippet = p_copy.get("snippet")
        if snippet:
            try:
                lexer = get_lexer_by_name(p_copy.get("snippet_lang", "python"))
                p_copy["snippet_html"] = highlight(snippet, lexer, formatter)
            except Exception:
                p_copy["snippet_html"] = ""
        projects.append(p_copy)

    return render_template(
        "index.html",
        full_name=FULL_NAME,
        first_name=first_name,
        last_name=last_name,
        email=EMAIL,
        location=LOCATION,
        resume_url=RESUME_URL,
        role_titles_json=json.dumps(ROLE_TITLES),
        bio=BIO,
        stats=STATS,
        skill_groups_about=SKILL_GROUPS_ABOUT,
        skills_groups=SKILLS_GROUPS,
        projects=projects,
        model_performance=MODEL_PERFORMANCE,
        achievements=ACHIEVEMENTS,
        experiences=EXPERIENCES,
        college=COLLEGE,
        branch=BRANCH,
        year=YEAR,
        cgpa=CGPA,
        year_range=YEAR_RANGE,
        certifications=CERTIFICATIONS,
        social_links=SOCIAL_LINKS,
        pygments_css=pygments_css,
    )


if __name__ == "__main__":
    app.run(debug=True, port=5000)
