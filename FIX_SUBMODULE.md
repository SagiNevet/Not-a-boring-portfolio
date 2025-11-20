# Fix Submodule Error - IMPORTANT!

## Problem
`next-portfolio-game` is registered as a Git submodule, but has no URL configured. This causes GitHub Actions to fail because the directory is not checked out.

## ⚠️ REQUIRED FIX - Run These Commands Locally

You MUST run these commands in your local Git repository to fix the issue:

```bash
# 1. Remove the submodule reference from Git index
git rm --cached next-portfolio-game

# 2. Remove the .git directory inside next-portfolio-game if it exists
# On Windows (PowerShell):
Remove-Item -Recurse -Force next-portfolio-game\.git -ErrorAction SilentlyContinue

# On Linux/Mac:
# rm -rf next-portfolio-game/.git

# 3. Add next-portfolio-game as a regular directory (not submodule)
git add next-portfolio-game

# 4. Commit the changes
git commit -m "Convert next-portfolio-game from submodule to regular directory"

# 5. Push to remote
git push
```

## After Running These Commands
After you push these changes, GitHub Actions should work correctly because `next-portfolio-game` will be treated as a regular directory instead of a submodule.

## Solution 3: If it SHOULD be a submodule
If `next-portfolio-game` should be a submodule, create a `.gitmodules` file:

```ini
[submodule "next-portfolio-game"]
    path = next-portfolio-game
    url = https://github.com/your-username/next-portfolio-game.git
```

Replace `your-username/next-portfolio-game` with the actual repository URL.

