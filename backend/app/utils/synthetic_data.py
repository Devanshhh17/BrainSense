from pathlib import Path
import numpy as np
import pandas as pd
from app.utils.helpers import FEATURE_COLUMNS


def _compute_risk_score(row: pd.Series) -> float:
  # Weighted formula for educational synthetic labeling.
  score = 0.0
  score += row["stress_level"] * 0.24
  score += row["fatigue_level"] * 0.18
  score += row["late_night_usage"] * 0.18
  score += row["social_media_usage"] * 2.0
  score += (100 - row["sleep_quality"]) * 0.2
  score += (100 - row["mood_score"]) * 0.14
  score += row["daily_screen_time"] * 2.2
  return score


def generate_synthetic_dataset(output_path: Path, n_rows: int = 1200, seed: int = 42) -> pd.DataFrame:
  rng = np.random.default_rng(seed)

  df = pd.DataFrame(
    {
      "daily_screen_time": rng.uniform(1.5, 12.0, n_rows),
      "unlock_count": rng.integers(15, 210, n_rows),
      "avg_session_duration": rng.uniform(0.8, 16.0, n_rows),
      "social_media_usage": rng.uniform(0.1, 8.0, n_rows),
      "productivity_usage": rng.uniform(0.2, 8.0, n_rows),
      "entertainment_usage": rng.uniform(0.1, 8.5, n_rows),
      "late_night_usage": rng.uniform(0, 100, n_rows),
      "typing_speed": rng.uniform(15, 95, n_rows),
      "typing_pause_duration": rng.uniform(0.1, 7.0, n_rows),
      "backspace_frequency": rng.uniform(2, 45, n_rows),
      "movement_regularity": rng.uniform(10, 98, n_rows),
      "sleep_quality": rng.uniform(15, 98, n_rows),
      "stress_level": rng.uniform(5, 98, n_rows),
      "fatigue_level": rng.uniform(3, 97, n_rows),
      "mood_score": rng.uniform(5, 98, n_rows),
    }
  )

  # Add correlated behaviors for realistic patterns.
  df["social_media_usage"] = np.clip(
    df["social_media_usage"] + (df["late_night_usage"] / 100) * 1.4, 0, 10
  )
  df["sleep_quality"] = np.clip(
    df["sleep_quality"] - (df["late_night_usage"] / 100) * 16, 0, 100
  )
  df["mood_score"] = np.clip(df["mood_score"] - (df["stress_level"] / 100) * 18, 0, 100)

  scores = df.apply(_compute_risk_score, axis=1)
  low_q = scores.quantile(0.33)
  high_q = scores.quantile(0.66)

  def map_score(score: float) -> int:
    if score < low_q:
      return 0
    if score < high_q:
      return 1
    return 2

  df["risk_class"] = scores.map(map_score)
  output_path.parent.mkdir(parents=True, exist_ok=True)
  df.to_csv(output_path, index=False)
  return df


if __name__ == "__main__":
  backend_root = Path(__file__).resolve().parents[2]
  dataset_path = backend_root / "data" / "synthetic_dataset.csv"
  created = generate_synthetic_dataset(dataset_path, n_rows=1200)
  print(f"Synthetic dataset generated at: {dataset_path}")
  print(f"Rows: {len(created)} | Features: {len(FEATURE_COLUMNS)}")
