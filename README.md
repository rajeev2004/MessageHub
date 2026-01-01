# MessageHub 💬  
A real-time chat application built with **React, Node.js, Socket.IO, and JWT authentication**.

MessageHub demonstrates how modern real-time systems work under the hood — from WebSocket connections and rooms to authentication, typing indicators, message persistence, and reconnect handling.

---

## 🚀 Features

- 🔐 **JWT Authentication**
  - User registration & login
  - Secure token-based access
- ⚡ **Real-time Messaging**
  - Instant chat using Socket.IO
  - Room-based conversations
- 👥 **Live User Presence**
  - Join / leave notifications
  - Active users list per room
- ✍️ **Typing Indicator**
  - Debounced typing events
- 🕓 **Message History**
  - New users receive previous messages on joining
- 🔄 **Reconnect-safe Architecture**
  - Clean socket lifecycle management
- 🧠 **Server-authoritative design**
  - Backend controls identity & room state

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Socket.IO Client
- React Router
- Axios
- CSS (custom styling)

### Backend
- Node.js
- Express
- Socket.IO
- PostgreSQL
- JWT (JSON Web Tokens)
- bcrypt
- dotenv

---

## **Setup Instructions**

1. Clone the repository:
   ```bash
   git clone https://github.com/rajeev2004/MessageHub.git
   cd MessageHub

### **Backend Setup**

1. Install dependencies:
   ```bash
   npm install

2. Create a .env file and add the following environment variables: 
    ```bash
    DATABASE_URL=your_database_url
    JWT_SECRET=your_secret_key

4. Start the backend server (ensure the database is set up):
    ```bash
    node server.js

### **Frontend Setup**

1. Install dependencies:
    ```bash
    npm install

2. Configure the backend URL in the frontend code.
    ```bash
    backend=http://localhost:3000

4. Start the frontend development server:
    ```bash
    npm run dev

5. Access the application at http://localhost:5173

## Demo

You can check out the live website [here](https://rajeev2004.github.io/MessageHub/).

![MessageHub Screenshot](https://raw.githubusercontent.com/rajeev2004/MessageHub/refs/heads/main/frontend/src/assets/Screenshot%202026-01-01%20171536.png?raw=true)


