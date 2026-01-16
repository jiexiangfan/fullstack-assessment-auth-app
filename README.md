# fullstack-assessment-auth-app

This project is a simple authentication application for assignment purposes.

---

## Tech Stack

### Backend

- Node.js + TypeScript
- Express
- JWT
- Database: In memory user repo (local)

### Frontend

- React + TypeScript

---

## Features implemented

- User sign-up
- User sign-in
- Protected profile endpoint
- Client-side logout
- Form validation

---

## Running the Application

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on:
http://0.0.0.0:8080

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
http://localhost:5173

---

## API Endpoints (Backend)

### Authentication

- POST /api/auth/signup
- POST /api/auth/signin
- POST /api/auth/signout (stateless, client-side)

### Protected

- GET /api/me (requires Bearer token)
