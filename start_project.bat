@echo off
echo -------------------------------------
echo Activating Python 3.10 Virtual Env
echo -------------------------------------
cd /d %~dp0
call venv310\Scripts\activate.bat

echo Python Version:
python --version

echo.
echo [READY] Your Python virtual environment is active.
echo.

:: Check if required Python packages are installed
echo Checking for required Python packages...
pip list | findstr "fastapi uvicorn apscheduler" >nul
if %errorlevel% neq 0 (
    echo Installing missing Python dependencies...
    pip install fastapi uvicorn apscheduler
)

call .venv\Scripts\activate
echo.
echo -------------------------------------
echo Starting FastAPI Backend Server
echo -------------------------------------
echo You can access the FastAPI app at http://127.0.0.1:8000
echo The API documentation will be available at http://127.0.0.1:8000/docs
echo.
echo Press Ctrl+C to stop the server.
echo.
uvicorn main:app --reload
if %errorlevel% neq 0 (
    echo Failed to start FastAPI server. Please check your setup.
    goto end
)

:end
echo.
echo -------------------------------------
echo Starting React Frontend Development Server
echo -------------------------------------
echo Changing directory to the React frontend folder...
cd frontend

:: Check if Node.js and npm are installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install Node.js from https://nodejs.org/
    goto end_frontend
)

where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo npm is not installed. Please install Node.js from https://nodejs.org/
    goto end_frontend
)

:: Install React dependencies if package.json exists
if exist package.json (
    echo Installing React dependencies...
    call npm install
)

echo.
echo Starting React development server...
echo You can access the React app at http://localhost:3000
echo Press Ctrl+C to stop the server.
echo.
call npm start

:end_frontend
echo.
echo -------------------------------------
echo Project Setup Complete
echo -------------------------------------
echo To restart the servers, rerun this script.
cmd /K