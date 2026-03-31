from datetime import datetime
from typing import List
from pydantic import BaseModel


class FeatureImpact(BaseModel):
  feature: str
  impact: str


class PredictResponse(BaseModel):
  risk_level: str
  confidence_score: float
  top_contributing_features: List[FeatureImpact]
  recommendation: str
  disclaimer: str
  timestamp: datetime


class SaveEntryResponse(BaseModel):
  id: int
  message: str


class HistoryItem(BaseModel):
  id: int
  risk_level: str
  confidence_score: float
  top_factors: List[FeatureImpact]
  created_at: datetime

  class Config:
    from_attributes = True


class HistoryDetail(HistoryItem):
  daily_screen_time: float
  unlock_count: float
  avg_session_duration: float
  social_media_usage: float
  productivity_usage: float
  entertainment_usage: float
  late_night_usage: float
  typing_speed: float
  typing_pause_duration: float
  backspace_frequency: float
  movement_regularity: float
  sleep_quality: float
  stress_level: float
  fatigue_level: float
  mood_score: float
