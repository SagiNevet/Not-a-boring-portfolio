# Fix Submodule Error

## Problem
GitHub Actions is trying to fetch `next-portfolio-game` as a submodule, but there's no URL configured in `.gitmodules`.

## Solution 1: Disable Submodule Fetching (Already Done)
I've created `.github/workflows/build.yml` with `submodules: false` to prevent this error.

## Solution 2: Remove Submodule Reference (If needed)
If `next-portfolio-game` is NOT supposed to be a submodule, run these commands locally:

```bash
# Remove the submodule reference from Git
git rm --cached next-portfolio-game

# Remove the .git directory inside next-portfolio-game if it exists
rm -rf next-portfolio-game/.git

# Add next-portfolio-game as a regular directory
git add next-portfolio-game

# Commit the changes
git commit -m "Convert next-portfolio-game from submodule to regular directory"

# Push to remote
git push
```

## Solution 3: If it SHOULD be a submodule
If `next-portfolio-game` should be a submodule, create a `.gitmodules` file:

```ini
[submodule "next-portfolio-game"]
    path = next-portfolio-game
    url = https://github.com/your-username/next-portfolio-game.git
```

Replace `your-username/next-portfolio-game` with the actual repository URL.

