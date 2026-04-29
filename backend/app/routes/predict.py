import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db, get_history_collection, is_mongodb_enabled
from app.dependencies import get_predictor
from app.models.db_models import PredictionHistory
from app.schemas.input_schema import PredictionInput
from app.schemas.response_schema import PredictResponse, SaveEntryResponse
from app.utils.helpers import now_utc


router = APIRouter(tags=["prediction"])


@router.post("/predict", response_model=PredictResponse)
def predict(data: PredictionInput, predictor=Depends(get_predictor)):
  try:
    result = predictor.predict(data.model_dump())
    result["timestamp"] = now_utc()
    return result
  except Exception as exc:
    raise HTTPException(status_code=500, detail=f"Prediction failed: {exc}") from exc


@router.post("/save-entry", response_model=SaveEntryResponse)
def save_entry(data: PredictionInput, db: Session = Depends(get_db), predictor=Depends(get_predictor)):
  try:
    result = predictor.predict(data.model_dump())
    if is_mongodb_enabled():
      collection = get_history_collection()
      document = {
        **data.model_dump(),
        "risk_level": result["risk_level"],
        "confidence_score": result["confidence_score"],
        "top_contributing_features": result["top_contributing_features"],
        "created_at": now_utc(),
      }
      inserted = collection.insert_one(document)
      return {"id": str(inserted.inserted_id), "message": "Entry saved successfully."}

    record = PredictionHistory(
      **data.model_dump(),
      risk_level=result["risk_level"],
      confidence_score=result["confidence_score"],
      top_factors=json.dumps(result["top_contributing_features"]),
      created_at=now_utc(),
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    return {"id": record.id, "message": "Entry saved successfully."}
  except Exception as exc:
    raise HTTPException(status_code=500, detail=f"Failed to save entry: {exc}") from exc
