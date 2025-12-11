
# Polling App – MERN Stack

A full-stack polling/voting application built with React (Vite), Node.js, Express, and MongoDB, featuring:

🔐 JWT authentication (HTTP-only cookies).

👨‍💻 Admin role: create, edit, delete polls.

👥 User role: vote in polls.

📈 Live poll results using Chart.js.

🔒 Protected routes (frontend + backend).

🗳 Real-time vote updates.

🎨 Beautiful responsive UI.

# Features
**Admin**

Create new polls.

Add multiple options.

View all polls.

Delete polls.

View detailed poll results.

**User**

Sign up / Login.

View available polls.

Vote (only once per poll).

See results instantly.

**Backend**

Express REST API.

JWT authentication using HTTP-only cookie.

Role-based access (admin/user).

MongoDB models for Users, Polls, Votes.

**Frontend**

React + Vite.

React Router.

Axios with credentials.

Chart.js for visualization.

**Tech Stack**

Frontend:

React (Vite).

React Router DOM.

Axios.

Chart.js.

Backend:

Node.js.

Express.

MongoDB + Mongoose.

JWT + bcrypt.

CORS with cookies enabled.

**Database**

MongoDB with Mongoose.

``` 
root/
 ├── client/               # React frontend
 │   ├── src/
 │   │   ├── components/
 │   │   ├── pages/
 │   │   ├── App.jsx
 │   │   └── main.jsx
 │   └── package.json
 │
 ├── server/               # Backend
 │   ├── controllers/
 │   ├── middleware/
 │   ├── models/
 │   ├── routes/
 │   ├── index.js
 │   └── package.json
 │
 └── README.md
```

## Installation & Setup

**Backend Setup**

1️⃣ Go to backend folder
```
cd server
```

2️⃣ Install dependencies
```
npm install
```

3️⃣ Create .env file
```
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
PORT=5000
```

4️⃣ Start backend
```
npm run dev
```
**Frontend Setup**

1️⃣ Go to frontend folder
```
cd client
```

2️⃣ Install dependencies
```
npm install
```

3️⃣ Start frontend
```
npm run dev
```

# Authentication Flow

User signs up / logs in.

Server returns JWT inside HTTP-only cookie.

Middleware verifies token.

Role-based routes protect admin pages.

# Recordings
[Working Video click me](https://drive.google.com/drive/folders/1hMFwOrDrYZ_D2ghfaJy21FszLS_jOe-G?usp=sharing)

# Deployement

https://github.com/Abhishek07git/Poll-and-Voting-App.git