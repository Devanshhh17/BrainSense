import os
import sys

# Add the backend directory to sys.path so imports like `from app.database` work
backend_path = os.path.join(os.path.dirname(__file__), '..', 'backend')
sys.path.insert(0, backend_path)

from app.main import app
