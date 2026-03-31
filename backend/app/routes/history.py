import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.db_models import PredictionHistory


router = APIRouter(tags=["history"])


@router.get("/history")
def get_history(db: Session = Depends(get_db)):
  records = db.query(PredictionHistory).order_by(PredictionHistory.created_at.desc()).all()
  return [
    {
      "id": row.id,
      "risk_level": row.risk_level,
      "confidence_score": row.confidence_score,
      "top_factors": json.loads(row.top_factors),
      "created_at": row.created_at,
    }
    for row in records
  ]


@router.get("/history/{entry_id}")
def get_history_item(entry_id: int, db: Session = Depends(get_db)):
  row = db.query(PredictionHistory).filter(PredictionHistory.id == entry_id).first()
  if row is None:
    raise HTTPException(status_code=404, detail="History entry not found.")
  return {
    "id": row.id,
    "daily_screen_time": row.daily_screen_time,
    "unlock_count": row.unlock_count,
    "avg_session_duration": row.avg_session_duration,
    "social_media_usage": row.social_media_usage,
    "productivity_usage": row.productivity_usage,
    "entertainment_usage": row.entertainment_usage,
    "late_night_usage": row.late_night_usage,
    "typing_speed": row.typing_speed,
    "typing_pause_duration": row.typing_pause_duration,
    "backspace_frequency": row.backspace_frequency,
    "movement_regularity": row.movement_regularity,
    "sleep_quality": row.sleep_quality,
    "stress_level": row.stress_level,
    "fatigue_level": row.fatigue_level,
    "mood_score": row.mood_score,
    "risk_level": row.risk_level,
    "confidence_score": row.confidence_score,
    "top_factors": json.loads(row.top_factors),
    "created_at": row.created_at,
  }


@router.delete("/history/{entry_id}")
def delete_history_item(entry_id: int, db: Session = Depends(get_db)):
  row = db.query(PredictionHistory).filter(PredictionHistory.id == entry_id).first()
  if row is None:
    raise HTTPException(status_code=404, detail="History entry not found.")
  db.delete(row)
  db.commit()
  return {"message": "History entry deleted successfully.", "id": entry_id}
