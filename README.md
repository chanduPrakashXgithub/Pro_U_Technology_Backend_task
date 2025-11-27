# ProU Task Management API

Simple Task Management backend (Employees ↔ Tasks) built with Node.js, Express and MongoDB (Mongoose).

**Tech stack:** Node.js, Express, MongoDB (Mongoose), JWT, bcrypt, express-validator

**Quick setup**

- Copy `.env` and set `MONGODB_URI`, `JWT_SECRET`, `PORT` as needed.
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


**API Endpoints**

- POST /employees
  - Create employee (public)
  - Body: `{ name, role, email, password }`
  - Response: `201 { employee, token }`

- GET /employees
  - List employees (protected)
  - Header: `Authorization: Bearer <token>`

- POST /employees/login
  - Login: `{ email, password }` -> returns `{ token }`

- POST /tasks
  - Create task (protected)
  - Header: `Authorization: Bearer <token>`
  - Body: `{ title, description?, status?, assignee?, dueDate? }`

- PUT /tasks/:id
  - Update task (protected)

- GET /tasks
  - List tasks (public)
  - Optional query: `?status=In%20Progress` or `?assignee=<employeeId>`

- GET /tasks/:id
  - Get single task (public)

- DELETE /tasks/:id
  - Delete task (protected)


**Notes / Assumptions**

- Employees have a password and can authenticate using JWT (bonus requirement implemented).
- Protected routes require `Authorization: Bearer <token>`.
- The `assignee` field of a task is an Employee `_id` reference.
- `data/sample-data.json` contains sample employees and tasks and can be seeded with `npm run seed`.

**Files of interest**

- `server.js` - app entry
- `routes/` - route definitions
- `controllers/` - route handlers
- `models/` - Mongoose schemas
- `scripts/seed.js` - sample-data seeder

**Next steps / Improvements (optional)**

- Add tests (Mocha/Jest) and Postman collection (already included in `/postman`).
- Add pagination and sorting to list endpoints.
- Add role-based access control.

