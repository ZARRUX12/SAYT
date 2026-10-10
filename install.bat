@echo off
setlocal
cd /d "%~dp0"

echo ===================================================
echo        TARGET PRO DIGITAL PLATFORM
echo               INSTALLATION
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

echo [*] Freeing active locks on database and binaries...
taskkill /F /IM node.exe >nul 2>nul

echo [1/4] Checking Node.js and npm...
node -v
call npm -v
echo.

echo [2/4] Installing dependencies (npm install)...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] npm install failed.
    pause
    exit /b %errorlevel%
)
echo.

echo [3/4] Setting up database and Prisma...
taskkill /F /IM node.exe >nul 2>nul
call npx prisma generate
call npx prisma db push
call node prisma/seed.js
echo.

echo [4/4] Building production project (npm run build)...
taskkill /F /IM node.exe >nul 2>nul
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Build failed.
    pause
    exit /b %errorlevel%
)

echo.
echo ===================================================
echo [SUCCESS] TARGET PRO installation completed!
echo You can now launch the platform with start.bat
echo ===================================================
echo.
pause
