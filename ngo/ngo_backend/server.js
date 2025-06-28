import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// ✅ Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Import beaches routes (ESM)
import beachRoutes from './routes/beaches.js';

app.use('/api/beaches', beachRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
