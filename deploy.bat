@echo off
echo 🚀 Quant-Elite Website Deployment Script
echo ========================================

set /p username="Enter your GitHub username: "
set repo_name=quant-elite-website

echo.
echo Setting up GitHub remote...
git remote add origin https://github.com/%username%/%repo_name%.git 2>nul || echo Remote already exists

echo.
echo Pushing to GitHub...
git branch -M main
git push -u origin main

echo.
echo ✅ Deployment complete!
echo.
echo Next steps:
echo 1. Go to https://github.com/%username%/%repo_name%/settings/pages
echo 2. Select "Deploy from a branch"
echo 3. Choose "main" branch and "/ (root)" folder
echo 4. Click "Save"
echo.
echo Your website will be live at: https://%username%.github.io/%repo_name%/
echo.
pause