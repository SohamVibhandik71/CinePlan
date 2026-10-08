# CinePlan ML Service — Teammate Setup Guide

## 1. Purpose

This guide explains how to run the CinePlan ML recommendation service locally and how the Node.js backend uses it.

Architecture:

```text
React Frontend
      |
      v
Node.js / Express
      |
      | Axios
      v
FastAPI ML Service
      |
      v
Recommendation Model
```

The frontend should **not** call FastAPI directly.

---

## 2. Prerequisites

Install:

- Git
- Python 3
- Node.js
- npm

Clone the CinePlan repository:

```bash
git clone <CINEPLAN_REPOSITORY_URL>
cd CinePlan
```

If already cloned:

```bash
git pull
```

---

## 3. ML Directory

Go to:

```bash
cd ml
```

Expected structure:

```text
ml/
├── data/
├── notebooks/
├── src/
├── scripts/
├── models/
├── requirements.txt
└── venv/
```

---

## 4. Create Python Environment

From `ml/`:

```bash
python -m venv venv
```

Windows Git Bash:

```bash
source venv/Scripts/activate
```

The terminal should show:

```text
(venv)
```

Do **not** commit `venv/`.

---

## 5. Install Dependencies

With the environment activated:

```bash
pip install -r requirements.txt
```

The environment needs the packages used by the current ML service, including:

```text
pandas
numpy
scikit-learn
requests
python-dotenv
fastapi
uvicorn
```

If FastAPI/Uvicorn are missing:

```bash
pip install fastapi uvicorn
```

---

## 6. Environment Variables

Inside:

```text
ml/
```

create:

```text
.env
```

Add:

```env
TMDB_ACCESS_TOKEN=YOUR_TMDB_ACCESS_TOKEN
```

Never commit `.env`.

Recommended `.gitignore` entries:

```gitignore
.env
venv/
__pycache__/
*.pyc
```

The TMDB token is needed by the data collector. It is not required merely to load the already-built recommendation artifacts.

---

## 7. Model Files

The existing recommendation service uses:

```text
ml/models/
├── tfidf_vectorizer.pkl
├── tfidf_matrix.pkl
└── content_data.pkl
```

These are required by:

```text
ml/src/models/recommender.py
```

A teammate does **not** need to rebuild the dataset just to run the API, provided these files are already present.

Check:

```bash
ls models
```

You should see:

```text
content_data.pkl
tfidf_matrix.pkl
tfidf_vectorizer.pkl
```

---

## 8. Verify the Model

From `ml/`, with `(venv)` active:

```bash
python -c "from src.models.recommender import Recommender; r=Recommender(); print('Model loaded successfully')"
```

Expected:

```text
Recommendation model loaded successfully.
Model loaded successfully
```

If this works, the Python environment and model artifacts are available.

---

## 9. Start FastAPI

From the `ml/` directory:

```bash
uvicorn src.api.main:app --reload
```

The service runs at:

```text
http://127.0.0.1:8000
```

Keep this terminal running.

---

## 10. Test FastAPI

Open:

```text
http://127.0.0.1:8000/
```

Expected:

```json
{
  "message": "CinePlan Recommendation API is running"
}
```

Swagger UI:

```text
http://127.0.0.1:8000/docs
```

---

## 11. Test the Recommendation Endpoint

Endpoint:

```http
POST http://127.0.0.1:8000/recommend
```

Header:

```text
Content-Type: application/json
```

Body:

```json
{
  "user_history": [
    1084242,
    82976,
    33238,
    275102
  ],
  "top_n": 10
}
```

The IDs above are TMDB content IDs used by the current project test.

Expected response starts similar to:

```json
{
  "recommendations": [
    {
      "content_id": 150540,
      "title": "Inside Out",
      "type": "movie",
      "genres": "Animation|Family|Adventure|Drama|Comedy",
      "final_score": 0.627
    }
  ]
}
```

---

## 12. Important: `user_history` IDs

The ML service expects **TMDB content IDs**.

It does NOT expect MongoDB document `_id` values.

CinePlan's `LibraryItem` has:

```text
_id         -> MongoDB document ID
externalId  -> TMDB content ID
```

The ML service uses:

```text
externalId
```

---

## 13. How Real User History Is Obtained

A teammate should not manually construct `user_history` in production.

Node.js gets the authenticated user's library from MongoDB.

For V1, only:

```text
watching
completed
```

are used as recommendation history.

`planned` items are excluded.

Flow:

```text
MongoDB LibraryItem
        |
        v
Current user
        |
        v
watching + completed
        |
        v
externalId
        |
        v
user_history
```

Example:

```text
Zootopia 2       -> 1084242
The Novices      -> 82976
Running Man      -> 33238
The Scandal      -> 275102
```

Node sends:

```json
{
  "user_history": [
    1084242,
    82976,
    33238,
    275102
  ],
  "top_n": 10
}
```

to FastAPI.

---

## 14. Node.js → FastAPI

The Node backend contains:

```text
services/recommendationService.js
```

It uses Axios to call:

```text
http://127.0.0.1:8000/recommend
```

Flow:

```text
Node.js
   |
   | POST /recommend
   v
FastAPI :8000
```

FastAPI returns:

```json
{
  "recommendations": [...]
}
```

---

## 15. Frontend Integration Rule

The React frontend should call:

```http
GET /api/recommendations
```

on the Node backend.

It should **not** call:

```text
http://127.0.0.1:8000/recommend
```

directly.

Correct:

```text
React
  |
  v
GET /api/recommendations
  |
  v
Node.js
  |
  v
FastAPI
```

---

## 16. Run Both Services

Use two terminals.

### Terminal 1 — ML

```bash
cd CinePlan/ml
source venv/Scripts/activate
uvicorn src.api.main:app --reload
```

Runs:

```text
http://127.0.0.1:8000
```

### Terminal 2 — Node Backend

```bash
cd CinePlan
npm run dev
```

Use the project's configured backend command if it differs.

---

## 17. Test the Full Integration

After both services are running:

```http
GET http://localhost:<NODE_PORT>/api/recommendations
```

Use the JWT:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

No request body is required.

The complete flow is:

```text
GET /api/recommendations
        |
        v
Node authentication
        |
        v
MongoDB LibraryItem
        |
        v
watching + completed
        |
        v
externalId list
        |
        v
Axios
        |
        v
POST /recommend
        |
        v
FastAPI
        |
        v
Recommender
        |
        v
Top-N recommendations
        |
        v
Node
        |
        v
React
```

---

## 18. Troubleshooting

### `ModuleNotFoundError`

Activate the environment:

```bash
source venv/Scripts/activate
```

Then:

```bash
pip install -r requirements.txt
```

---

### Model `.pkl` file not found

Check:

```bash
ls models
```

Required:

```text
tfidf_vectorizer.pkl
tfidf_matrix.pkl
content_data.pkl
```

---

### `No module named src`

Make sure you start Uvicorn from:

```text
CinePlan/ml/
```

Correct:

```bash
cd CinePlan/ml
uvicorn src.api.main:app --reload
```

Do not start it from `ml/src/`.

---

### Node cannot connect to FastAPI

Check:

```text
http://127.0.0.1:8000/
```

If FastAPI is running, verify that the Node recommendation service points to:

```text
http://127.0.0.1:8000
```

---

### Recommendations return an empty array

Current V1 requires history.

The Node controller only uses:

```text
watching
completed
```

If the user has only:

```text
planned
```

items, the ML service receives no useful history and currently returns:

```json
[]
```

This is expected V1 behavior.

---

## 19. Git Rules

Do not commit:

```text
venv/
.env
```

The existing model artifacts are required by the application:

```text
models/
├── tfidf_vectorizer.pkl
├── tfidf_matrix.pkl
└── content_data.pkl
```

If the team stores these artifacts in Git, they must remain available after cloning.

---

## 20. Quick Setup Checklist

```text
[ ] Clone repository
[ ] cd ml
[ ] Create venv
[ ] Activate venv
[ ] Install requirements
[ ] Create ml/.env if required
[ ] Confirm model .pkl files exist
[ ] Test Recommender import
[ ] Start Uvicorn
[ ] Test /
[ ] Test /docs
[ ] Test POST /recommend
[ ] Start Node backend
[ ] Test GET /api/recommendations
```

---

## 21. API Contract

### FastAPI ML API

```http
POST /recommend
```

Request:

```json
{
  "user_history": [1084242, 82976, 33238, 275102],
  "top_n": 10
}
```

Response:

```json
{
  "recommendations": [
    {
      "content_id": 150540,
      "title": "Inside Out",
      "type": "movie",
      "genres": "Animation|Family|Adventure|Drama|Comedy",
      "final_score": 0.627
    }
  ]
}
```

### Node API

```http
GET /api/recommendations
```

Authentication:

```text
Authorization: Bearer <JWT>
```

The React frontend consumes this Node endpoint.

---

## 22. Important Architecture Rule

Responsibilities:

```text
TMDB
  ↓
Data acquisition

Python ML
  ↓
Feature engineering + recommendation

FastAPI
  ↓
Expose ML model

Node.js
  ↓
Authentication + MongoDB + ML integration

React
  ↓
Display recommendations
```

Keep recommendation logic inside:

```text
ml/src/models/recommender.py
```

FastAPI is the API interface to that model.

---

## 23. Final Local Architecture

```text
                    ┌───────────────┐
                    │   TMDB API    │
                    └───────┬───────┘
                            |
                            v
                    ┌───────────────┐
                    │ Python ML     │
                    │ Dataset/Model │
                    └───────┬───────┘
                            |
                            v
                    ┌───────────────┐
                    │ FastAPI       │
                    │ :8000         │
                    └───────┬───────┘
                            ^
                            | Axios
                            |
                    ┌───────┴───────┐
                    │ Node / Express│
                    │ MongoDB       │
                    └───────┬───────┘
                            ^
                            |
                    ┌───────┴───────┐
                    │ React Frontend│
                    └───────────────┘
```

For normal development, the teammate only needs to set up the Python environment, make sure the existing model artifacts are present, start FastAPI on port `8000`, and start the Node backend.
