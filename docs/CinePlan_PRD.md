# Product Requirements Document (PRD)
## CinePlan — Personal Entertainment Planner

**Document Version:** 1.0  
**Product Type:** Web Application  
**Development Context:** 24-hour hackathon  
**Tech Stack:** MERN + Tailwind CSS + free external APIs  
**Primary Objective:** Build a functional MVP that helps users discover, organize, plan, track, and manage entertainment content.

---

## 1. Overview / Summary

**CinePlan** is a personal entertainment planning web application that brings movies, TV/web series, anime, and YouTube videos into one organized platform. Users can discover content through external APIs, save titles to a personal library, prioritize what they want to watch, track movies and episode-level progress, schedule viewing sessions, create binge plans, record watch time, rate completed content, and receive basic personalized recommendations.

The core value proposition is:

> **CinePlan helps users decide what to watch, when to watch it, and keep track of what they have already watched.**

### Product Vision

> **One place to discover, organize, plan, watch, and track everything you want to watch.**

### Tagline

> **CinePlan — Decide what to watch. Plan when to watch it. Never lose track.**

---

# 2. Problem Statement

People consume entertainment across many platforms and content types. A user may discover a movie on one platform, save an anime recommendation somewhere else, bookmark a YouTube video, and maintain a separate mental list of TV shows they want to watch.

This creates several problems:

- Users forget what they wanted to watch.
- Large watchlists become difficult to manage.
- Users don't know what to watch when they have limited free time.
- Series and anime progress can be difficult to track.
- Users don't have a centralized viewing schedule.
- They may forget where a movie/show is legally available.
- There is little connection between a user's watch history and what they should watch next.

### Opportunity

CinePlan combines:

**Discovery + Watchlist + Progress Tracking + Scheduling + Recommendations + Statistics**

into a single experience.

Instead of simply asking:

> "What movies have I saved?"

CinePlan answers:

> **"What should I watch tonight, how long will it take, where can I watch it, and how much do I have left?"**

---

# 3. Goals & Success Metrics

Because this is a **24-hour hackathon MVP**, success should focus on demonstrating the core product loop rather than large-scale business metrics.

## Primary Goals

### G1 — Centralized Entertainment Library

Users should be able to save movies, shows, anime, and YouTube videos in one place.

**Success metric:**

- A user can add content to their library in ≤2 clicks from a content details page.

### G2 — Simple Progress Tracking

Users should be able to track:

- Movies → watched/unwatched
- Series → season/episode progress
- Anime → episode progress
- YouTube → watched/unwatched

**Success metric:**

- Progress updates should reflect immediately without requiring a page refresh.

### G3 — Entertainment Planning

Users should be able to schedule content for a particular date/time.

**Success metric:**

- User can create a viewing plan in under 30 seconds.

### G4 — Useful Recommendations

CinePlan should answer:

> "What should I watch?"

based on:

- Genre
- Rating
- Priority
- Watch history
- Available time
- Content type

**Success metric:**

- Recommendation results should be generated within 2 seconds, excluding external API latency.

### G5 — Complete Product Loop

The ideal user journey is:

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

This loop should be demonstrable during the hackathon presentation.

---

# 4. Non-Goals

The following are explicitly **out of scope for the MVP**.

### Social Networking

No:

- Followers
- Following
- Likes
- Comments
- Friend system
- Public profiles
- Activity feeds

### Content Streaming

CinePlan will **not host or stream movies, TV shows, anime, or copyrighted videos**.

It will provide discovery information and links to legitimate streaming platforms where available.

### Advanced AI/ML Recommendations

The MVP will use a rule-based recommendation system.

No:

- Machine learning models
- Collaborative filtering
- Neural recommendation systems

### Native Mobile Applications

Only a responsive web application for the MVP.

### Paid Subscriptions

No premium plans or payment processing.

### Advanced Media Management

No:

- Video uploading
- Video hosting
- Video transcoding
- DRM
- Piracy-related functionality

---

# 5. User Personas / Target Audience

Although the product is designed for **everyone**, the MVP can focus on several representative personas.

## Persona 1 — Casual Viewer

Someone who watches movies and series occasionally.

### Needs

- Remember movies they want to watch
- Find something quickly
- Know where it is available
- Track completed content

### Pain Point

> "I remember saving this movie somewhere, but I can't remember where."

---

## Persona 2 — Entertainment Enthusiast

Watches multiple:

- Movies
- Series
- Anime
- YouTube content

### Needs

- Large organized library
- Episode tracking
- Ratings
- Watch history
- Statistics

### Pain Point

> "I have so many shows to watch that I don't know what to start next."

---

## Persona 3 — Busy Viewer

Has limited entertainment time.

### Need

> "I have one hour tonight. What can I watch?"

CinePlan should recommend content based on available time.

---

## Persona 4 — Binge Watcher

Likes watching complete seasons or multiple episodes together.

### Needs

- Binge planning
- Episode tracking
- Estimated completion time
- Viewing schedule

---

# 6. User Stories / Use Cases

## Discovery

- As a user, I want to search for movies so that I can discover content I may want to watch.
- As a user, I want to search for TV shows and anime so that I can manage different types of entertainment.
- As a user, I want to search for YouTube videos so that I can keep online content alongside traditional entertainment.
- As a user, I want to see content details so that I can decide whether I want to watch it.

## Watchlist

- As a user, I want to add content to my watchlist so that I don't forget about it.
- As a user, I want to remove content from my watchlist so that I can keep my library organized.
- As a user, I want to assign priorities so that I know what I should watch first.
- As a user, I want to categorize content so that I can easily filter my library.

## Progress

- As a user, I want to mark a movie as watched so that my viewing history is accurate.
- As a user, I want to track individual episodes so that I know where I stopped.
- As a user, I want to mark content as dropped so that unfinished content doesn't remain in my active list.
- As a user, I want to resume content from my previous episode so that I don't have to remember where I stopped.

## Planning

- As a user, I want to schedule content for a date and time so that I can plan my entertainment.
- As a user, I want to create a daily viewing plan so that I know what I intend to watch.
- As a user, I want to create a weekly viewing plan so that I can organize my free time.
- As a user, I want to create a binge plan so that I can estimate when I will finish a series.
- As a user, I want reminders so that I don't forget planned viewing sessions.

## Recommendations

- As a user, I want CinePlan to recommend something based on my preferences so that I can decide what to watch quickly.
- As a user, I want recommendations based on my available time so that suggested content fits my schedule.
- As a user, I want recommendations based on priority so that important items in my watchlist are surfaced.

## Statistics

- As a user, I want to see how much I watch so that I can understand my entertainment habits.
- As a user, I want to see my completed movies and shows so that I can track my progress.
- As a user, I want to see my most-watched genres so that I can understand my preferences.

---

# 7. Functional Requirements

### Priority Definitions

- **P0:** Essential for MVP/demo
- **P1:** Important if time permits
- **P2:** Future enhancement

---

## 7.1 Authentication

### FR-001 — User Registration — P0

Users shall be able to create an account using:

- Name
- Email
- Password

### FR-002 — Login — P0

Users shall be able to log in securely.

### FR-003 — Authentication — P0

Protected user data must only be accessible to the authenticated user.

Recommended implementation:

```text
JWT
+
HTTP-only cookie
```

---

## 7.2 Content Discovery

### FR-004 — Search — P0

Users shall be able to search for:

- Movies
- TV/web series
- Anime
- YouTube videos

### FR-005 — Search Results — P0

Results should display:

- Poster/thumbnail
- Title
- Content type
- Release date/year
- Rating where available

### FR-006 — Content Details — P0

A details page should display:

- Title
- Poster/thumbnail
- Description
- Genres
- Rating
- Release date
- Runtime
- Cast where available
- Seasons/episodes for series
- Streaming availability

---

## 7.3 Watchlist / Library

### FR-007 — Add Content — P0

Users shall be able to add content to their library.

### FR-008 — Remove Content — P0

Users shall be able to remove saved content.

### FR-009 — Status — P0

Each saved item should support:

```text
PLANNED
WATCHING
COMPLETED
DROPPED
```

### FR-010 — Priority — P0

Each item should support:

```text
HIGH
MEDIUM
LOW
```

### FR-011 — Filtering — P1

Users should be able to filter their library by:

- Content type
- Status
- Genre
- Priority

### FR-012 — Sorting — P1

Users should be able to sort by:

- Recently added
- Priority
- Rating
- Release date

---

## 7.4 Episode Tracking

### FR-013 — Episode Progress — P0

For series/anime, users shall be able to track:

```text
Season
Episode
Watched status
```

### FR-014 — Automatic Progress — P0

When an episode is marked watched:

```text
Episodes watched / Total episodes
```

should update automatically.

### FR-015 — Resume — P1

The system should identify the next unwatched episode.

Example:

```text
Breaking Bad
Season 2
Episode 7

[▶ Continue Watching]
```

---

## 7.5 Scheduling

### FR-016 — Create Schedule — P0

Users shall be able to schedule:

- Movie
- Series episode
- Anime episode
- YouTube video

with:

```text
Date
Start time
```

### FR-017 — Calendar — P0

Provide:

- Daily view
- Weekly view

A monthly calendar can be P1.

### FR-018 — Daily Plan — P1

Users should see:

```text
Today's Plan

8:00 PM
Interstellar
2h 49m

10:00 PM
Breaking Bad
S03E08
47m
```

### FR-019 — Binge Planner — P1

Given:

```text
Episodes remaining: 20
Average episode length: 45 min
Daily available time: 90 min
```

CinePlan should calculate approximately:

```text
2 episodes/day
≈ 10 days
```

---

## 7.6 Available-Time Recommendations

### FR-020 — Available Time — P0

User can select:

```text
30 min
1 hour
2 hours
3+ hours
```

### FR-021 — Recommendation — P0

The system should recommend content that fits the selected duration.

Example:

```text
I have 1 hour.

        ↓

Recommended

Breaking Bad
47 min

Brooklyn Nine-Nine
22 min

YouTube Documentary
54 min
```

---

## 7.7 Recommendation Engine

### FR-022 — Basic Recommendation Algorithm — P0

Recommendations should consider:

```text
Genre preference
+
User ratings
+
Priority
+
Watch history
+
Available time
+
Content type
```

A simple scoring model is sufficient:

```text
Recommendation Score =
    Genre Match × 30
  + Priority × 25
  + Rating × 20
  + Time Fit × 15
  + User History × 10
```

The exact weights can be adjusted during implementation.

---

## 7.8 Ratings & Reviews

### FR-023 — Rating — P1

Users should be able to rate completed content.

Example:

```text
⭐ 1  2  3  4  5
```

### FR-024 — Personal Review — P1

Users should be able to add a private review/notes.

---

## 7.9 Watch-Time Tracking

### FR-025 — Watch Time — P0

The application should calculate:

```text
Total watch time
Weekly watch time
Monthly watch time
```

### FR-026 — Content Statistics — P1

Display:

```text
Movies completed
Shows completed
Episodes watched
YouTube videos watched
```

---

## 7.10 Dashboard

### FR-027 — Personal Dashboard — P0

The dashboard should display:

```text
Welcome back!

Continue Watching
─────────────────
Breaking Bad
One Piece
...

Today's Plan
─────────────────
🎬 Interstellar — 8:00 PM

Quick Stats
─────────────────
42 Completed
27 Planned
18.5h Watched

What Should I Watch?
────────────────────
[ 🎲 Pick For Me ]
```

### FR-028 — Statistics — P1

Charts can display:

- Watch time
- Content types
- Favorite genres
- Monthly activity

---

## 7.11 Streaming Availability

### FR-029 — Streaming Providers — P0

Where API data supports it, display legitimate streaming providers.

Example:

```text
Where to Watch

Netflix
Prime Video
Disney+
```

### FR-030 — External Link — P0

Users should be able to navigate to the legitimate provider.

---

## 7.12 Notifications

### FR-031 — Viewing Reminders — P1

Users can receive reminders for scheduled content.

For a 24-hour hackathon, browser notifications/email can be deferred if implementation becomes complex.

---

# 8. Non-Functional Requirements

## Performance

### NFR-001

Initial application pages should aim for:

**< 2–3 seconds** under normal conditions.

### NFR-002

Search requests should provide results quickly and show loading states while waiting for external APIs.

### NFR-003

Use API caching/debouncing to avoid unnecessary external API calls.

## Security

### NFR-004

Passwords must never be stored as plain text.

Use:

```text
bcrypt
```

### NFR-005

Validate user input on both:

```text
Frontend
Backend
```

### NFR-006

Users must only be able to access and modify their own:

- Watchlists
- Progress
- Schedules
- Reviews
- Statistics

## Scalability

The architecture should allow future additions such as:

- Social features
- AI recommendations
- Mobile application
- More content providers
- Premium features

## Accessibility

The application should:

- Use semantic HTML
- Support keyboard navigation
- Provide readable contrast
- Provide alt text for images
- Avoid relying solely on color
- Use accessible form labels

## Responsive Design

The application must work on:

- Desktop
- Tablet
- Mobile

Tailwind CSS should be used for responsive layouts.

---

# 9. User Flow / UX Considerations

## Main Navigation

```text
┌────────────────────────────────────────────┐
│ CinePlan    Discover  My Library  Planner │
│                         Dashboard Profile │
└────────────────────────────────────────────┘
```

## Flow 1 — Discover Content

```text
Home
 ↓
Search
 ↓
Search Results
 ↓
Content Details
 ↓
Add to Library
 ↓
Set Priority
```

## Flow 2 — Continue Watching

```text
Dashboard
 ↓
Continue Watching
 ↓
Select Show
 ↓
Next Unwatched Episode
 ↓
Mark Watched
 ↓
Progress Updated
```

## Flow 3 — Plan Viewing

```text
Library
 ↓
Select Content
 ↓
Schedule
 ↓
Choose Date/Time
 ↓
Calendar
 ↓
Reminder
```

## Flow 4 — What Should I Watch?

```text
Dashboard
 ↓
"What Should I Watch?"
 ↓
Select Available Time
 ↓
Select Content Type / Mood
 ↓
Recommendation Engine
 ↓
Recommended Content
 ↓
Watch / Schedule
```

---

# 10. Key Screens

## P0

1. Landing/Login
2. Dashboard
3. Discover/Search
4. Content Details
5. My Library
6. Series/Episode Progress
7. Planner/Calendar
8. Recommendation Modal/Page

## P1

9. Statistics
10. Profile
11. Detailed reviews

---

# 11. Suggested UI Structure

## Dashboard

```text
┌─────────────────────────────────────────────┐
│ CinePlan                                    │
│                                             │
│ Welcome back!                               │
│                                             │
│ [ 🔍 Search ]             [🎲 Pick For Me] │
│                                             │
│ Continue Watching                           │
│ ┌─────┐ ┌─────┐ ┌─────┐                   │
│ │     │ │     │ │     │                   │
│ └─────┘ └─────┘ └─────┘                   │
│                                             │
│ Today's Plan                                │
│ ─────────────────────────────────────────── │
│ 8 PM   Interstellar                         │
│ 9 PM   Breaking Bad S03E08                 │
│                                             │
│ Your Stats                                  │
│ ┌────────┐ ┌────────┐ ┌────────┐           │
│ │ 42     │ │ 18.5h  │ │ 27     │           │
│ │Watched │ │ Time   │ │Planned │           │
│ └────────┘ └────────┘ └────────┘           │
└─────────────────────────────────────────────┘
```

---

# 12. External API Strategy

Since this is a **24-hour hackathon**, avoid building your own content database.

Use free API tiers/free APIs where their current terms and quotas permit.

## Movies & TV

A service such as **TMDB** is a strong candidate for:

- Movies
- TV shows
- Posters
- Genres
- Ratings
- Cast
- Seasons
- Episodes
- Provider/streaming availability where supported

## YouTube

Use the **YouTube Data API** for YouTube video search/metadata, subject to its quota and API-key requirements.

## Important Architecture Decision

Do **not** expose API secrets directly in React.

Instead:

```text
React
  ↓
Express Backend
  ↓
External API
```

Store API keys in:

```text
.env
```

---

# 13. Cloudinary

**Cloudinary should be optional for the MVP.**

You don't need Cloudinary if your application primarily displays posters/thumbnails supplied by external APIs.

Use Cloudinary later for:

- User profile images
- Custom posters
- User-uploaded images
- Custom watchlist artwork

For a 24-hour hackathon:

> **Don't spend valuable development time implementing Cloudinary unless another feature actually requires image uploads.**

---

# 14. Suggested Technical Architecture

```text
                  ┌─────────────────────┐
                  │       React         │
                  │      + Vite         │
                  │      + Tailwind     │
                  └──────────┬──────────┘
                             │
                           Axios
                             │
                  ┌──────────▼──────────┐
                  │      Express        │
                  │       Node.js       │
                  │                     │
                  │ Auth                │
                  │ Watchlist           │
                  │ Progress            │
                  │ Planner              │
                  │ Recommendations     │
                  └───────┬──────┬──────┘
                          │      │
                    MongoDB      │
                          │      │
                 ┌────────▼─┐    │
                 │ Database │    │
                 └──────────┘    │
                                 │
                         ┌───────▼────────┐
                         │ External APIs  │
                         │                │
                         │ TMDB           │
                         │ YouTube API    │
                         └────────────────┘
```

---

# 15. Suggested MongoDB Data Model

## User

```javascript
{
  _id,
  name,
  email,
  passwordHash,
  preferences: {
    genres: [],
    contentTypes: []
  },
  createdAt
}
```

## LibraryItem

```javascript
{
  _id,
  userId,
  externalId,
  title,
  type,
  poster,
  genres: [],
  status,
  priority,
  progress,
  addedAt,
  completedAt
}
```

## EpisodeProgress

```javascript
{
  _id,
  userId,
  contentId,
  seasonNumber,
  episodeNumber,
  watched,
  watchedAt
}
```

## Schedule

```javascript
{
  _id,
  userId,
  contentId,
  episodeId,
  scheduledDate,
  startTime,
  duration,
  reminder
}
```

## Review

```javascript
{
  _id,
  userId,
  contentId,
  rating,
  review,
  createdAt
}
```

---

# 16. API Endpoints

## Authentication

```text
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
```

## Content

```text
GET    /api/content/search
GET    /api/content/:id
GET    /api/content/:id/providers
```

## Library

```text
GET    /api/library
POST   /api/library
PATCH  /api/library/:id
DELETE /api/library/:id
```

## Progress

```text
GET    /api/progress/:contentId
POST   /api/progress
PATCH  /api/progress/:id
```

## Planner

```text
GET    /api/schedule
POST   /api/schedule
PATCH  /api/schedule/:id
DELETE /api/schedule/:id
```

## Recommendations

```text
GET    /api/recommendations
POST   /api/recommendations/pick
```

## Reviews

```text
POST   /api/reviews
GET    /api/reviews/:contentId
PATCH  /api/reviews/:id
DELETE /api/reviews/:id
```

---

# 17. Dependencies & Risks

| Risk | Impact | Mitigation |
|---|---|---|
| External API rate limits | High | Cache results and debounce search |
| API downtime | High | Show graceful error/fallback |
| API doesn't provide required data | Medium | Reduce feature scope |
| 24-hour deadline | Very High | Strict P0/P1 prioritization |
| Calendar implementation takes too long | Medium | Build simple schedule list first |
| Notification implementation | Medium | Make reminders P1 |
| Recommendation quality | Medium | Start with simple scoring |
| Authentication bugs | High | Implement early |
| Complex episode data | Medium | Support core series structure first |
| Streaming availability varies by region | Medium | Clearly show provider data when available |

---

# 18. 24-Hour Hackathon Timeline

## Hour 0–2 — Foundation

```text
✓ Project setup
✓ React/Vite
✓ Tailwind
✓ Express
✓ MongoDB
✓ Environment variables
✓ Git repository
```

## Hour 2–5 — Authentication + Database

```text
✓ User model
✓ Register
✓ Login
✓ JWT
✓ Protected routes
✓ Library schema
```

## Hour 5–9 — Discovery

```text
✓ API integration
✓ Search
✓ Search results
✓ Content details
✓ Posters
✓ Streaming availability
```

## Hour 9–13 — Library

```text
✓ Add to library
✓ Remove
✓ Status
✓ Priority
✓ Filters
✓ Continue watching
```

## Hour 13–16 — Episode Tracking

```text
✓ Seasons
✓ Episodes
✓ Mark watched
✓ Progress %
✓ Next episode
```

## Hour 16–19 — Planner

```text
✓ Schedule content
✓ Daily view
✓ Weekly view
✓ Binge calculation
```

Don't over-engineer the calendar.

## Hour 19–21 — Recommendations

Implement:

```text
"What should I watch?"
```

with:

```text
Genre
+
Priority
+
Rating
+
Available time
+
Status
```

## Hour 21–23 — Dashboard + Polish

```text
✓ Statistics
✓ Responsive UI
✓ Loading states
✓ Error handling
✓ Empty states
✓ Animations
✓ Final UI polish
```

## Hour 23–24 — Demo Preparation

```text
✓ Seed/demo account
✓ Test complete flow
✓ Fix critical bugs
✓ Prepare presentation
✓ Prepare demo script
```

---

# 19. MVP Priority Matrix

| Feature | Priority | Hackathon Decision |
|---|---:|---|
| Authentication | P0 | ✅ Build |
| Movie/TV search | P0 | ✅ Build |
| Anime discovery | P0 | ✅ Build through available API data |
| YouTube search | P0 | ✅ Build if API setup is ready |
| Content details | P0 | ✅ Build |
| Streaming availability | P0 | ✅ Build |
| Watchlist | P0 | ✅ Build |
| Status | P0 | ✅ Build |
| Priority | P0 | ✅ Build |
| Episode tracking | P0 | ✅ Build |
| Basic planner | P0 | ✅ Build |
| Available-time recommendation | P0 | ✅ Build |
| Dashboard | P0 | ✅ Build |
| Watch statistics | P1 | ✅ If time |
| Ratings | P1 | ✅ If time |
| Reviews | P1 | Optional |
| Binge planner | P1 | Optional |
| Reminders | P1 | Optional |
| Cloudinary | P2 | ❌ Skip |
| Social features | P2 | ❌ Skip |
| AI recommendations | P2 | ❌ Skip |
| Mobile app | P2 | ❌ Skip |

---

# 20. Future Roadmap

## Version 2

- Better recommendation algorithm
- AI-powered recommendations
- Mood-based recommendations
- More streaming providers
- Better calendar
- Browser notifications
- Import existing watchlists

## Version 3

- Social profiles
- Friends
- Shared watchlists
- Collaborative watching plans
- Public reviews
- Activity feeds

## Version 4

- Mobile application
- Cross-device synchronization
- Advanced recommendation engine
- AI entertainment assistant

Potential assistant experience:

> **"I have 90 minutes tonight and want something exciting but not too serious."**

CinePlan could analyze the user's library and return several appropriate options.

---

# 21. Open Questions

1. Which free API(s) will provide the best combined coverage for movies, TV, and anime?
2. How will anime be represented when an API categorizes it simply as TV?
3. Which streaming-provider data is available for the user's target region?
4. Should YouTube videos have the same `LibraryItem` structure as movies/series?
5. Should watch time be based on actual user activity or content runtime?
6. Should reviews be private or eventually public?
7. Should scheduled items automatically change status to `WATCHING`?
8. Should completing the final episode automatically mark a series `COMPLETED`?
9. How should partially watched movies be represented?
10. Should a user be allowed to schedule the same content multiple times?
11. How should timezone handling work?
12. What should happen when an external API is unavailable?

For the hackathon, these should **not block development**. Make sensible defaults and document them.

---

# 22. Final Product Definition

The strongest version of your **24-hour CinePlan MVP** is not "an IMDb clone."

It should demonstrate:

```text
┌──────────────────────────────────────────────────┐
│                    CINEPLAN                      │
│                                                  │
│  Discover → Organize → Prioritize → Plan        │
│                         ↓                        │
│                       Watch                      │
│                         ↓                        │
│                      Track                       │
│                         ↓                        │
│                    Complete                      │
│                         ↓                        │
│                Recommend Better                  │
└──────────────────────────────────────────────────┘
```

## Killer Demo Flow

> **"I have a huge list of things I want to watch, but only 2 hours tonight."**

Then demonstrate:

1. **Search** → Find a movie/show
2. **Add** → Save it to CinePlan
3. **Prioritize** → Mark it High Priority
4. **Check availability** → Show legitimate streaming providers
5. **Plan** → Schedule it for tonight
6. **Track** → Mark episodes watched
7. **Dashboard** → Show updated statistics
8. **Recommendation** → Ask "What should I watch?"
9. **Result** → CinePlan selects something that fits the user's available time.

This tells a much stronger product story than simply showing CRUD operations.

## One-Sentence Pitch

> **CinePlan is a personal entertainment planner that helps users discover movies, series, anime, and YouTube content, organize their watchlist, track progress, plan viewing time, and decide what to watch next—all in one place.**

## Hackathon Core Scope

For the **24-hour hackathon**, treat these as the core product:

**Authentication + Discovery + Library + Episode Tracking + Basic Planner + "What Should I Watch?"**

Everything else should only be added after these six pieces work end-to-end.
