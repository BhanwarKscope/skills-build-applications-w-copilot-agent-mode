import mongoose from 'mongoose';

export const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

export const connectDatabase = async () => {
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB at', mongoUri);
};

export const disconnectDatabase = async () => {
  await mongoose.disconnect();
};