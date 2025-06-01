import mongoose from 'mongoose';

const URL = "mongodb+srv://kushal:IXyj9IztXHBxca9G@cluster0.ceahnud.mongodb.net/whatsapp_data_contacts?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(URL, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4,
      maxPoolSize: 20 
    });
    
    console.log("MongoDB Connected!");
    console.log("Connection state:", mongoose.connection.readyState);

  } catch (error) {
    console.error("Detailed Connection Error:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
      fullError: JSON.stringify(error, null, 2)
    });
    process.exit(1);
  }
};

export default connectDB;