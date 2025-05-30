import mongoose  from "mongoose";

const Connection = async () =>{
  const URL = 'mongodb://bhavyanarnoli:bhavya@ac-j7tmqvr-shard-00-00.m5acchs.mongodb.net:27017,ac-j7tmqvr-shard-00-01.m5acchs.mongodb.net:27017,ac-j7tmqvr-shard-00-02.m5acchs.mongodb.net:27017/?ssl=true&replicaSet=atlas-r5t9vs-shard-0&authSource=admin&retryWrites=true&w=majority&appName=clone-whatsapp';
    try{
        await mongoose.connect(URL);
        console.log('Database connected successfully');
    }
  catch (error) {
    console.log('Error while connecting to MongoDB', error.message);
  }

}

export default Connection;