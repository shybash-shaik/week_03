# ✅ User-Specific To-Do List API

A secure backend API built with **Express** and **JWT authentication** that supports:

- User registration and login  
- User-specific to-do list management  
- Password hashing with `bcrypt`  
- Admin-only routes via role-based access control  

> No database required – uses in-memory storage for simplicity.

---

## 🔧 Features

- ✅ **JWT Authentication** – Access token expires in **1 hour**
- 🔒 **Protected Routes** – All `/api/todos` endpoints require a valid Bearer token
- 🧍‍♂️ **User-Specific To-Dos** – Each user can only manage their own tasks
- 🛡️ **Role-Based Authorization** – Admins can access all to-dos
- 🔐 **Secure Passwords** – Stored with `bcrypt` hashing

---

## 🛠 Tech Stack

- Node.js
- Express.js
- bcrypt
- jsonwebtoken

---

## 📷 Screenshots

### 🟢 Easy – Auth & Protected Route

**User Register**  
![Register](https://github.com/user-attachments/assets/d88e6889-91b0-46d3-9038-709b65609567)

**User Login**  
![Login](https://github.com/user-attachments/assets/898100ee-1b87-4ff2-b7c4-fc6d3fc4a533)

**Protected Quote Route**  
![Secret Quote](https://github.com/user-attachments/assets/138b509e-cfa8-463d-bfd8-e302992f0b7c)

---

### 🟡 Medium – To-Do CRUD & Role Auth

**Add To-Do**  
![Add Todo](https://github.com/user-attachments/assets/286cf6a5-f718-4c9e-8269-a5742ee45523)

**Get To-Dos**  
![Get Todos](https://github.com/user-attachments/assets/1d1c360d-7563-4688-8029-14fe11a2d5ce)

**Delete To-Do**  
![Delete Todo](https://github.com/user-attachments/assets/30fdf910-a497-4d73-9113-8524b09eb300)

**Admin – View All To-Dos**  
![Admin Todos](https://github.com/user-attachments/assets/7cf6588c-4679-4c1e-9e9a-d13778eefd2f)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/shybash-shaik/week_03.git
cd week_03/secret-quote-api

2. Install Dependencies

npm install

3. Run the Server

npm start

API Endpoints

All /api routes require Authorization header:
Authorization: Bearer <accessToken>

🔸 Register a New User
POST /register

{
  "username": "shybash",
  "password": "shybash123"
}
(Optional admin user):

{
  "username": "admin",
  "password": "admin123",
  "role": "admin"
}
 Login
POST /login

{
  "username": "shybash",
  "password": "shybash123"
}
✔️ Response:

{
  "accessToken": "..."
}

✅ Create a To-Do

POST /api/todos
{
  "task": "Complete Node.js assignment"
}
📄 Get User’s To-Dos
GET /api/todos

✔️ Returns only the to-dos owned by the currently logged-in user.

❌ Delete a To-Do
DELETE /api/todos/:id

✔️ Only allows deletion if the to-do belongs to the logged-in user.

👑 Admin Only: View All To-Dos
GET /api/admin/all-todos

✔️ Only accessible to users with role: "admin"

🔒 How Access Control Works
When a user logs in, a JWT is issued containing: id, username, and role

Authentication middleware verifies the token and attaches data to req.user

/api/todos routes filter data based on req.user.id

Admin routes use authorizeAdmin middleware to allow only users with role: "admin"

 Example Test Data for To-Dos

{ "task": "Learn JWT auth" }
{ "task": "Buy groceries" }
{ "task": "Read middleware documentation" }
{ "task": "Deploy app to Render" }
{ "task": "Review pull requests" }
🧪 Testing with Postman
Register a user (/register)

Log in to receive a token (/login)

Include this in headers for protected routes:

Authorization: Bearer your.jwt.token.here
Access and test endpoints like:

POST /api/todos

GET /api/todos

DELETE /api/todos/:id

GET /api/admin/all-todos (admin only)
