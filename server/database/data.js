// import mongoose from 'mongoose';

// const URL = "mongodb+srv://kushal:IXyj9IztXHBxca9G@cluster0.ceahnud.mongodb.net/whatsapp_data_contacts?retryWrites=true&w=majority";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(URL, {
//       serverSelectionTimeoutMS: 10000,
//       socketTimeoutMS: 45000,
//       family: 4,
//       maxPoolSize: 20 
//     });
    
//     console.log("MongoDB Connected!");
//     console.log("Connection state:", mongoose.connection.readyState);

//   } catch (error) {
//     console.error("Detailed Connection Error:", {
//       name: error.name,
//       message: error.message,
//       stack: error.stack,
//       fullError: JSON.stringify(error, null, 2)
//     });
//     process.exit(1);
//   }
// };

// export default connectDB;
import mongoose from 'mongoose';

const URL = "mongodb+srv://kushal:IXyj9IztXHBxca9G@cluster0.ceahnud.mongodb.net/whatsapp_data_contacts?retryWrites=true&w=majority";

let gfs;
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return gfs;

  try {
    // Close any existing connections
    await mongoose.disconnect();

    // Configure connection with robust timeout settings
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 15000, // Increased timeout
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      family: 4, // Use IPv4
      maxPoolSize: 10,
      retryWrites: true,
      w: 'majority',
      retryReads: true
    };

    // Add debug logging for development
    if (process.env.NODE_ENV === 'development') {
      mongoose.set('debug', true);
    }

    await mongoose.connect(URL, options);
    console.log("MongoDB Connected!");
    isConnected = true;

    // Initialize GridFS
    gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "uploads",
      chunkSizeBytes: 261120
    });

    // Connection event handlers
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to DB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
      isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected');
      isConnected = false;
    });

    return gfs;

  } catch (error) {
    console.error("MongoDB Connection Error:", {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    // Implement exponential backoff for reconnection
    const retryAfter = 5000; // 5 seconds
    console.log(`Retrying connection in ${retryAfter/1000} seconds...`);
    await new Promise(resolve => setTimeout(resolve, retryAfter));
    return connectDB(); // Recursive retry
  }
};

export { connectDB, gfs };