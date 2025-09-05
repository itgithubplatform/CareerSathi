@echo off
echo Installing CareerSathi OAuth Authentication...
echo.

echo Installing npm packages...
npm install

echo.
echo Generating Prisma client...
npx prisma generate

echo.
echo Setting up database...
npx prisma db push

echo.
echo OAuth Setup complete! 
echo.
echo Next steps:
echo 1. Update .env.local with your OAuth credentials
echo 2. Set up Google OAuth in Google Cloud Console
echo 3. Set up LinkedIn OAuth in LinkedIn Developer Portal
echo 4. Run 'npm run dev' to start development server
echo.
echo See OAUTH_SETUP.md for detailed configuration instructions.
pause