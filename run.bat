@echo off

start "React App" cmd /c "npm start"
timeout /t 1 /nobreak >nul
start "API Server" cmd /c "node ./backend/server.js"
