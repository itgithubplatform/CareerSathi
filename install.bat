@echo off
echo Installing CareerSathi Dependencies...
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
echo Setup complete! 
echo.
echo Next steps:
echo 1. Update .env.local with your actual credentials
echo 2. Set up Firebase project and OAuth providers
echo 3. Run 'npm run dev' to start development server
echo.
echo See SETUP.md for detailed configuration instructions.
pause