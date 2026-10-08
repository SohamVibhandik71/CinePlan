# CinePlan ML Service — Run Instructions

From the project root:

```bash
cd ml
```

Create the virtual environment:

```bash
python -m venv venv
```

Activate it in Git Bash:

```bash
source venv/Scripts/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI service:

```bash
uvicorn src.api.main:app --reload
```

The ML service will run at:

```text
http://127.0.0.1:8000
```

Swagger API documentation:

```text
http://127.0.0.1:8000/docs
```
