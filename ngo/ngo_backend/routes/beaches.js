import express from 'express';
import Beach from '../models/Beach.js';

const router = express.Router();

// ✅ GET all beaches
router.get('/', async (req, res) => {
  const beaches = await Beach.find({});
  res.json(beaches);
});

// ✅ POST new beach
router.post('/', async (req, res) => {
  const beach = new Beach(req.body);
  await beach.save();
  res.status(201).json(beach);
});

// ✅ PUT update beach by ID
router.put('/:id', async (req, res) => {
  const updated = await Beach.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// ✅ DELETE beach by ID
router.delete('/:id', async (req, res) => {
  await Beach.findByIdAndDelete(req.params.id);
  res.json({ message: 'Beach deleted' });
});

export default router;
