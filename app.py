import json
import time
import io
import base64
from pathlib import Path

from flask import Flask, render_template, request, jsonify
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

# Load trained digit model (if present)
MODEL_DIR = Path(__file__).parent / "portfolio" / "models"
MODEL_PATH = MODEL_DIR / "digits_clf.pkl"
META_PATH = MODEL_DIR / "digits_meta.json"
MODEL = None
MODEL_META = None
try:
    import joblib

    if MODEL_PATH.exists():
        MODEL = joblib.load(MODEL_PATH)
    if META_PATH.exists():
        with open(META_PATH, "r", encoding="utf-8") as f:
            MODEL_META = json.load(f)
except Exception:
    MODEL = None
    MODEL_META = None


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
        model_meta=MODEL_META,
        pygments_css=pygments_css,
    )


@app.route("/predict_digit", methods=["POST"])
def predict_digit():
    if MODEL is None:
        return jsonify({"error": "model-not-loaded"}), 500

    data = request.get_json() or {}
    img_b64 = data.get("image")
    if not img_b64:
        return jsonify({"error": "missing-image"}), 400

    # data URL may be like 'data:image/png;base64,...'
    if "," in img_b64:
        img_b64 = img_b64.split(",", 1)[1]

    try:
        raw = base64.b64decode(img_b64)
        from PIL import Image

        img = Image.open(io.BytesIO(raw)).convert("L")
        img = img.resize((8, 8), Image.BILINEAR)
        arr = (255 - (np.array(img))).astype("float32")
        # scale to 0-16 like sklearn digits
        arr = (arr / 255.0) * 16.0
        X = arr.reshape(1, -1)
        t0 = time.perf_counter()
        probs = MODEL.predict_proba(X)[0]
        pred = int(probs.argmax())
        elapsed = (time.perf_counter() - t0) * 1000.0
        return jsonify({"pred": pred, "probs": probs.tolist(), "time_ms": elapsed})
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
