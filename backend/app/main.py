from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.dependencies import predictor_service
import app.dependencies as dependencies
from app.routes import history, predict, training
from app.services.predictor import BrainSensePredictor


app = FastAPI(
  title="BrainSense Backend API",
  description="Minimal-Data Cognitive Risk Predictor (Research Awareness API)",
  version="1.0.0",
)

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)


@app.on_event("startup")
def startup_event():
  Base.metadata.create_all(bind=engine)
  backend_root = Path(__file__).resolve().parents[1]
  dependencies.predictor_service = BrainSensePredictor(base_dir=backend_root)


@app.get("/")
def health():
  return {"message": "BrainSense backend is running.", "status": "ok"}


app.include_router(predict.router)
app.include_router(history.router)
app.include_router(training.router)
