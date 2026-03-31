from pathlib import Path
from app.utils.synthetic_data import generate_synthetic_dataset


if __name__ == "__main__":
  backend_root = Path(__file__).resolve().parent
  out_path = backend_root / "data" / "synthetic_dataset.csv"
  df = generate_synthetic_dataset(out_path, n_rows=1200)
  print(f"Dataset created at: {out_path}")
  print(f"Rows generated: {len(df)}")
