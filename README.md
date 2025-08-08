# Express.js API Starter Template

This is a minimal **API-first** Express.js starter template designed for building RESTful backends.  
It uses JSON responses only (no server-side rendering) and is structured for easy scaling.

---

## 📂 Project Structure

```
.
├── app.js              # Main Express app configuration
├── bin/
│   └── api             # Server entry point
├── package.json        # Project dependencies & scripts
├── public/             # Public static files (optional)
├── routes/
│   ├── index.js        # API health check route
│   └── users.js        # Example user routes
└── README.md           # Project documentation
```

---

## 🚀 Getting Started

### 1️⃣ Install dependencies
```bash
npm install
```

### 2️⃣ Run in development mode (with auto-reload)
```bash
npm run dev
```
> Requires `nodemon`. Install if missing:
```bash
npm install --save-dev nodemon
```

### 3️⃣ Run in production mode
```bash
npm start
```

---

## 🌐 API Endpoints

### **Health Check**
```
GET /api
```
**Response:**
```json
{
  "success": true,
  "message": "API is running 🚀"
}
```

---

### **Get All Users**
```
GET /api/users
```
**Response:**
```json
{
  "success": true,
  "data": [
    { "id": 1, "name": "Alice" },
    { "id": 2, "name": "Bob" }
  ]
}
```

---

### **Create a User**
```
POST /api/users
Content-Type: application/json

{
  "name": "Charlie"
}
```
**Response:**
```json
{
  "success": true,
  "message": "User created",
  "data": {
    "id": 1691498161000,
    "name": "Charlie"
  }
}
```

---

## ⚙️ Configuration

- **Port**: Default is `3000`. Change via environment variable:
```bash
PORT=4000 npm start
```

---

## 📦 Dependencies

- [express](https://www.npmjs.com/package/express) – Web framework
- [morgan](https://www.npmjs.com/package/morgan) – HTTP request logger
- [cookie-parser](https://www.npmjs.com/package/cookie-parser) – Parse cookies
- [dotenv](https://www.npmjs.com/package/dotenv) – Environment variable loader

**Dev Dependencies:**
- [nodemon](https://www.npmjs.com/package/nodemon) – Auto-restart server in development

---

## 📝 License
This project is provided as a template and has no specific license.  
Use freely for learning or starting new projects.
