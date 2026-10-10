@echo off
setlocal
cd /d "%~dp0"

echo ===================================================
echo        TARGET PRO DIGITAL PLATFORM
echo                 STARTUP
echo ===================================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    if exist "..\nodejs\node.exe" (
        set "PATH=%~dp0..\nodejs;%PATH%"
    ) else if exist "d:\SCRIPTS\nodejs\node.exe" (
        set "PATH=d:\SCRIPTS\nodejs;%PATH%"
    ) else if exist "%ProgramFiles%\nodejs\node.exe" (
        set "PATH=%ProgramFiles%\nodejs;%PATH%"
    ) else (
        echo [ERROR] Node.js not found. Please install Node.js from https://nodejs.org/
        pause
        exit /b 1
    )
)

echo [*] Stopping any existing instances on port 3000...
taskkill /F /IM node.exe >nul 2>nul

if not exist "dev.db" (
    echo [*] Database not found. Initializing...
    call npx prisma generate
    call npx prisma db push
    call node prisma/seed.js
)

if not exist ".next" (
    echo [*] Production build not found. Building now...
    call npx prisma generate
    call npm run build
)

echo.
echo [*] Platform starting on http://localhost:3000
echo [*] Admin Panel: http://localhost:3000/admin/login
echo [*] Press Ctrl+C to stop the server.
echo.

start "" "http://localhost:3000"

call npm run start -- -p 3000
pause
