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
export const getFile = async (filename) => {
  if (!bucketInstance) {
    await initializeStorage();
  }
  
  // Decode the filename to handle special characters
  const decodedFilename = decodeURIComponent(filename);
  
  const files = await bucketInstance.find({ filename: decodedFilename }).toArray();
  if (!files || files.length === 0) {
    return null;
  }
  return files[0];
};

export const getFileStream = (filename) => {
  if (!bucketInstance) {
    throw new Error('Bucket not initialized. Call initializeStorage() first.');
  }
  // Decode the filename to handle special characters
  const decodedFilename = decodeURIComponent(filename);
  return bucketInstance.openDownloadStreamByName(decodedFilename);
};

export const getImage = async (req, res) => {
  try {
    const filename = req.params.filename;
    const file = await getFile(filename);
    
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.set('Content-Type', file.metadata?.contentType || 'application/octet-stream');
    if (file.metadata?.originalName) {
      res.set('Content-Disposition', `inline; filename="${file.metadata.originalName}"`);
    }

    const readStream = getFileStream(filename);
    readStream.pipe(res);
  } catch (error) {
    console.error('Error retrieving file:', error);
    res.status(500).json({ message: 'Error retrieving file', error: error.message });
  }
};