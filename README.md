# ProU Task Management API

Simple Task Management backend (Employees ↔ Tasks) built with Node.js, Express and MongoDB (Mongoose).

**Live demo:** https://pro-u-technology-backend-task.onrender.com

**Tech stack:** Node.js, Express, MongoDB (Mongoose), JWT, bcrypt, express-validator

**Quick setup (local)**

- Copy `.env.example` (or create `.env`) and set `MONGODB_URI`, `JWT_SECRET`, `PORT` as needed.
- Install dependencies:

```powershell
npm install
```

- Start development server:

```powershell
npm run dev
```

- Seed sample data (reads `data/sample-data.json`):

```powershell
npm run seed
```

**Important env note**: do not commit `.env`. Ensure `MONGODB_URI` has no surrounding quotes in the environment (Render/GitHub Secrets):

```text
# good
MONGODB_URI=mongodb+srv://user:pass@cluster0.../dbname

# avoid
MONGODB_URI="mongodb+srv://user:pass@..."
```

**API Endpoints**

- POST `/employees`
  - Create employee (public)
  - Body: `{ "name", "role", "email", "password" }`
  - Response: `201 { employee, token }`

- POST `/employees/login`
  - Login: `{ "email", "password" }` -> returns `{ "token" }`

- GET `/employees` (protected)
  - List employees
  - Header: `Authorization: Bearer <token>`

- POST `/tasks` (protected)
  - Create task
  - Body: `{ "title", "description"?, "status"?, "assignee"?, "dueDate"? }`

- PUT `/tasks/:id` (protected)
  - Update task (partial updates allowed)

- GET `/tasks` (public)
  - List tasks
  - Filters: `?status=In%20Progress` or `?assignee=<employeeId>`

- GET `/tasks/:id` (public)
  - Get a single task (populates `assignee`)

- DELETE `/tasks/:id` (protected)
  - Delete a task (returns `204` on success)

**Example requests (curl)
**

- Create employee:

```powershell
curl -X POST "https://pro-u-technology-backend-task.onrender.com/employees" -H "Content-Type: application/json" -d '{"name":"Alice","role":"Developer","email":"alice@example.com","password":"password123"}'
```

- Login:

```powershell
curl -X POST "https://pro-u-technology-backend-task.onrender.com/employees/login" -H "Content-Type: application/json" -d '{"email":"alice@example.com","password":"password123"}'
```

- Create task (replace `<JWT>`):

```powershell
curl -X POST "https://pro-u-technology-backend-task.onrender.com/tasks" -H "Content-Type: application/json" -H "Authorization: Bearer <JWT>" -d '{"title":"New task","description":"Do X","status":"Pending","assignee":null}'
```

**Postman**
- A sample Postman collection is included at `postman/ProU-Task-API-samples.postman_collection.json`. Import it and set `base_url` to the live URL or `http://localhost:5000` for local testing.

**Seeding production DB (optional)**
- To seed a remote DB (Atlas used by Render), run locally with `MONGODB_URI` set to the production connection string and then run:

```powershell
npm run seed
```

**Files of interest**

- `server.js` - app entry
- `routes/` - route definitions
- `controllers/` - route handlers
- `models/` - Mongoose schemas
- `scripts/seed.js` - sample-data seeder
- `postman/` - Postman collection for testing

**Assumptions & notes**

- Auth: endpoints requiring modification/creation use JWT; include `Authorization: Bearer <token>` header for protected routes.
- Allowed `status` values for tasks: `Pending`, `In Progress`, `Completed`, `Cancelled`.
- The `assignee` field stores an `Employee` `_id` reference.

If you want, I can update this README further with example responses (live IDs) after you confirm the seeded accounts or provide a sample token.


