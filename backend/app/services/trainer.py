import json
from pathlib import Path
from typing import Dict, Tuple

import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

from app.utils.helpers import FEATURE_COLUMNS
from app.utils.synthetic_data import generate_synthetic_dataset

try:
  from xgboost import XGBClassifier
  XGB_AVAILABLE = True
except Exception:
  XGB_AVAILABLE = False


def _model_metrics(y_true, y_pred) -> Dict[str, float]:
  return {
    "accuracy": float(accuracy_score(y_true, y_pred)),
    "precision": float(precision_score(y_true, y_pred, average="weighted", zero_division=0)),
    "recall": float(recall_score(y_true, y_pred, average="weighted", zero_division=0)),
    "f1_score": float(f1_score(y_true, y_pred, average="weighted", zero_division=0)),
  }


def _build_models():
  models = {
    "logistic_regression": Pipeline(
      steps=[
        ("scaler", StandardScaler()),
        ("classifier", LogisticRegression(max_iter=1200, multi_class="multinomial")),
      ]
    ),
    "random_forest": RandomForestClassifier(
      n_estimators=250, random_state=42, class_weight="balanced"
    ),
  }
  if XGB_AVAILABLE:
    models["xgboost"] = XGBClassifier(
      n_estimators=220,
      learning_rate=0.07,
      max_depth=5,
      subsample=0.9,
      colsample_bytree=0.9,
      objective="multi:softprob",
      eval_metric="mlogloss",
      random_state=42,
    )
  return models


def _paths(base_dir: Path) -> Tuple[Path, Path, Path]:
  data_path = base_dir / "data" / "synthetic_dataset.csv"
  model_path = base_dir / "trained_models" / "best_model.pkl"
  metrics_path = base_dir / "trained_models" / "model_metrics.json"
  return data_path, model_path, metrics_path


def train_and_save_models(base_dir: Path) -> Dict:
  data_path, model_path, metrics_path = _paths(base_dir)

  # Generate dataset if missing.
  if not data_path.exists():
    generate_synthetic_dataset(data_path, n_rows=1200)

  df = pd.read_csv(data_path)
  x = df[FEATURE_COLUMNS]
  y = df["risk_class"]
  x_train, x_test, y_train, y_test = train_test_split(
    x, y, test_size=0.2, random_state=42, stratify=y
  )

  all_metrics: Dict[str, Dict[str, float]] = {}
  best_name = ""
  best_score = -1.0
  best_model = None

  for name, model in _build_models().items():
    model.fit(x_train, y_train)
    preds = model.predict(x_test)
    metrics = _model_metrics(y_test, preds)
    all_metrics[name] = metrics
    if metrics["f1_score"] > best_score:
      best_score = metrics["f1_score"]
      best_model = model
      best_name = name

  if best_model is None:
    raise RuntimeError("No model was successfully trained.")

  model_path.parent.mkdir(parents=True, exist_ok=True)
  joblib.dump(best_model, model_path)

  payload = {
    "best_model": best_name,
    "metrics": all_metrics,
    "xgboost_available": XGB_AVAILABLE,
  }
  with metrics_path.open("w", encoding="utf-8") as file:
    json.dump(payload, file, indent=2)
  return payload
