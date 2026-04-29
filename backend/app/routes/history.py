import json
from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db, get_history_collection, is_mongodb_enabled
from app.models.db_models import PredictionHistory


router = APIRouter(tags=["history"])


@router.get("/history")
def get_history(db: Session = Depends(get_db)):
  if is_mongodb_enabled():
    collection = get_history_collection()
    records = collection.find().sort("created_at", -1)
    return [
      {
        "id": str(record["_id"]),
        "risk_level": record["risk_level"],
        "confidence_score": record["confidence_score"],
        "top_factors": record.get("top_contributing_features", []),
        "created_at": record["created_at"],
      }
      for record in records
    ]

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
def get_history_item(entry_id: str, db: Session = Depends(get_db)):
  if is_mongodb_enabled():
    collection = get_history_collection()
    try:
      obj_id = ObjectId(entry_id)
    except Exception:
      raise HTTPException(status_code=400, detail="Invalid history entry id.")
    record = collection.find_one({"_id": obj_id})
    if record is None:
      raise HTTPException(status_code=404, detail="History entry not found.")
    return {
      "id": str(record["_id"]),
      "daily_screen_time": record["daily_screen_time"],
      "unlock_count": record["unlock_count"],
      "avg_session_duration": record["avg_session_duration"],
      "social_media_usage": record["social_media_usage"],
      "productivity_usage": record["productivity_usage"],
      "entertainment_usage": record["entertainment_usage"],
      "late_night_usage": record["late_night_usage"],
      "typing_speed": record["typing_speed"],
      "typing_pause_duration": record["typing_pause_duration"],
      "backspace_frequency": record["backspace_frequency"],
      "movement_regularity": record["movement_regularity"],
      "sleep_quality": record["sleep_quality"],
      "stress_level": record["stress_level"],
      "fatigue_level": record["fatigue_level"],
      "mood_score": record["mood_score"],
      "risk_level": record["risk_level"],
      "confidence_score": record["confidence_score"],
      "top_factors": record.get("top_contributing_features", []),
      "created_at": record["created_at"],
    }

  try:
    numeric_id = int(entry_id)
  except ValueError:
    raise HTTPException(status_code=400, detail="Invalid history entry id.")

  row = db.query(PredictionHistory).filter(PredictionHistory.id == numeric_id).first()
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
def delete_history_item(entry_id: str, db: Session = Depends(get_db)):
  if is_mongodb_enabled():
    collection = get_history_collection()
    try:
      obj_id = ObjectId(entry_id)
    except Exception:
      raise HTTPException(status_code=400, detail="Invalid history entry id.")
    result = collection.delete_one({"_id": obj_id})
    if result.deleted_count == 0:
      raise HTTPException(status_code=404, detail="History entry not found.")
    return {"message": "History entry deleted successfully.", "id": entry_id}

  try:
    numeric_id = int(entry_id)
  except ValueError:
    raise HTTPException(status_code=400, detail="Invalid history entry id.")

  row = db.query(PredictionHistory).filter(PredictionHistory.id == numeric_id).first()
  if row is None:
    raise HTTPException(status_code=404, detail="History entry not found.")
  db.delete(row)
  db.commit()
  return {"message": "History entry deleted successfully.", "id": entry_id}
