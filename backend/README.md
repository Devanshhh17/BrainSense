# BrainSense Backend (FastAPI + ML)

Backend for **BrainSense: Minimal-Data Cognitive Risk Predictor**.

This backend predicts an **early risk awareness level** (`low`, `moderate`, `high`) from minimal smartphone behavior features.  
It is for research and awareness only, **not medical diagnosis**.

## Project Overview

- Accepts behavioral numeric inputs from frontend
- Runs ML prediction with confidence score
- Returns top contributing features (simple explainability)
- Stores prediction history in SQLite
- Supports model training/retraining with synthetic dataset
- Exposes REST APIs using FastAPI

## Tech Stack

- Python 3
- FastAPI + Uvicorn
- SQLite + SQLAlchemy ORM
- Pydantic validation
- scikit-learn, pandas, numpy
- XGBoost (optional, fallback handled)
- joblib (model persistence)

## Folder Structure

```text
backend/
│── app/
│   │── main.py
│   │── database.py
│   │── dependencies.py
│   │── models/
│   │   │── db_models.py
│   │   │── ml_model.py
│   │── schemas/
│   │   │── input_schema.py
│   │   │── response_schema.py
│   │── routes/
│   │   │── __init__.py
│   │   │── predict.py
│   │   │── history.py
│   │   │── training.py
│   │── services/
│   │   │── predictor.py
│   │   │── trainer.py
│   │   │── explainability.py
│   │── utils/
│   │   │── synthetic_data.py
│   │   │── helpers.py
│── trained_models/
│   │── best_model.pkl
│   │── model_metrics.json
│── data/
│   │── synthetic_dataset.csv
│── generate_dataset.py
│── train_model.py
│── requirements.txt
│── README.md
```

## Privacy-Aware Scope

This project stores only minimal numerical behavior indicators:

- screen/usage patterns
- typing behavior summary
- movement regularity score
- wellness scale scores

This backend **does not store**:

- message content
- browsing history text
- contact lists
- personal media content

## Setup Instructions

1. Move into backend directory:

```bash
cd backend
```

2. Create virtual environment:

```bash
python -m venv .venv
```

3. Activate virtual environment:

- Windows:
```bash
.venv\Scripts\activate
```
- Linux/macOS:
```bash
source .venv/bin/activate
```

4. Install dependencies:

```bash
pip install -r requirements.txt
```

## Run API Server

```bash
uvicorn app.main:app --reload
```

FastAPI docs:

- Swagger UI: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- ReDoc: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

## Generate Synthetic Dataset

```bash
python generate_dataset.py
```

This creates `data/synthetic_dataset.csv` with >= 1000 rows (default 1200).

## Train / Retrain Model

```bash
python train_model.py
```

This compares:

- Logistic Regression
- Random Forest
- XGBoost (if installed/available)

Best model is saved to:

- `trained_models/best_model.pkl`
- `trained_models/model_metrics.json`

## API Endpoints

- `GET /` - health message
- `POST /predict` - predict risk level
- `POST /save-entry` - save input + prediction into history
- `GET /history` - fetch all history entries
- `GET /history/{id}` - fetch single entry detail
- `DELETE /history/{id}` - delete one entry
- `GET /model-metrics` - model performance metrics
- `POST /train-model` - retrain and save best model
- `GET /feature-schema` - input schema metadata
- `POST /generate-synthetic-data` - regenerate synthetic CSV

## Sample Predict Request

```json
{
  "daily_screen_time": 6.2,
  "unlock_count": 82,
  "avg_session_duration": 4.8,
  "social_media_usage": 3.4,
  "productivity_usage": 1.9,
  "entertainment_usage": 2.7,
  "late_night_usage": 61,
  "typing_speed": 42,
  "typing_pause_duration": 2.1,
  "backspace_frequency": 17,
  "movement_regularity": 66,
  "sleep_quality": 52,
  "stress_level": 70,
  "fatigue_level": 63,
  "mood_score": 48
}
```

## Sample Predict Response

```json
{
  "risk_level": "moderate",
  "confidence_score": 0.84,
  "top_contributing_features": [
    {"feature": "stress_level", "impact": "high"},
    {"feature": "sleep_quality", "impact": "medium"},
    {"feature": "late_night_usage", "impact": "medium"}
  ],
  "recommendation": "Try improving sleep consistency and reducing late-night phone usage.",
  "disclaimer": "This system is only for early risk awareness and not for medical diagnosis.",
  "timestamp": "2026-03-31T18:30:00.000000"
}
```

## Notes for Frontend Integration

- Use `POST /predict` for instant result preview
- Use `POST /save-entry` to persist user session history
- Use `GET /feature-schema` to drive dynamic form hints/validation

This structure is beginner-friendly and ready to connect with a React frontend.
