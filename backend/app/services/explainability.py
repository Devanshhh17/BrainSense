from typing import Dict, List
import numpy as np
from app.utils.helpers import FEATURE_COLUMNS


def _impact_label(value: float) -> str:
  if value >= 0.66:
    return "high"
  if value >= 0.33:
    return "medium"
  return "low"


def explain_prediction(model, input_values: Dict[str, float], top_k: int = 5) -> List[Dict[str, str]]:
  # Tree models usually expose feature_importances_.
  if hasattr(model, "feature_importances_"):
    importances = np.array(model.feature_importances_, dtype=float)
    if importances.sum() > 0:
      normalized = importances / importances.max()
      ranking = np.argsort(-importances)[:top_k]
      return [
        {"feature": FEATURE_COLUMNS[idx], "impact": _impact_label(float(normalized[idx]))}
        for idx in ranking
      ]

  # Fallback for linear/probabilistic models:
  # use absolute contribution proxy = |coefficient * feature_value|.
  if hasattr(model, "coef_"):
    coef = np.array(model.coef_)
    if coef.ndim == 2:
      coef = np.mean(np.abs(coef), axis=0)
    contrib = np.abs(coef * np.array([input_values[f] for f in FEATURE_COLUMNS], dtype=float))
    if contrib.max() > 0:
      norm = contrib / contrib.max()
      ranking = np.argsort(-contrib)[:top_k]
      return [
        {"feature": FEATURE_COLUMNS[idx], "impact": _impact_label(float(norm[idx]))}
        for idx in ranking
      ]

  # Last-resort fixed explanation.
  fallback = ["stress_level", "sleep_quality", "late_night_usage", "fatigue_level", "mood_score"]
  return [{"feature": name, "impact": "medium"} for name in fallback[:top_k]]
