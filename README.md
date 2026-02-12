# SmartTalk – Real-Time Chat Application

SmartTalk is a full-stack real-time chat web application built using the MERN stack.  
It supports personal chat, group chat with admin controls, real-time messaging using Socket.io, image uploads via Cloudinary, and secure authentication using JWT.

---

## Live Demo

🔗 **Frontend (Vercel):**  
https://smart-talk-chat.vercel.app

⚙ **Backend (Render):**  
https://smarttalk-backend-xgi1.onrender.com

---

## Tech Stack

### 🔹 Frontend
- React (Vite)
- Tailwind CSS : v3.4.17
- DaisyUI : v4.12.14
- Zustand (State Management) : v5.0.11
- Axios : v1.13.5
- React Router : v7.13.0
- Socket.io Client : v4.8.3
- Lucide Icons : v0.563.0

### 🔹 Backend
- Node.js : v20.19.5
- Express.js : v5.2.1
- MongoDB (Mongoose) : v9.2.0
- Socket.io : v4.8.3
- JWT Authentication : v9.0.3
- Cloudinary (Image Storage) : v1.41.3
- Cookie Parser : v1.4.7
- CORS : v2.8.6

---

## Features

### Authentication
- User Signup
- User Login
- JWT stored in HTTP-only cookie
- Auto authentication check
- Logout functionality

### Personal Chat
- Real-time 1v1 chat
- Image sharing
- Online/Offline status
- Message history saved in MongoDB
- Timestamp for each message

### Group Chat
- Create group
- Admin-based system
- Add members
- Remove members
- Rename group
- Delete group
- Real-time group messaging
- Only members can send/view messages

### Real-Time System
- Instant message updates using Socket.io
- Online users tracking
- Live group broadcasting

---

## 📂 Project Structure

```
SmartTalk/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── config/
│   └── lib/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
```

---

# Local Setup Guide

---

## 🖥 Backend Setup

### 1️⃣ Go to backend folder

```bash
cd backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env` file inside backend folder

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
```

### 4️⃣ Start backend server

```bash
npm run dev or node server.js
```

Backend runs at:
```
http://localhost:5000
```

---

## 💻 Frontend Setup

### 1️⃣ Go to frontend folder

```bash
cd frontend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env` file inside frontend folder

```
VITE_BACKEND_URL=http://localhost:5000
```

### 4️⃣ Start frontend

```bash
npm run dev
```

Frontend runs at:
```
http://localhost:5173
```

---

# Production Deployment

---

##  Backend Deployment (Render)

### Steps:
1. Push backend to GitHub
2. Create new Web Service on Render
3. Build Command:
```
npm install
```
4. Start Command:
```
node server.js
```

### Environment Variables (Render Dashboard)

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=https://your-frontend-name.vercel.app
```

---

## Frontend Deployment (Vercel)

### Steps:
1. Push frontend to GitHub
2. Import project in Vercel
3. Set Root Directory to:
```
frontend
```
4. Add Environment Variable in Vercel:

```
VITE_BACKEND_URL=https://your-backend-name.onrender.com
```

---

# API Endpoints

## Authentication

```
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/check
```

## Personal Messages

```
GET    /api/messages/users
GET    /api/messages/:id
POST   /api/messages/send/:id
```

## Groups

```
POST   /api/groups/create
GET    /api/groups
POST   /api/groups/send/:groupId
GET    /api/groups/messages/:groupId
POST   /api/groups/add-member
POST   /api/groups/remove-member
POST   /api/groups/rename
POST   /api/groups/delete
```

---

# Authentication Flow

- JWT generated on login/signup
- Stored in HTTP-only cookie
- Cookie valid for 7 days
- Protected routes using middleware
- Cross-origin cookie enabled using:
  - `sameSite: "none"`
  - `secure: true` in production

---

# Author

**Satyam Jain**  
MCA Student  
Full Stack MERN Developer 
