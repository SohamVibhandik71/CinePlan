# Contributing to CinePlan 🎬

Thank you for contributing to **CinePlan — Personal Entertainment Planner**.

This document defines the Git and GitHub workflow that all collaborators must follow during development. The goal is to keep the repository clean, reduce merge conflicts, and make collaboration fast and predictable during the 24-hour hackathon.

---

# 1. Branch Strategy

CinePlan uses a **Git Flow-inspired development workflow**:

```text
main
  │
  └── develop
        │
        ├── feature/auth
        ├── feature/tmdb-search
        ├── feature/library
        ├── feature/episode-tracking
        ├── feature/planner
        └── feature/recommendations
```

## Branch Responsibilities

### `main`

- Production/stable branch.
- Must always contain working code.
- No direct pushes.
- Changes enter `main` through Pull Requests from `develop`.
- Only merge tested and stable features.

### `develop`

- Main integration/development branch.
- All feature branches are created from `develop`.
- Feature Pull Requests target `develop`.
- This branch contains the latest integrated development work.
- Do not directly push to `develop`.

### Feature branches

All development work must happen in a feature/fix branch created from `develop`.

Examples:

```text
feature/auth
feature/tmdb-search
feature/content-details
feature/library
feature/episode-tracking
feature/planner
feature/recommendations
feature/dashboard
```

Bug fixes:

```text
fix/login-error
fix/library-duplicate
fix/api-error
```

UI-specific work:

```text
ui/navbar
ui/dashboard
ui/movie-card
```

---

# 2. First-Time Setup

Clone the repository:

```bash
git clone <repository-url>
```

Enter the project:

```bash
cd CinePlan
```

Check the available branches:

```bash
git branch -a
```

Switch to `develop`:

```bash
git switch develop
```

Pull the latest changes:

```bash
git pull origin develop
```

Install dependencies:

```bash
cd client
npm install

cd ../server
npm install
```

Create your local environment file:

```text
server/.env
```

Never commit `.env`.

Use `.env.example` to document required environment variables.

---

# 3. Before Starting Any Task

Always start from the latest `develop` branch.

```bash
git switch develop
git pull origin develop
```

Then create a new branch:

```bash
git switch -c feature/<feature-name>
```

Example:

```bash
git switch -c feature/library
```

Do not create a feature branch from another feature branch unless explicitly agreed by the team.

Correct:

```text
develop
   ↓
feature/library
```

Avoid:

```text
develop
   ↓
feature/auth
   ↓
feature/library
```

---

# 4. Branch Naming Convention

Use lowercase names with hyphens.

## Features

```text
feature/auth
feature/tmdb-search
feature/content-details
feature/library
feature/episode-tracking
feature/planner
feature/recommendations
```

## Bug Fixes

```text
fix/login-validation
fix/api-error
fix/library-duplicate
fix/progress-calculation
```

## UI Changes

```text
ui/navbar
ui/dashboard
ui/movie-card
ui/responsive-layout
```

## Refactoring

```text
refactor/api-service
refactor/database-models
```

Avoid branch names such as:

```text
mybranch
test
new
changes
final
final2
soham-branch
abc
```

---

# 5. Development Workflow

Every collaborator should follow this workflow:

```text
1. Update develop
        ↓
2. Create feature branch
        ↓
3. Develop feature
        ↓
4. Test locally
        ↓
5. Commit changes
        ↓
6. Push branch
        ↓
7. Create Pull Request
        ↓
8. Code review
        ↓
9. Fix review comments if needed
        ↓
10. Merge into develop
        ↓
11. Delete feature branch
```

---

# 6. Keeping Your Branch Updated

While you are working, other teammates may merge changes into `develop`.

Before creating a PR, update your branch.

```bash
git fetch origin
git merge origin/develop
```

If there are no conflicts:

```bash
git push
```

If there are conflicts, resolve them locally before opening/updating the PR.

### Recommended for the hackathon

Use `merge` instead of `rebase` unless the entire team is comfortable with rebase.

---

# 7. Making Commits

Make small, meaningful commits.

Good:

```bash
git add .
git commit -m "feat: add library API"
```

```bash
git commit -m "feat: add library filtering"
```

```bash
git commit -m "fix: prevent duplicate library items"
```

Avoid:

```text
update
changes
final
done
test
new code
asdf
```

---

# 8. Commit Message Convention

Use:

```text
<type>: <short description>
```

## Feature

```text
feat: add user authentication
feat: add TMDB search
feat: add watchlist functionality
```

## Bug Fix

```text
fix: handle invalid login credentials
fix: prevent duplicate watchlist items
```

## UI

```text
style: improve movie card layout
style: make dashboard responsive
```

## Refactoring

```text
refactor: simplify TMDB service
refactor: restructure library controller
```

## Documentation

```text
docs: update contributing guide
docs: add API documentation
```

## Chores

```text
chore: configure eslint
chore: update dependencies
```

---

# 9. Pull Requests

When your feature is ready:

```bash
git push -u origin feature/library
```

Open GitHub and create a Pull Request.

The PR should follow:

```text
feature/<name> → develop
```

Never:

```text
feature/<name> → main
```

unless the team lead explicitly asks for it.

---

# 10. Pull Request Title

Use the same convention as commits.

Examples:

```text
feat: add library functionality
feat: implement TMDB search
feat: add episode tracking
fix: resolve duplicate watchlist issue
style: improve dashboard UI
```

---

# 11. Pull Request Description

Use this structure:

```markdown
## What does this PR do?

Briefly explain what was implemented.

## Changes

- Added library API
- Added library model
- Added add/remove functionality
- Added library page

## Testing

- Tested adding content
- Tested removing content
- Tested duplicate prevention
- Tested authentication

## Screenshots

Add screenshots for UI changes.

## Related Issue

Closes #10
```

---

# 12. Code Review Rules

Before merging, at least **one teammate should review the PR**.

Reviewers should check:

- Does the feature work?
- Is the code readable?
- Are API endpoints correct?
- Are authentication checks present?
- Is user data protected?
- Are errors handled?
- Does the code follow the project structure?
- Does it introduce unnecessary dependencies?
- Does it break existing functionality?

Do not approve code that has obvious runtime errors.

---

# 13. Merge Rules

### Feature → develop

Normal development flow:

```text
feature/library
       ↓
Pull Request
       ↓
Review
       ↓
develop
```

### develop → main

Only merge `develop` into `main` when:

- Core features work.
- Major bugs are fixed.
- The application builds successfully.
- The demo flow has been tested.
- The team agrees that the current version is stable.

```text
develop
   ↓
Pull Request
   ↓
Review
   ↓
main
```

---

# 14. Never Directly Push to Protected Branches

Do not use:

```bash
git push origin main
```

or:

```bash
git push origin develop
```

for normal feature development.

Use Pull Requests instead.

Recommended GitHub branch protection:

```text
main
 ├── Require pull request
 ├── Require review
 └── Disable direct pushes

develop
 ├── Require pull request
 └── Disable direct pushes
```

---

# 15. Handling Merge Conflicts

If `develop` changed while you were working:

```bash
git fetch origin
git merge origin/develop
```

If Git reports a conflict:

```text
<<<<<<< HEAD
Your changes
=======
Changes from develop
>>>>>>> origin/develop
```

Open the file and decide which code should remain.

Remove:

```text
<<<<<<<
=======
>>>>>>>
```

Then:

```bash
git add .
git commit -m "fix: resolve merge conflict"
```

Push:

```bash
git push
```

---

# 16. Avoiding Merge Conflicts

### Do not modify shared files unnecessarily.

For example, avoid having several people simultaneously editing:

```text
App.jsx
server.js
Navbar.jsx
```

Prefer modular files:

```text
pages/
├── Login.jsx
├── Discover.jsx
├── Library.jsx
└── Planner.jsx
```

Backend:

```text
controllers/
├── authController.js
├── contentController.js
├── libraryController.js
└── scheduleController.js
```

This makes parallel development much easier.

---

# 17. Frontend API Convention

Keep API calls in the service layer.

Recommended:

```text
client/src/services/
├── api.js
├── authApi.js
├── contentApi.js
├── libraryApi.js
├── progressApi.js
├── scheduleApi.js
└── recommendationApi.js
```

Avoid scattering raw Axios calls throughout components.

Prefer:

```javascript
import { getLibrary } from "../services/libraryApi";
```

instead of:

```javascript
axios.get("/api/library");
```

inside every component.

---

# 18. Backend Structure

Use a consistent structure:

```text
server/
├── controllers/
├── models/
├── routes/
├── middleware/
├── services/
├── utils/
├── config/
└── server.js
```

Recommended responsibility:

```text
routes
   ↓
controllers
   ↓
services
   ↓
models/database
```

External API calls should live inside services.

Example:

```text
services/
└── tmdbService.js
```

---

# 19. Environment Variables & Secrets

Never commit:

```text
.env
API keys
JWT secrets
Database passwords
Cloudinary secrets
```

Use:

```text
.env.example
```

Example:

```env
PORT=
MONGO_URI=
JWT_SECRET=
TMDB_API_KEY=
YOUTUBE_API_KEY=
```

The actual values must remain local.

---

# 20. Testing Before Opening a PR

Before creating a PR:

### Frontend

```bash
npm run build
```

Check:

- Pages load.
- No console errors.
- Responsive layout works.
- Loading states work.
- Error states work.

### Backend

Test:

- API endpoints
- Authentication
- Invalid requests
- Unauthorized requests
- Database operations
- External API failures

At minimum, manually test the complete feature.

---

# 21. Do Not Break Existing Features

Before merging:

```bash
git switch develop
git pull origin develop
```

Then update your feature branch:

```bash
git switch feature/<your-feature>
git merge origin/develop
```

Run the application again.

Test your feature **and** the major existing flows.

---

# 22. Dependency Rules

Before installing a new package, ask:

> Do we actually need this package?

For a 24-hour hackathon, avoid unnecessary dependencies.

If you add one:

```bash
npm install package-name
```

Commit the corresponding:

```text
package.json
package-lock.json
```

Do not manually edit dependency versions unless necessary.

---

# 23. Cloudinary

Cloudinary is optional.

Do not add it just because it is part of the technology discussion.

Use it only if the application requires:

- User profile uploads
- Custom images
- Uploaded media

For external movie/TV posters and YouTube thumbnails, use the API-provided image URLs where permitted.

---

# 24. Git Commands Cheat Sheet

## Get latest develop

```bash
git switch develop
git pull origin develop
```

## Create feature branch

```bash
git switch -c feature/library
```

## Check status

```bash
git status
```

## View branches

```bash
git branch
```

## Stage changes

```bash
git add .
```

## Commit

```bash
git commit -m "feat: add library functionality"
```

## Push first time

```bash
git push -u origin feature/library
```

## Push later

```bash
git push
```

## Update branch with develop

```bash
git fetch origin
git merge origin/develop
```

## Switch branches

```bash
git switch develop
```

## Delete local feature branch

```bash
git branch -d feature/library
```

## Delete remote feature branch

```bash
git push origin --delete feature/library
```

---

# 25. Complete Example

Suppose you are implementing the library.

### Step 1

```bash
git switch develop
git pull origin develop
```

### Step 2

```bash
git switch -c feature/library
```

### Step 3

Develop:

```text
Library model
Library controller
Library routes
Library page
Add/remove functionality
```

### Step 4

Test everything.

### Step 5

```bash
git add .
git commit -m "feat: add library functionality"
```

### Step 6

```bash
git push -u origin feature/library
```

### Step 7

Create:

```text
feature/library → develop
```

Pull Request.

### Step 8

Teammate reviews.

### Step 9

Merge PR.

### Step 10

Clean up:

```bash
git switch develop
git pull origin develop
git branch -d feature/library
```

---

# 26. Emergency Hackathon Rule

During the 24-hour hackathon, **working software is more important than perfect Git history**.

If a merge conflict becomes complicated:

1. Stop.
2. Do not randomly delete code.
3. Communicate with the person who wrote the conflicting code.
4. Resolve the conflict together.
5. Run the application.
6. Test before merging.

Never use:

```bash
git reset --hard
```

unless you understand exactly what will be deleted.

Never use:

```bash
git push --force
```

on `main` or `develop`.

---

# 27. Team Communication

Before starting a feature, announce it in your team chat:

```text
I'm working on:
feature/library

Files/modules:
- LibraryItem model
- Library API
- Library page

Expected completion:
~2 hours
```

When finished:

```text
feature/library is ready.

PR:
#12

Please review.
```

If you need to modify a shared file:

```text
I'll be modifying App.jsx for routing.
Please avoid editing it until my PR is merged.
```

This simple communication can prevent many conflicts.

---

# 28. Recommended GitHub Repository Settings

Repository:

```text
CinePlan
```

Branches:

```text
main
develop
```

Recommended:

### Protect `main`

```text
✓ Pull request required
✓ At least 1 reviewer
✓ No direct push
```

### Protect `develop`

```text
✓ Pull request required
✓ At least 1 reviewer
✓ No direct push
```

### Enable

```text
Issues
Pull Requests
Projects / Kanban
```

---

# 29. Issue Workflow

Create GitHub Issues for features.

Example:

```text
#1 Setup authentication
#2 Integrate TMDB
#3 Build search page
#4 Build content details
#5 Build library
#6 Build episode tracking
#7 Build planner
#8 Build recommendations
#9 Build dashboard
```

Assign each issue to one person.

Branch from the issue:

```text
feature/library
```

PR:

```text
feat: add library functionality
```

PR description:

```text
Closes #5
```

Once merged, GitHub automatically closes the issue.

---

# 30. Golden Rules

Every collaborator should remember these:

```text
1. ❌ Never directly push to main.

2. ❌ Never directly push to develop.

3. ✅ Always branch from develop.

4. ✅ Keep branches focused on one feature/fix.

5. ✅ Pull the latest develop before starting.

6. ✅ Commit meaningful changes.

7. ✅ Push your branch regularly.

8. ✅ Create a PR into develop.

9. ✅ Get at least one review.

10. ✅ Test before merging.

11. ❌ Never commit .env or API keys.

12. ❌ Don't use force push on shared branches.

13. ✅ Communicate before modifying shared files.

14. ✅ Delete feature branches after merging.

15. ✅ Keep develop working.
```

---

# 31. Final Workflow

The entire team should follow this:

```text
                    GitHub

                      main
                       ▲
                       │
                  PR / Release
                       │
                    develop
                       ▲
                       │
                    PR / Review
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
 feature/auth   feature/library   feature/planner
        │              │              │
        ▼              ▼              ▼
      Code           Code           Code
        │              │              │
        └──────────────┼──────────────┘
                       │
                    Review
                       │
                       ▼
                    develop
                       │
                  Integration
                       │
                       ▼
                     main
```

## The One-Line Rule

> **`main` = stable, `develop` = integrated development, `feature/*` = individual work.**

Follow this consistently and your team can work in parallel without turning the repository into a merge-conflict disaster.
