from pathlib import Path
from app.services.trainer import train_and_save_models


if __name__ == "__main__":
  backend_root = Path(__file__).resolve().parent
  result = train_and_save_models(backend_root)
  print("Training complete.")
  print(f"Best model: {result['best_model']}")
