import os
from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from pymongo import MongoClient


BASE_DIR = Path(__file__).resolve().parents[1]
DB_PATH = BASE_DIR / "brainsense.db"
DATABASE_URL = f"sqlite:///{DB_PATH}"

MONGODB_URI = os.getenv("MONGODB_URI")
MONGODB_DB_NAME = os.getenv("MONGODB_DB_NAME", "brainsense")
MONGODB_COLLECTION = os.getenv("MONGODB_COLLECTION", "prediction_history")

mongo_client = None
history_collection = None

if MONGODB_URI:
  mongo_client = MongoClient(MONGODB_URI)
  mongo_db = mongo_client[MONGODB_DB_NAME]
  history_collection = mongo_db[MONGODB_COLLECTION]

# check_same_thread is required for SQLite with FastAPI.
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()


def is_mongodb_enabled() -> bool:
  return history_collection is not None


def get_history_collection():
  if history_collection is None:
    raise RuntimeError("MONGODB_URI is not configured. Set the MONGODB_URI environment variable.")
  return history_collection
