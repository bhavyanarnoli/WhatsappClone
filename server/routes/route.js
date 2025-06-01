import express from 'express';
import { addUser } from '../controller/user-controller.js';

const router = express.Router();

router.post('/add', (req, res, next) => {
  console.log("Raw request body:", req.body);
  next();
}, addUser);

export default router;