# Fix Submodule Error Script
# This script converts next-portfolio-game from a submodule to a regular directory

Write-Host "🔧 Fixing submodule issue for next-portfolio-game..." -ForegroundColor Cyan

# Check if we're in a git repository
if (-not (Test-Path ".git")) {
    Write-Host "❌ Error: Not in a Git repository!" -ForegroundColor Red
    Write-Host "Please run this script from the root of your Git repository." -ForegroundColor Yellow
    exit 1
}

# Check if next-portfolio-game exists
if (-not (Test-Path "next-portfolio-game")) {
    Write-Host "❌ Error: next-portfolio-game directory not found!" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Found next-portfolio-game directory" -ForegroundColor Green

# Step 1: Remove submodule reference from Git
Write-Host "`n📝 Step 1: Removing submodule reference from Git index..." -ForegroundColor Cyan
try {
    git rm --cached next-portfolio-game 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Removed submodule reference" -ForegroundColor Green
    } else {
        Write-Host "⚠ Submodule reference may not exist (this is okay)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠ Could not remove submodule reference (may not exist)" -ForegroundColor Yellow
}

# Step 2: Remove .git directory inside next-portfolio-game if it exists
Write-Host "`n📝 Step 2: Removing .git directory from next-portfolio-game..." -ForegroundColor Cyan
if (Test-Path "next-portfolio-game\.git") {
    Remove-Item -Recurse -Force "next-portfolio-game\.git" -ErrorAction SilentlyContinue
    Write-Host "✓ Removed .git directory" -ForegroundColor Green
} else {
    Write-Host "✓ No .git directory found (this is okay)" -ForegroundColor Green
}

# Step 3: Add next-portfolio-game as regular directory
Write-Host "`n📝 Step 3: Adding next-portfolio-game as regular directory..." -ForegroundColor Cyan
git add next-portfolio-game
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Added next-portfolio-game to Git" -ForegroundColor Green
} else {
    Write-Host "❌ Error adding next-portfolio-game" -ForegroundColor Red
    exit 1
}

# Step 4: Show status
Write-Host "`n📊 Git status:" -ForegroundColor Cyan
git status --short

Write-Host "`n✅ Done! Now you need to:" -ForegroundColor Green
Write-Host "  1. Review the changes: git status" -ForegroundColor Yellow
Write-Host "  2. Commit: git commit -m 'Convert next-portfolio-game from submodule to regular directory'" -ForegroundColor Yellow
Write-Host "  3. Push: git push" -ForegroundColor Yellow

