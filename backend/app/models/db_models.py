from datetime import datetime
from sqlalchemy import Column, DateTime, Float, Integer, String, Text
from app.database import Base


class PredictionHistory(Base):
  __tablename__ = "prediction_history"

  id = Column(Integer, primary_key=True, index=True)
  daily_screen_time = Column(Float, nullable=False)
  unlock_count = Column(Float, nullable=False)
  avg_session_duration = Column(Float, nullable=False)
  social_media_usage = Column(Float, nullable=False)
  productivity_usage = Column(Float, nullable=False)
  entertainment_usage = Column(Float, nullable=False)
  late_night_usage = Column(Float, nullable=False)
  typing_speed = Column(Float, nullable=False)
  typing_pause_duration = Column(Float, nullable=False)
  backspace_frequency = Column(Float, nullable=False)
  movement_regularity = Column(Float, nullable=False)
  sleep_quality = Column(Float, nullable=False)
  stress_level = Column(Float, nullable=False)
  fatigue_level = Column(Float, nullable=False)
  mood_score = Column(Float, nullable=False)
  risk_level = Column(String(20), nullable=False)
  confidence_score = Column(Float, nullable=False)
  top_factors = Column(Text, nullable=False)
  created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
