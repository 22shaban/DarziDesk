# DarziDesk

DarziDesk is a production-quality desktop-first Tailor Shop Management System foundation for small men's tailoring businesses.

This repository currently contains only the project foundation:
- Frontend shell (React + Vite + Bootstrap)
- Backend API skeleton (Flask REST style)
- AWS and scripting placeholders
- Docker placeholders
- Environment variable examples

No business features, CRUD modules, or data operations are implemented.

## Technology Stack

### Frontend
- React + Vite
- Bootstrap 5
- React Router
- Axios
- React Icons

### Backend
- Python Flask
- Flask REST API style routing
- Boto3

### Database
- Designed for Amazon DynamoDB (design only, no database operations implemented)

## Folder Structure

```text
DarziDesk/
	frontend/
		src/
			components/
			layouts/
			pages/
	backend/
		config/
		routes/
		services/
		models/
		utils/
	docs/
	aws/
	scripts/
	Dockerfile.frontend
	Dockerfile.backend
	docker-compose.yml
	.env.example
```

Detailed structure notes are in `docs/FOLDER_STRUCTURE.md`.

## Backend Foundation

- Entry point: `backend/app.py`
- Health endpoint: `GET /health`
- Configuration placeholders: `backend/config/settings.py`
- Environment sample: `backend/.env.example`

## Frontend Foundation

- Vite app in `frontend/`
- App shell with:
	- Collapsible sidebar placeholder
	- Top navbar placeholder
	- Login placeholder page
	- Dashboard placeholder page

## Setup

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## Docker Placeholders

- `Dockerfile.frontend`
- `Dockerfile.backend`
- `docker-compose.yml`

These are starter placeholders and can be refined for production CI/CD workflows.
