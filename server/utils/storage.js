import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';
import path from 'path';

let storageInstance = null;
let bucketInstance = null;

const createStorage = () => {
  bucketInstance = new GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads'
  });

  return {
    _handleFile: (req, file, cb) => {
      try {
        const fileId = new mongoose.mongo.ObjectId();
        const filename = `${fileId.toString()}${path.extname(file.originalname)}`;
        
        const uploadStream = bucketInstance.openUploadStream(filename, {
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
              filename,
              size: uploadStream.length,
              mimetype: file.mimetype
            });
          });
      } catch (err) {
        cb(err);
      }
    },
    _removeFile: (req, file, cb) => {
      bucketInstance.delete(file.id, cb);
    }
  };
};

export const initializeStorage = async () => {
  if (storageInstance) return storageInstance;

  if (mongoose.connection.readyState !== 1) {
    await new Promise(resolve => {
      mongoose.connection.once('connected', resolve);
    });
  }

  storageInstance = createStorage();
  return storageInstance;
};

export const getStorage = () => {
  if (!storageInstance) {
    throw new Error('Storage not initialized. Call initializeStorage() first.');
  }
  return storageInstance;
};

export const getBucket = () => {
  if (!bucketInstance) {
    throw new Error('Bucket not initialized. Call initializeStorage() first.');
  }
  return bucketInstance;
};