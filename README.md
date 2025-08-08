# Server Template API

A simple Node.js Express REST API with Lowdb JSON database, ES modules, and essential middleware.

---

## Features

- **Express 4+** with ES module syntax (`import` / `export`)
- JSON file database using [Lowdb](https://github.com/typicode/lowdb)
- Environment variables via [dotenv](https://github.com/motdotla/dotenv)
- Input validation using [express-validator](https://express-validator.github.io/docs/)
- HTTP request logging with [morgan](https://github.com/expressjs/morgan)
- Centralized error handling middleware
- Health check endpoint at `/api`
- User API (`GET` and `POST` at `/api/users`)

---

## Prerequisites

- Node.js v14+ installed
- `npm` 

---

## Getting Started

1**Install dependencies**

```bash
npm install
```

3. **Create `.env` file**

```env
PORT=3000
```

4. **Create `db.json` file**

```json
{
  "users": []
}
```

5. **Run the server**

```bash
npm start
```

---

## API Endpoints

### Health Check

```http
GET /api
```
**Response:**
```json
{ "success": true, "message": "API is working" }
```

### Get Users

```http
GET /api/users
```

### Create User

```http
POST /api/users
Content-Type: application/json

{
  "name": "John Doe"
}
```

---

## Scripts

- `npm start` — Start the server
- `npm run dev` — Start with nodemon for development

---

## Project Structure

```
server_template/
│── bin/
│   ├── api  
│── controllers/
│   └── usersController.js
│── routes/
│   ├── dbViewer.js
│   ├── index.js
│   └── users.js
│── services/
│   ├── db.js
│   ├── db.json
│   └── usersService.js
│── middlewares/
│   └── errorHandler.js
│── middlewares/
│   └── errorHandler.js
│── app.js
│── .env
│── package.json
│── README.md
```

---

## License

MIT License
