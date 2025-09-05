@echo off
echo ========================================
echo   CareerSathi - Clean Installation
echo ========================================
echo.

echo Step 1: Cleaning previous installation...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
if exist .next rmdir /s /q .next

echo.
echo Step 2: Installing dependencies...
npm install

echo.
echo Step 3: Setting up database...
npx prisma generate
npx prisma db push

echo.
echo ========================================
echo   Installation Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Add your OAuth credentials to .env.local
echo 2. Run: npm run dev
echo 3. Visit: http://localhost:3000
echo.
echo See OAUTH_KEYS_SETUP.md for OAuth setup guide.
echo.
pause