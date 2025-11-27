# ProU Task Management API — Live Docs

This short reference documents the live deployment of the ProU Task Management API and provides quick interactive examples you can run immediately.

Base URL
- https://pro-u-technology-backend-task.onrender.com

Authentication
- Protected endpoints require a JWT in the `Authorization` header:
  - `Authorization: Bearer <JWT>`

Common response codes
- `200 OK` — successful GET/PUT
- `201 Created` — successful POST resource creation
- `204 No Content` — successful DELETE
- `400 Bad Request` — validation error (response includes `errors` array)
- `401 Unauthorized` — missing/invalid token for protected endpoints
- `404 Not Found` — resource not found

Endpoints & Quick Examples

1) Create employee (public)
-- URL: `POST /employees`
-- Body (JSON):
```
{
  "name": "Alice Smith",
  "role": "Developer",
  "email": "alice@example.com",
  "password": "password123"
}
```
-- curl:
```
curl -X POST "https://pro-u-technology-backend-task.onrender.com/employees" \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Smith","role":"Developer","email":"alice@example.com","password":"password123"}'
```
-- Response: `201` with `{ employee: {...}, token: "<JWT>" }`

2) Login (public)
-- URL: `POST /employees/login`
-- Body:
```
{ "email": "alice@example.com", "password": "password123" }
```
-- curl:
```
curl -X POST "https://pro-u-technology-backend-task.onrender.com/employees/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"password123"}'
```
-- Response: `200` `{ "token": "<JWT>" }`

3) List employees (protected)
-- URL: `GET /employees`
-- Header: `Authorization: Bearer <JWT>`
-- curl:
```
curl -X GET "https://pro-u-technology-backend-task.onrender.com/employees" \
  -H "Authorization: Bearer <JWT>"
```

4) Create task (protected)
-- URL: `POST /tasks`
-- Body:
```
{
  "title": "Implement API endpoints",
  "description": "Create endpoints and validation",
  "status": "Pending",
  "assignee": null,
  "dueDate": "2025-12-01T00:00:00.000Z"
}
```
-- curl:
```
curl -X POST "https://pro-u-technology-backend-task.onrender.com/tasks" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT>" \
  -d '{"title":"Implement API endpoints","description":"Create endpoints and validation","status":"Pending","assignee":null}'
```

5) List tasks (public) — optional filters
-- URL: `GET /tasks`
-- Examples:
  - All tasks: `GET /tasks`
  - By status: `GET /tasks?status=In%20Progress`
  - By assignee id: `GET /tasks?assignee=<employeeId>`
-- curl:
```
curl "https://pro-u-technology-backend-task.onrender.com/tasks?status=In%20Progress"
```

6) Get single task (public)
-- URL: `GET /tasks/:id`
-- curl:
```
curl "https://pro-u-technology-backend-task.onrender.com/tasks/<TASK_ID>"
```

7) Update task (protected)
-- URL: `PUT /tasks/:id`
-- Example body (partial update):
```
{ "status": "In Progress", "assignee": "<EMPLOYEE_ID>" }
```
-- curl:
```
curl -X PUT "https://pro-u-technology-backend-task.onrender.com/tasks/<TASK_ID>" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT>" \
  -d '{"status":"In Progress","assignee":"<EMPLOYEE_ID>"}'
```

8) Delete task (protected)
-- URL: `DELETE /tasks/:id`
-- curl:
```
curl -X DELETE "https://pro-u-technology-backend-task.onrender.com/tasks/<TASK_ID>" \
  -H "Authorization: Bearer <JWT>"
```
-- Response: `204 No Content` on success

Postman
- Import `postman/ProU-Task-API-samples.postman_collection.json` and set the environment variable `base_url` to `https://pro-u-technology-backend-task.onrender.com`.
- Run the requests in order: Create Employee → Login (stores token) → Create Task → List/Update/Delete.

Tips and troubleshooting
- If login returns `401`, verify credentials and that you are using the correct seeded user or created account.
- If you get connection errors, check the live URL in a browser and verify Render is up.
- For production/Render, do not expose `.env` or commit credentials. Use Render dashboard environment variables.

Contact / Next steps
- If you want, I can run a live smoke-test (create account → login → create task) and paste the exact request/response JSON here for inclusion in `README_LIVE.md`.
