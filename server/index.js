import express from 'express';  
import Connection from './database/mongodb.js';
const app = express();
Connection();
const PORT = 8000;
// password: HDqpXdZcwvD7fzTs
app.listen(PORT, () => console.log(`Server is running sucessfully on port ${PORT}`));