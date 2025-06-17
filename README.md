# Whatsapp Clone

A full-stack Whatsapp Clone application built with React.js (frontend) and Node.js/Express (backend), using MongoDB for data storage. This project demonstrates authentication, real-time chat features, and a modern UI.

## Features

- **Google Authentication:** Secure login using [@react-oauth/google](https://www.npmjs.com/package/@react-oauth/google).
- **User Management:** Displays all users except the currently logged-in user in the conversation list.
- **Real-time Messaging:** Send and receive messages instantly using Socket.io.
- **Material-UI Frontend:** Responsive and modern UI built with Material-UI.
- **RESTful API:** Backend API for user and message management.
- **MongoDB Integration:** Stores user and message data in a MongoDB database (`whatsapp_contacts`).
- **Session Handling:** Maintains user sessions after login.
- **Error Handling:** Handles API and authentication errors gracefully.
- **Code Structure:** Separated client and server codebases and sockets for maintainability.

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB running locally or accessible remotely

### Installation

1. **Clone the repository:**
  ```bash
  git clone https://github.com/bhavyanarnoli/WhatsappClone
  cd WhatsappClone
  ```

2. **Install dependencies:**
  - For the server:
    ```bash
    cd server
    npm install
    ```
  - For the client:
    ```bash
    cd ../client
    npm install
    ```

### Running the Application

1. **Start the backend server:**
  ```bash
  cd server
  npm start
  ```
  The server runs on [http://localhost:8000](http://localhost:8000).

2. **Start the frontend client:**
  ```bash
  cd client
  npm start
  ```
  The client runs on [http://localhost:3000](http://localhost:3000).

> **Note:** The frontend is configured to work only on `localhost:3000` and the backend on `localhost:8000`.

## Project Structure

```
WhatsappClone/
├── client/         # React frontend (Material-UI, Google Auth)
│   └── src/
│       ├── components/
│       ├── services/api.js   # Handles API requests (e.g., POST to /add)
│       └── ...
├── server/         # Node.js/Express backend
│   ├── controllers/
│   │   └── user-controller.js   # Handles user-related logic
│   ├── database/
│   │   └── data.js              # Connects to MongoDB (async/promise)
│   └── ...
└── README.md
```

## Additional Notes

- **API Endpoints:** Main endpoint for adding users: `POST /add` (handled in `api.js`).
- **Database Connection:** Managed asynchronously in `database/data.js`.
- **User Controller:** Handles user creation and retrieval in `controllers/user-controller.js`.
- **Authentication:** Only authenticated users can access chat features.
- **Extensibility:** Easily extendable for features like group chats, media sharing, etc.

## Credits

- Inspired by [Code for Interview's Youtube Tutorial](https://www.youtube.com/watch?v=95jrbQNlpzM&ab_channel=CodeforInterview).

---

Feel free to contribute or raise issues for improvements!
