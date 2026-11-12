import math
import os
from typing import Optional

import joblib
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

from text_cleaner import clean_text
import database

# ── Initialise ──────────────────────────────────────────────────────────────────
database.init_db()

app = FastAPI(
    title="JOBCIPHER AI – Fake Job Detection System",
    description="NLP-powered API to detect fraudulent job postings",
    version="2.0.0",
)

# ── Static files & SPA ─────────────────────────────────────────────────────────
current_dir = os.path.dirname(os.path.abspath(__file__))
static_dir  = os.path.join(current_dir, "static")
app.mount("/static", StaticFiles(directory=static_dir), name="static")


@app.get("/", include_in_schema=False)
def serve_spa():
    return FileResponse(os.path.join(static_dir, "index.html"))


# ── Load ML artefacts ──────────────────────────────────────────────────────────
model      = joblib.load(os.path.join(current_dir, "fake_job_model.pkl"))
vectorizer = joblib.load(os.path.join(current_dir, "tfidf_vectorizer.pkl"))


# ── Schemas ────────────────────────────────────────────────────────────────────
class JobPosting(BaseModel):
    job_title:       Optional[str] = Field(default="", description="Job title")
    company:         Optional[str] = Field(default="", description="Company name (stored for history)")
    job_description: str           = Field(...,         description="Main job description")
    requirements:    Optional[str] = Field(default="", description="Requirements")
    benefits:        Optional[str] = Field(default="", description="Benefits")
    company_profile: Optional[str] = Field(default="", description="Company profile text")


# ── Predict ────────────────────────────────────────────────────────────────────
@app.post("/predict")
def predict_job(job: JobPosting):
    # Combine all relevant text fields (same logic as original training pipeline)
    raw_combined = " ".join([
        job.job_title       or "",
        job.job_description or "",
        job.requirements    or "",
        job.benefits        or "",
        job.company_profile or "",
    ]).strip()

    cleaned   = clean_text(raw_combined)
    tfidf_vec = vectorizer.transform([cleaned])
    pred_int  = int(model.predict(tfidf_vec)[0])

    is_fake      = pred_int == 1
    result_label = "POTENTIALLY FAKE JOB" if is_fake else "REAL JOB"

    probabilities = None
    if hasattr(model, "predict_proba"):
        probs = model.predict_proba(tfidf_vec)[0]
        probabilities = {
            "real_probability": round(float(probs[0]), 4),
            "fake_probability": round(float(probs[1]), 4),
        }

    # ── Persist to history ─────────────────────────────────────────────────────
    database.save_analysis(
        job_title   = job.job_title,
        company     = job.company,
        prediction  = result_label,
        is_fake     = is_fake,
        fake_prob   = probabilities["fake_probability"] if probabilities else 0.0,
        real_prob   = probabilities["real_probability"]  if probabilities else 0.0,
        description = job.job_description,
    )

    return {
        "prediction": result_label,
        "is_fake":    is_fake,
        "confidence": probabilities,
    }


# ── Dashboard stats ────────────────────────────────────────────────────────────
@app.get("/stats")
def get_stats():
    return database.get_stats()


# ── Analysis history ───────────────────────────────────────────────────────────
@app.get("/history")
def get_history(page: int = 1, per_page: int = 10):
    items, total = database.get_history(page, per_page)
    return {
        "items":    items,
        "total":    total,
        "page":     page,
        "per_page": per_page,
        "pages":    math.ceil(total / per_page) if total > 0 else 1,
    }


@app.get("/history/{analysis_id}")
def get_analysis(analysis_id: int):
    item = database.get_by_id(analysis_id)
    if not item:
        raise HTTPException(status_code=404, detail="Analysis not found")
    return item


@app.delete("/history/{analysis_id}")
def delete_analysis(analysis_id: int):
    item = database.get_by_id(analysis_id)
    if not item:
        raise HTTPException(status_code=404, detail="Analysis not found")
    database.delete_by_id(analysis_id)
    return {"success": True, "message": "Analysis deleted"}


# ── Daily analytics ────────────────────────────────────────────────────────────
@app.get("/analytics/daily")
def daily_analytics(days: int = 7):
    return database.get_daily_stats(days)


# ── Entry point ────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
