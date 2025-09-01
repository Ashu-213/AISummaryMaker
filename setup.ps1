# AI Summary Maker - Setup Script
# Run this script to set up the entire project

Write-Host "🚀 AI Summary Maker - Setup Script" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan

# Check Python
Write-Host "`n📍 Checking Python..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✅ Found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Python not found. Please install Python 3.8+ first." -ForegroundColor Red
    exit 1
}

# Check Node.js
Write-Host "`n📍 Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>&1
    Write-Host "✅ Found: Node.js $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js 16+ first." -ForegroundColor Red
    exit 1
}

# Setup Backend
Write-Host "`n🐍 Setting up Python Backend..." -ForegroundColor Yellow
Set-Location "backend"

Write-Host "Installing Python packages..." -ForegroundColor Cyan
pip install -r requirements.txt

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Backend dependencies installed!" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install backend dependencies" -ForegroundColor Red
    exit 1
}

Set-Location ".."

# Setup Frontend
Write-Host "`n⚛️ Setting up React Frontend..." -ForegroundColor Yellow
Set-Location "frontend"

Write-Host "Installing Node.js packages..." -ForegroundColor Cyan
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend dependencies installed!" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
    exit 1
}

Set-Location ".."

Write-Host "`n🎉 Setup Complete!" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Cyan
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Start Backend:  .\start-backend.ps1" -ForegroundColor White
Write-Host "2. Start Frontend: .\start-frontend.ps1" -ForegroundColor White
Write-Host "3. Open: http://localhost:3000" -ForegroundColor White
