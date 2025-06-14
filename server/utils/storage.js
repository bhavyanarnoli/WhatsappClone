import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';
import crypto from 'crypto';
import path from 'path';
import { promisify } from 'util';

const randomBytes = promisify(crypto.randomBytes);
let bucket;
let isStorageReady = false;

const createStorage = () => {
  bucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads'
  });
  
  return {
    _handleFile: async (req, file, cb) => {
      try {
        const fileId = new mongoose.mongo.ObjectId();
        const filename = `${fileId.toString()}${path.extname(file.originalname)}`;
        
        const uploadStream = bucket.openUploadStream(filename, {
          _id: fileId,
          metadata: {
            originalName: file.originalname,
            contentType: file.mimetype,
            uploadDate: new Date()
          }
        });

        file.stream.pipe(uploadStream)
          .on('error', cb)
          .on('finish', () => {
            cb(null, {
              id: uploadStream.id,
              filename: filename,
              size: uploadStream.length,
              mimetype: file.mimetype
            });
          });
      } catch (err) {
        cb(err);
      }
    },
    _removeFile: (req, file, cb) => {
      bucket.delete(file.id, cb);
    }
  };
};

export const initializeStorage = async () => {
  if (isStorageReady) return bucket;

  try {
    if (mongoose.connection.readyState !== 1) {
      await new Promise(resolve => {
        mongoose.connection.once('connected', resolve);
      });
    }

    createStorage();
    isStorageReady = true;
    console.log('✅ Storage initialized successfully');
    return bucket;
  } catch (err) {
    console.error('❌ Storage initialization failed:', err);
    throw err;
  }
};

export const getStorage = () => {
  if (!isStorageReady) {
    throw new Error('Storage not initialized');
  }
  return bucket;
};