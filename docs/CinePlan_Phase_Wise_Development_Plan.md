# CinePlan — Phase-Wise Development Plan

## Project Context

**Product:** CinePlan — Personal Entertainment Planner  
**Type:** Web Application  
**Stack:** MERN + Tailwind CSS + Free External APIs  
**Development Time:** 24-hour hackathon  

### Core Product Loop

```text
Discover
   ↓
Save
   ↓
Prioritize
   ↓
Schedule
   ↓
Watch
   ↓
Track Progress
   ↓
Complete
   ↓
Rate
   ↓
Get Better Suggestions
```

---

# Phase 0 — Project Setup

### Goal

Get the MERN application running before building any feature.

### Frontend

```text
React + Vite
Tailwind CSS
React Router
Axios
```

Suggested structure:

```text
client/
├── src/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── hooks/
│   ├── services/
│   ├── context/
│   ├── utils/
│   └── App.jsx
```

### Backend

```text
Node.js
Express.js
MongoDB
Mongoose
dotenv
cors
```

Structure:

```text
server/
├── controllers/
├── models/
├── routes/
├── middleware/
├── services/
├── utils/
└── server.js
```

### Environment Variables

```text
.env

PORT=
MONGO_URI=
JWT_SECRET=
TMDB_API_KEY=
YOUTUBE_API_KEY=
```

### Deliverable

```text
Frontend → http://localhost:5173
Backend  → http://localhost:5000
MongoDB  → Connected
```

### Target

**30–45 minutes**

---

# Phase 1 — Authentication

### Goal

Create users and protect personal data.

### Backend

Create a `User` model:

```javascript
{
    name,
    email,
    passwordHash,
    preferences,
    createdAt
}
```

### Endpoints

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
```

Implement:

```text
bcrypt
JWT
Auth middleware
```

### Frontend

Create:

```text
/login
/register
```

And:

```text
AuthContext
ProtectedRoute
```

### Deliverable

```text
Register
   ↓
Login
   ↓
Dashboard
```

Unauthenticated users cannot access the dashboard.

### Target

**1.5 hours**

---

# Phase 2 — Content Discovery

This is one of the most important phases.

### Goal

Allow users to find entertainment.

## Step 2.1 — Integrate TMDB

Create:

```text
services/
    tmdbService.js
```

Use:

```text
React
   ↓
Express
   ↓
TMDB
```

Do not expose API keys directly in React.

## Step 2.2 — Search

Endpoint:

```text
GET /api/content/search?query=interstellar
```

Display:

```text
Search Results

┌────────┐ ┌────────┐ ┌────────┐
│ Poster │ │ Poster │ │ Poster │
│        │ │        │ │        │
│ Movie  │ │ Movie  │ │ Series │
└────────┘ └────────┘ └────────┘
```

## Step 2.3 — Content Details

Create:

```text
/content/:type/:id
```

Display:

- Poster
- Title
- Overview
- Rating
- Genres
- Runtime
- Release date
- Seasons
- Episodes

Include:

```text
[ + Add to Library ]
```

## Step 2.4 — Streaming Availability

Fetch provider information where available.

Display:

```text
Where to Watch

Netflix
Prime Video
Disney+
```

### Deliverable

```text
Search
  ↓
See results
  ↓
Open content
  ↓
View details
  ↓
See streaming availability
```

### Target

**2.5–3 hours**

---

# Phase 3 — Personal Library

### Goal

Users can save content.

Create a `LibraryItem` model:

```javascript
{
    userId,
    externalId,
    title,
    type,
    poster,
    genres,
    runtime,
    status,
    priority,
    progress,
    addedAt
}
```

### Status

```text
PLANNED
WATCHING
COMPLETED
DROPPED
```

### Priority

```text
HIGH
MEDIUM
LOW
```

### Endpoints

```text
GET    /api/library
POST   /api/library
PATCH  /api/library/:id
DELETE /api/library/:id
```

### Frontend

Create:

```text
/library
```

Filters:

```text
All
Movies
Series
Anime
YouTube

Status
Priority
Genre
```

### Deliverable

```text
Search
 ↓
Add to Library
 ↓
My Library
 ↓
Change status
 ↓
Change priority
 ↓
Remove
```

### Target

**2 hours**

---

# Phase 4 — Watch Progress

This phase makes CinePlan more than a normal watchlist.

## Movies

Simple status flow:

```text
Planned
 ↓
Watching
 ↓
Completed
```

## Series / Anime

Track:

```text
Season
Episode
Watched
```

Example:

```text
One Piece

Episodes

☑ 1091
☑ 1092
☑ 1093
☐ 1094
☐ 1095
```

Create:

```text
EpisodeProgress
```

Schema:

```javascript
{
    userId,
    contentId,
    seasonNumber,
    episodeNumber,
    watched,
    watchedAt
}
```

## Automatic Progress

Example:

```text
Watched: 45
Total: 100

Progress = 45%
```

UI:

```text
One Piece

█████████░░░░░░ 45%

45 / 100 Episodes
```

## Continue Watching

Dashboard should show:

```text
Continue Watching

Breaking Bad
S03 E08

[ Continue ]
```

### Deliverable

```text
Open series
 ↓
Select episode
 ↓
Mark watched
 ↓
Progress updates
 ↓
Next episode
```

### Target

**2 hours**

---

# Phase 5 — Entertainment Planner

### Goal

Users can decide when they'll watch something.

Create a `Schedule` model:

```javascript
{
    userId,
    contentId,
    episodeId,
    scheduledDate,
    startTime,
    duration,
    reminder
}
```

### Endpoints

```text
GET    /api/schedule
POST   /api/schedule
PATCH  /api/schedule/:id
DELETE /api/schedule/:id
```

### Frontend

Create:

```text
/planner
```

Start simple. Do not over-engineer the calendar.

### Daily View

```text
TODAY

08:00 PM
🎬 Interstellar
2h 49m

11:00 PM
📺 Breaking Bad
S03E08
47m
```

Add weekly view if time permits.

### Target

**2.5 hours**

---

# Phase 6 — Binge Planner

A small feature with good demo value.

Suppose:

```text
Episodes remaining = 20
Average duration = 45 min
Available daily time = 90 min
```

Calculate:

```text
90 / 45 = 2 episodes/day

20 / 2 = 10 days
```

Display:

```text
🔥 Binge Plan

2 episodes/day

Estimated completion:
10 days

Start:
September 1

Finish:
September 10
```

### Deliverable

User selects:

```text
Show
+
Available daily time
```

System returns:

```text
Episodes/day
Estimated completion date
```

### Target

**45 minutes**

---

# Phase 7 — "What Should I Watch?"

This should be the **signature feature**.

### Goal

Help users decide what to watch based on their current situation.

Create:

```text
/api/recommendations
```

Do not build ML for the MVP.

Use a simple scoring algorithm.

## Inputs

Ask:

```text
How much time do you have?

[30 min]
[1 hour]
[2 hours]
[3+ hours]
```

Optional:

```text
What do you want?

[Movie]
[Series]
[Anime]
[YouTube]
[Any]
```

## Recommendation Logic

For every library item:

```text
Score =
    Priority Score
  + Genre Match
  + Rating Score
  + Time Fit
  + User History
```

Example:

```text
Interstellar

Priority       +25
Genre match    +30
Rating         +18
Time fit       +15
History        +10

Total = 98
```

## UI

```text
┌──────────────────────────────────┐
│       🎲 What Should I Watch?    │
│                                  │
│ How much time do you have?       │
│                                  │
│ [30m] [1h] [2h] [3h+]            │
│                                  │
│ [        PICK FOR ME        ]    │
└──────────────────────────────────┘
```

Result:

```text
        🎬 YOUR PICK

       INTERSTELLAR

       ⭐ 8.7

       ⏱️ 2h 49m

Why this?

✓ High priority
✓ Matches your preferred genre
✓ Highly rated
✓ Fits your available time

[Schedule] [View Details]
```

### Target

**1.5 hours**

---

# Phase 8 — Dashboard

Now combine everything.

The dashboard becomes the **control center**.

```text
┌──────────────────────────────────────────────┐
│ CinePlan                         👤 Profile │
├──────────────────────────────────────────────┤
│                                              │
│ Welcome back! 👋                             │
│                                              │
│ [ 🔍 Search ]       [ 🎲 What should I watch?]
│                                              │
│ CONTINUE WATCHING                            │
│ ┌────────┐ ┌────────┐ ┌────────┐            │
│ │ Breaking│ │ One    │ │ Dark   │            │
│ │ Bad     │ │ Piece  │ │        │            │
│ └────────┘ └────────┘ └────────┘            │
│                                              │
│ TODAY'S PLAN                                 │
│ ───────────────────────────────────────────  │
│ 8:00 PM  Interstellar                        │
│ 10:00 PM Breaking Bad S03E08                 │
│                                              │
│ QUICK STATS                                  │
│                                              │
│ 42          18.5h          27                │
│ Completed   Watch Time     Planned           │
│                                              │
└──────────────────────────────────────────────┘
```

### Target

**1 hour**

---

# Phase 9 — Statistics

If time remains, build statistics.

Calculate:

```text
Movies completed
Series completed
Episodes watched
Total watch time
Favorite genres
```

Example:

```text
Your Stats

🎬 Movies
12

📺 Series
8

🎌 Anime
5

▶️ Episodes
132

⏱️ Watch Time
87h 42m
```

Then add charts if time allows.

### Target

**45 minutes**

---

# Phase 10 — Ratings & Reviews

This is P1.

Allow:

```text
⭐ 1 2 3 4 5
```

And:

```text
Write a review...
```

Store:

```javascript
{
    userId,
    contentId,
    rating,
    review
}
```

### Target

**30–45 minutes**

---

# Phase 11 — UI Polish

A technically good project can still look unfinished.

Focus on:

## Loading States

```text
Searching...
Loading...
```

## Empty States

```text
Your watchlist is empty.

[Discover Something]
```

## Error States

```text
Unable to load content.

[Try Again]
```

## Responsive Design

Test:

```text
Desktop
Tablet
Mobile
```

## Small Animations

Use simple:

```text
hover
scale
fade
```

Do not spend hours on complex animations.

### Target

**1–1.5 hours**

---

# Phase 12 — Final Testing + Demo

Test the complete journey.

## Main Demo Flow

```text
Register
   ↓
Login
   ↓
Search Interstellar
   ↓
View Details
   ↓
Check Streaming Availability
   ↓
Add to Library
   ↓
Set High Priority
   ↓
Schedule Tonight
   ↓
Dashboard
   ↓
"What Should I Watch?"
   ↓
Recommendation
```

## Series Demo

```text
Search Breaking Bad
       ↓
Add
       ↓
Open Episodes
       ↓
Mark episodes watched
       ↓
Progress updates
       ↓
Next episode
```

---

# Complete 24-Hour Plan

| Time | Phase | Priority |
|---:|---|:---:|
| 0:00–0:45 | Project setup | 🔴 P0 |
| 0:45–2:15 | Authentication | 🔴 P0 |
| 2:15–5:15 | API + Discovery | 🔴 P0 |
| 5:15–7:15 | Library | 🔴 P0 |
| 7:15–9:15 | Episode/Progress tracking | 🔴 P0 |
| 9:15–11:45 | Planner | 🔴 P0 |
| 11:45–13:15 | Recommendation system | 🔴 P0 |
| 13:15–14:15 | Dashboard | 🔴 P0 |
| 14:15–15:00 | Binge planner | 🟡 P1 |
| 15:00–15:45 | Statistics | 🟡 P1 |
| 15:45–16:30 | Ratings/reviews | 🟡 P1 |
| 16:30–18:00 | UI polish | 🔴 P0 |
| 18:00–19:00 | Error/loading/empty states | 🔴 P0 |
| 19:00–20:30 | Testing & bug fixing | 🔴 P0 |
| 20:30–22:00 | Deployment | 🔴 P0 |
| 22:00–23:00 | Demo preparation | 🔴 P0 |
| 23:00–24:00 | Buffer / final fixes | 🔴 P0 |

---

# Recommended Build Order

Follow this dependency chain:

```text
1. Project Setup
       ↓
2. MongoDB Connection
       ↓
3. User Authentication
       ↓
4. External API Service
       ↓
5. Search
       ↓
6. Content Details
       ↓
7. Library
       ↓
8. Progress Tracking
       ↓
9. Planner
       ↓
10. Recommendation Engine
       ↓
11. Dashboard
       ↓
12. Statistics
       ↓
13. Reviews
       ↓
14. UI Polish
       ↓
15. Deployment
```

---

# What NOT to Do During the 24 Hours

Avoid these until the core product works:

```text
❌ Microservices
❌ Redux unless you genuinely need it
❌ Docker if you're unfamiliar with it
❌ Cloudinary
❌ AI/ML recommendations
❌ Social features
❌ Complex notification infrastructure
❌ Advanced calendar customization
❌ Custom video streaming
❌ Complicated animations
```

For state management, **React Context + local state** should be enough for this MVP.

---

# Minimum Viable Demo

If you run out of time, stop here:

```text
                CINEPLAN MVP

                     │
                     ▼
              🔐 Login/Register
                     │
                     ▼
                🔎 Discover
                     │
                     ▼
              🎬 Content Details
                     │
                     ▼
              ➕ Add to Library
                     │
                     ▼
             📚 Manage Watchlist
                     │
                     ▼
              📺 Track Progress
                     │
                     ▼
               📅 Schedule
                     │
                     ▼
          🎲 What Should I Watch?
                     │
                     ▼
                📊 Dashboard
```

If these pieces work smoothly, you already have a strong hackathon project.

---

# Final Hackathon Strategy

The most important thing is not the number of features. Make the features feel like **one connected product** rather than separate CRUD modules.

Your strongest demo story is:

> **"I have a huge list of things I want to watch, but only 2 hours tonight."**

CinePlan should let the user:

1. Discover something.
2. Save it.
3. Prioritize it.
4. Check where it is available.
5. Schedule it.
6. Track progress.
7. Ask CinePlan what to watch next.
8. See the result reflected on the dashboard.

That is the product story judges should remember.
