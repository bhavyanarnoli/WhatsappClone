import express from 'express';
import { addUser, getUsers } from '../controller/user-controller.js';
import { newConversation, getConversation } from '../controller/conversation-controller.js';
import { getMessages, newMessage } from '../controller/message-controller.js';
import mongoose from 'mongoose';
import multer from 'multer';    
import {initializeStorage, getStorage} from '../utils/storage.js';

const router = express.Router();

router.post('/add', addUser);
router.get('/users', getUsers);

router.post('/conversation/add', newConversation);
router.post('/conversation/get', getConversation);

router.post('/messages/add', newMessage);
router.post('/messages/get/:id', getMessages);


mongoose.set('strictQuery', false);



// Initialize upload system variables
let uploadMiddleware = null;
let isUploadReady = false;

// Initialize the upload system
export const initUploadSystem = async () => {
  try {
    console.log('⏳ Initializing upload system...');
    
    await initializeStorage();
    const storage = getStorage();
    
    uploadMiddleware = multer({
      storage,
      limits: {
        fileSize: 25 * 1024 * 1024, 
        files: 1
      }
    }).single('file');

    isUploadReady = true;
    console.log('✅ Upload system ready');
    return uploadMiddleware;
  } catch (err) {
    console.error('❌ Upload system initialization failed:', err);
    throw err;
  }
};


router.get('/upload-health', (req, res) => {
  res.json({
    ready: isUploadReady,
    dbState: mongoose.connection.readyState,
    timestamp: new Date()
  });
});

// File upload endpoint
router.post('/file/upload', async (req, res) => {
  if (!isUploadReady) {
    try {
      await initUploadSystem();
    } catch (err) {
      return res.status(503).json({
        success: false,
        error: 'Upload system initialization failed',
        details: err.message
      });
    }
  }
  
  uploadMiddleware(req, res, (err) => {
    if (err) {
      console.error('Upload error:', err);
      const status = err.code === 'LIMIT_FILE_SIZE' ? 413 : 400;
      return res.status(status).json({
        success: false,
        error: err.message
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file received'
      });
    }
    console.log('File uploaded successfully:', req.file);
    res.json({
      success: true,
      fileId: req.file.id,
      filename: req.file.filename
    });
  });
});



export default router;