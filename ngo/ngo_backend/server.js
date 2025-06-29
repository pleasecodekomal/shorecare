import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';


// Load .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

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
app.get('/api/beaches', async (req, res) => {
  const beaches = await Beach.find({});
  console.log('✅ Serving beaches:', beaches);
  res.json(beaches);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
