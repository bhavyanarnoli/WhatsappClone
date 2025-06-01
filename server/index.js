import express from 'express';
import connectDB from './database/data.js';
import dotenv from 'dotenv';
import route from './routes/route.js';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB().then(() => {
  app.use('/', route); 
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Database connected successfully`);
  });
});