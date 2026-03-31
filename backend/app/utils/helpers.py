from datetime import datetime
from typing import Dict, List


FEATURE_COLUMNS = [
  "daily_screen_time",
  "unlock_count",
  "avg_session_duration",
  "social_media_usage",
  "productivity_usage",
  "entertainment_usage",
  "late_night_usage",
  "typing_speed",
  "typing_pause_duration",
  "backspace_frequency",
  "movement_regularity",
  "sleep_quality",
  "stress_level",
  "fatigue_level",
  "mood_score",
]

RISK_LABELS = {0: "low", 1: "moderate", 2: "high"}

DISCLAIMER = "This system is only for early risk awareness and not for medical diagnosis."


def now_utc() -> datetime:
  return datetime.utcnow()


def recommendation_from_risk(risk_level: str) -> str:
  if risk_level == "high":
    return "Please prioritize sleep consistency, reduce late-night use, and seek guidance from a qualified professional."
  if risk_level == "moderate":
    return "Try improving sleep consistency and reducing late-night phone usage."
  return "Current pattern appears stable. Maintain healthy digital habits and regular rest."


def parse_feature_impacts(raw: List[Dict[str, str]]) -> List[Dict[str, str]]:
  return [{"feature": item["feature"], "impact": item["impact"]} for item in raw]
