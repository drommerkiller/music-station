@echo off
cd /d "%~dp0"
call venv\Scripts\activate.bat
echo Starting Backend Server...
python src/server.py
cmd /k
