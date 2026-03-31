import json
from pathlib import Path
from typing import Dict, List

import joblib
import numpy as np
import pandas as pd

from app.services.explainability import explain_prediction
from app.services.trainer import train_and_save_models
from app.utils.helpers import DISCLAIMER, FEATURE_COLUMNS, RISK_LABELS, recommendation_from_risk


class BrainSensePredictor:
  def __init__(self, base_dir: Path):
    self.base_dir = base_dir
    self.model_path = base_dir / "trained_models" / "best_model.pkl"
    self.metrics_path = base_dir / "trained_models" / "model_metrics.json"
    self.model = None
    self.metrics = {}
    self.best_model_name = ""
    self.load_or_train()

  def load_or_train(self):
    if not self.model_path.exists():
      trained = train_and_save_models(self.base_dir)
      self.metrics = trained.get("metrics", {})
      self.best_model_name = trained.get("best_model", "")

    self.model = joblib.load(self.model_path)
    if self.metrics_path.exists():
      with self.metrics_path.open("r", encoding="utf-8") as file:
        data = json.load(file)
      self.metrics = data.get("metrics", {})
      self.best_model_name = data.get("best_model", "")

  def retrain(self) -> Dict:
    trained = train_and_save_models(self.base_dir)
    self.model = joblib.load(self.model_path)
    self.metrics = trained.get("metrics", {})
    self.best_model_name = trained.get("best_model", "")
    return trained

  def predict(self, payload: Dict[str, float]) -> Dict:
    if self.model is None:
      raise RuntimeError("Model is not loaded.")

    x_df = pd.DataFrame([[payload[key] for key in FEATURE_COLUMNS]], columns=FEATURE_COLUMNS)
    pred_class = int(self.model.predict(x_df)[0])
    risk_level = RISK_LABELS.get(pred_class, "moderate")

    confidence = 0.75
    if hasattr(self.model, "predict_proba"):
      proba = self.model.predict_proba(x_df)[0]
      confidence = float(np.max(proba))

    top_features: List[Dict[str, str]] = explain_prediction(self.model, payload, top_k=5)
    return {
      "risk_level": risk_level,
      "confidence_score": round(confidence, 4),
      "top_contributing_features": top_features,
      "recommendation": recommendation_from_risk(risk_level),
      "disclaimer": DISCLAIMER,
    }
