@echo off
cd /d "%~dp0"
echo Starting HeartLib Web App...
echo 1. Launching Backend (FastAPI)...
start "HeartLib Backend" cmd /k "call venv\Scripts\activate.bat && python src/server.py"

echo 2. Launching Frontend (Vite)...
cd web
start "HeartLib Frontend" cmd /k "npm run dev"

echo Done! Access the app at http://localhost:5173
pause
