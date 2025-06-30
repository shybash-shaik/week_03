#  User-Specific To-Do List API

A secure backend API built with **Express** and **JWT authentication** that supports:

-  User registration and login  
-  User-specific to-do list management  
-  Password hashing with `bcrypt`  
-  Admin-only routes via role-based access control  

>  No database required – uses in-memory storage for simplicity.

---

##  Features

- ✅ **JWT Authentication**  
  - Access token expires in **1 hour**
-  **Protected Routes**  
  - All `/api/todos` endpoints require a valid Bearer token
-  **User-Specific Todos**  
  - Each user can only manage their own tasks
-  **Role-Based Authorization**  
  - Admins can access all todos
-  **Secure Passwords**  
  - Stored with `bcrypt` hashing

---

## Tech Stack

- Node.js
- Express.js
- bcrypt
- jsonwebtoken

---

##  Difficulty

**Easy**
User Register

![Screenshot 2025-06-30 074546](https://github.com/user-attachments/assets/d88e6889-91b0-46d3-9038-709b65609567)

User Login

![Screenshot 2025-06-30 074939](https://github.com/user-attachments/assets/898100ee-1b87-4ff2-b7c4-fc6d3fc4a533)

Protected Route

![Screenshot 2025-06-30 082146](https://github.com/user-attachments/assets/138b509e-cfa8-463d-bfd8-e302992f0b7c)

##  Difficulty

**Medium**

Add To-Do

![Screenshot 2025-06-30 082431](https://github.com/user-attachments/assets/286cf6a5-f718-4c9e-8269-a5742ee45523)

Get todos


![Screenshot 2025-06-30 082557](https://github.com/user-attachments/assets/1d1c360d-7563-4688-8029-14fe11a2d5ce)

Delete todo

![image](https://github.com/user-attachments/assets/30fdf910-a497-4d73-9113-8524b09eb300)

Role-Based Authorization

![image](https://github.com/user-attachments/assets/7cf6588c-4679-4c1e-9e9a-d13778eefd2f)



##  Getting Started

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/todo-api.git](https://github.com/shybash-shaik/week_03/edit/main/secret-quote-api/)
cd secret-quote-api

2. Install Dependencies
npm install

3. Run the Server

npm start

 API Endpoints
 All /api routes require Authorization header:
Authorization: Bearer <accessToken>

 Register a New User
POST /register
{
  "username": "user1",
  "password": "pass123"
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
  "username": "user1",
  "password": "pass123"
}
✔️ Response:
{
  "accessToken": "..."
}

 Create a To-Do
POST /api/todos

{
  "task": "Complete Node.js assignment"
}
 Get User’s To-Dos
GET /api/todos

✔️ Returns to-dos owned by the logged-in user.

 Delete a To-Do
DELETE /api/todos/:id

✔️ Only allows deletion if the to-do belongs to the user.

 Admin Only: View All To-Dos
GET /api/admin/all-todos

✔️ Only accessible to users with role: "admin"

 How We Ensure Data Access Control
When a user logs in, we issue a JWT containing their id, username, and role.

Middleware verifies the token and attaches the user data to req.user.

Every /api/todos route filters or checks using req.user.id.

Admin routes use an additional authorizeAdmin middleware to verify the user’s role.

 Example Test Data for To-Dos

{ "task": "Learn JWT auth" }
{ "task": "Buy groceries" }
{ "task": "Read middleware documentation" }
{ "task": "Deploy app to Render" }
{ "task": "Review pull requests" }
 How to Test with Postman
Register and login to receive an accessToken

For protected routes, include this in headers:

Authorization: Bearer your.jwt.token.here
Try creating, fetching, and deleting your own to-dos.

Register a user with "role": "admin" and access /api/admin/all-todos

