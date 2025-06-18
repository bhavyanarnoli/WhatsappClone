# Whatsapp Clone
A full-stack Whatsapp Clone application built with React.js (frontend) and Node.js/Express (backend), using MongoDB for data storage. This project demonstrates authentication, real-time chat features, and a modern UI.

## Features

- **Google Authentication:** Secure login using [@react-oauth/google](https://www.npmjs.com/package/@react-oauth/google).
- **User Management:** Displays all users except the currently logged-in user in the conversation list.
- **Real-time Messaging:** Send and receive messages instantly using Socket.io.
- **Dedicated Socket Server:** Real-time communication is handled by a separate `socket` directory.  
- **Material-UI Frontend:** Responsive and modern UI built with Material-UI.
- **RESTful API:** Backend API for user and message management.
- **MongoDB Integration:** Stores user and message data in a MongoDB database (`whatsapp_contacts`).
- **Session Handling:** Maintains user sessions after login.
- **Error Handling:** Handles API and authentication errors gracefully.
- **Code Structure:** Separated client, server, and socket codebases for maintainability.

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
    - For the socket server:
      ```bash
      cd ../socket
      npm install
      ```

  3. **Update dependencies (optional but recommended):**
    - To ensure all packages are up-to-date, run the following in each directory (`server`, `client`, `socket`):
      ```bash
      npm update
      ```

  4. **Active Users & Real-Time Status:**
    - The app now displays active users (online/offline) in real time using Socket.io.
    - User status updates instantly as users connect or disconnect.

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

**Note:** The frontend is configured to work only on `localhost:3000` and the backend on `localhost:8000`.

# WhatsApp Clone - Project Structure

```text
WhatsappClone/
├── client/                  # React frontend (Material-UI, Google Auth)
│   ├── public/              # Static assets and HTML template
│   └── src/                 # Application source code
│       ├── components/      # Reusable UI components
│       ├── services/
│       │   └── api.js       # Axios/Fetch API service (handles POST /add)
│       ├── App.js           # Root React component
│       └── ...              # Other React files (hooks, contexts, etc.)
├── server/                  # Node.js/Express backend
│   ├── controllers/
│   │   └── user-controller.js  # Business logic for user operations
│   ├── database/
│   │   └── data.js          # MongoDB connection (uses async/await)
│   ├── models/              # Mongoose schemas and models
│   ├── routes/              # Express route definitions
│   └── ...                  # Middleware, utilities, etc.
├── socket/                  # Real-time communication
│   ├── index.js             # Socket.io server configuration
│   └── ...                  # Socket event handlers
└── README.md                # Project documentation
```
## Additional Notes

- **API Endpoints:** The main endpoint for adding users is `POST /add`, managed in `client/services/api.js`.
- **Database Connection:** Asynchronous connection setup is handled in `server/database/data.js`.
- **User Controller:** User creation and retrieval logic is in `server/controllers/user-controller.js`.
- **Authentication:** Chat features are accessible only to authenticated users.
- **Real-Time Communication:** Socket.io is used for real-time messaging and status updates, managed in the `socket` directory.
- **Active Users:** The app tracks and displays online/offline users in real time using Socket.io events.
- **Extensibility:** The project structure allows for easy addition of features like group chats, media sharing, and more.

## Credits

- Inspired by [Code for Interview's Youtube Tutorial](https://www.youtube.com/watch?v=95jrbQNlpzM&ab_channel=CodeforInterview).

---

Feel free to contribute or raise issues for improvements!
