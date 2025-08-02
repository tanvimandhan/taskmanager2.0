# Task Management System

A full-stack task management system built using **React**, **Node.js (Express)**, **MongoDB**, and **JWT**. 
It allows users to register, log in, manage tasks with attributes like title, status, priority, due date, and attached documents.
Admin and user roles are supported, with proper route protection and authentication.

## Features

- ✅ User Registration & Login
- ✅ JWT-based Authentication
- ✅ Role-based Access Control (Admin/User)
- ✅ Create, Read, Delete Tasks
- ✅ File Uploads (PDF only, max 3 documents)
- ✅ Task Fields: Title, Description, Status, Priority, Due Date, Assigned To, Documents
- ✅ Responsive UI with Tailwind CSS
- ✅ Protected Routes using Middleware
- ✅ Toast notifications for alerts/errors

---

## Tech Stack

**Frontend**:  
- React.js  
- React Router  
- Tailwind CSS  
- Axios
- Shadcn  

**Backend**:  
- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- JWT (jsonwebtoken)  
- bcryptjs  
- Multer (for document uploads)  


## Project Structure

task-management-system/
├── React frontend
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── context/
│ └── App.jsx
├── Express backend
│ ├── models/ # User.js, Task.js
│ ├── routes/ # auth.js, tasks.js
│ ├── middleware/ # auth.js
│ ├── uploads/ # uploaded PDF documents
│ ├── server.js
│ └── .env


---

## 💻 Running the Project Locally

Follow these steps to run the full project (frontend + backend) on your own system:

---

### 1. **Clone the Repository**
git clone https://github.com/yourusername/task-management-system.git
cd task-management-system

2.Backend setup

cd server
npm install

Create a .env file inside server/ directory:

PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

If you don’t have a MongoDB URI, you can create a free cluster on MongoDB and get it.

Then start the backend server:

node server.js

3. Frontend Setup

Open a new terminal:

cd client
npm install
npm run dev

The frontend will usually be available at: http://localhost:5173
The backend will run at: http://localhost:8000

