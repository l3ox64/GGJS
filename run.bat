@echo off

npm install >nul 2>&1
start "React App" cmd /c "npm start"
timeout /t 1 /nobreak >nul
start "API Server" cmd /c "node ./backend/server.js"
