@echo off
npm list express mongoose body-parser bcrypt express-rate-limit helmet cors >nul 2>&1
if %errorlevel% neq 0 (
    npm install express mongoose body-parser bcrypt express-rate-limit helmet cors
)
npm install >nul 2>&1
start "React App" cmd /c "npm start"
timeout /t 1 /nobreak >nul
start "API Server" cmd /c "node backend/server.js"
