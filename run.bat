@echo off

start "API Server" cmd /c "node backend/server.js"

timeout /t 5 /nobreak >nul

start "React App" cmd /c "npm start"