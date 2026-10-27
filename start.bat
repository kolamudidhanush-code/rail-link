@echo off
cd /d "%~dp0"
if not exist node_modules (
  echo Installing project dependencies for the first run...
  call npm install
  if errorlevel 1 (
    echo.
    echo Dependency installation failed. Check your internet connection and Node.js installation.
    pause
    exit /b 1
  )
)
echo Starting Rail Link in development mode...
call npm run dev
pause
