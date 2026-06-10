# DGTA Academic Management — Web Frontend

React frontend for the DGTA academic management platform. Provides role-based portals for students and teachers, consuming the [DGTA API](https://github.com/JiovannyVega/api-dgeta).

## Features by role

**Students** (`src/pages/estudiante/`)
- Dashboard with academic overview
- Grades (calificaciones) and attendance (asistencias) consultation
- Questionnaire/form filling and submission tracking
- Internal messaging with teachers
- Profile management

**Teachers** (`src/pages/profesor/`)
- Tutoring (tutorías) management
- Group and student tracking

**Shared**
- Authentication (login/register) with protected routes
- Profile page

## Tech stack

| Concern | Implementation |
| --- | --- |
| UI | React 19 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Routing | React Router DOM |
| Icons | Lucide React · React Icons |

## Getting started

```bash
npm install
npm run dev
```

Configure the API base URL in `src/config/` to point to your running instance of [`api-dgeta`](https://github.com/JiovannyVega/api-dgeta).

---

Part of a three-repo system: [REST API](https://github.com/JiovannyVega/api-dgeta) · [GraphQL API](https://github.com/JiovannyVega/dgeta-graph-api) · Web frontend (this repo).
