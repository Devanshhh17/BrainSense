# BrainSense Deployment Guide

## Frontend Deployment (Vercel)

The frontend is a Vite + React application that can be deployed directly to Vercel.

### Steps:
1. Push the repository to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Import the BrainSense project
4. Vercel will auto-detect the Vite configuration
5. Set the environment variable:
   - **VITE_API_BASE_URL**: Your backend API URL (e.g., `https://brainsense-backend.herokuapp.com`)
6. Click Deploy

The `vercel.json` configuration already handles the build process.

## Backend Deployment

The backend is a FastAPI application that requires Python. It **cannot** run on Vercel's free tier.

### Option 1: Deploy on Railway.app (Recommended)
1. Go to [railway.app](https://railway.app)
2. Create a new project from GitHub
3. Select the BrainSense repository
4. Railway will auto-detect the Python backend
5. Add environment variables:
   - **MONGODB_URI**: Your MongoDB Atlas connection string
6. Deploy

### Option 2: Deploy on Render.com
1. Go to [render.com](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set:
   - **Runtime**: Python 3.12
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `cd backend && uvicorn app.main:app --host 0.0.0.0 --port 8000`
5. Add environment variables (MongoDB URI if needed)
6. Deploy

### Option 3: Deploy on Heroku (with hobby dyno)
1. Install Heroku CLI
2. Create a Procfile in the backend directory:
   ```
   web: uvicorn app.main:app --host 0.0.0.0 --port $PORT
   ```
3. Push to Heroku
4. Set environment variables

## Environment Variables

### Frontend (.env for development, Vercel dashboard for production)
```
VITE_API_BASE_URL=http://127.0.0.1:8000  # Dev
VITE_API_BASE_URL=https://your-backend-url.com  # Production
```

### Backend (backend/.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=appname
```

## Local Development

```bash
# Terminal 1: Backend
cd backend
source venv/bin/activate  # or .venv\Scripts\Activate.ps1 on Windows
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

# Terminal 2: Frontend
npm run dev
```

Or run both together:
```bash
npm run dev:all
```

## Testing Deployment

After deployment, test the endpoints:
```bash
# Frontend: Visit https://your-frontend-url.com
# Backend: curl https://your-backend-url.com/
```
