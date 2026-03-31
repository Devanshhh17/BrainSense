from pathlib import Path
from fastapi import APIRouter, Depends, HTTPException

from app.dependencies import get_predictor
from app.utils.helpers import FEATURE_COLUMNS
from app.utils.synthetic_data import generate_synthetic_dataset


router = APIRouter(tags=["training"])


@router.get("/model-metrics")
def model_metrics(predictor=Depends(get_predictor)):
  return {
    "best_model": predictor.best_model_name,
    "metrics": predictor.metrics,
  }


@router.post("/train-model")
def train_model(predictor=Depends(get_predictor)):
  try:
    payload = predictor.retrain()
    return {
      "message": "Model trained and saved successfully.",
      "best_model": payload.get("best_model"),
      "metrics": payload.get("metrics"),
      "xgboost_available": payload.get("xgboost_available"),
    }
  except Exception as exc:
    raise HTTPException(status_code=500, detail=f"Training failed: {exc}") from exc


@router.get("/feature-schema")
def feature_schema():
  schema = {
    "daily_screen_time": {"type": "float", "min": 0, "max": 24},
    "unlock_count": {"type": "float", "min": 0, "max": 500},
    "avg_session_duration": {"type": "float", "min": 0, "max": 120},
    "social_media_usage": {"type": "float", "min": 0, "max": 24},
    "productivity_usage": {"type": "float", "min": 0, "max": 24},
    "entertainment_usage": {"type": "float", "min": 0, "max": 24},
    "late_night_usage": {"type": "float", "min": 0, "max": 100},
    "typing_speed": {"type": "float", "min": 0, "max": 200},
    "typing_pause_duration": {"type": "float", "min": 0, "max": 20},
    "backspace_frequency": {"type": "float", "min": 0, "max": 100},
    "movement_regularity": {"type": "float", "min": 0, "max": 100},
    "sleep_quality": {"type": "float", "min": 0, "max": 100},
    "stress_level": {"type": "float", "min": 0, "max": 100},
    "fatigue_level": {"type": "float", "min": 0, "max": 100},
    "mood_score": {"type": "float", "min": 0, "max": 100},
  }
  return {"feature_order": FEATURE_COLUMNS, "fields": schema}


@router.post("/generate-synthetic-data")
def regenerate_dataset(rows: int = 1200):
  try:
    backend_root = Path(__file__).resolve().parents[2]
    path = backend_root / "data" / "synthetic_dataset.csv"
    df = generate_synthetic_dataset(path, n_rows=rows)
    return {"message": "Synthetic dataset regenerated.", "rows": len(df), "path": str(path)}
  except Exception as exc:
    raise HTTPException(status_code=500, detail=f"Dataset generation failed: {exc}") from exc
