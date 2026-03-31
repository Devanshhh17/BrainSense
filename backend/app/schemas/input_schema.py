from pydantic import BaseModel, Field


class PredictionInput(BaseModel):
  daily_screen_time: float = Field(..., ge=0, le=24)
  unlock_count: float = Field(..., ge=0, le=500)
  avg_session_duration: float = Field(..., ge=0, le=120)
  social_media_usage: float = Field(..., ge=0, le=24)
  productivity_usage: float = Field(..., ge=0, le=24)
  entertainment_usage: float = Field(..., ge=0, le=24)
  late_night_usage: float = Field(..., ge=0, le=100)
  typing_speed: float = Field(..., ge=0, le=200)
  typing_pause_duration: float = Field(..., ge=0, le=20)
  backspace_frequency: float = Field(..., ge=0, le=100)
  movement_regularity: float = Field(..., ge=0, le=100)
  sleep_quality: float = Field(..., ge=0, le=100)
  stress_level: float = Field(..., ge=0, le=100)
  fatigue_level: float = Field(..., ge=0, le=100)
  mood_score: float = Field(..., ge=0, le=100)
