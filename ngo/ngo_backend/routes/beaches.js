import express from 'express';
import Beach from '../models/Beach.js';

const router = express.Router();

// ✅ GET all beaches
router.get('/', async (req, res) => {
  const beaches = await Beach.find({});
  res.json(beaches);
});

// ✅ POST new beach
// ✅ POST: add new beach or update existing beach by name
router.post('/', async (req, res) => {
  try {
    const { name, latitude, longitude, monthly_stats } = req.body;

    const updated = await Beach.findOneAndUpdate(
      { name: name },
      {
        name,
        latitude,
        longitude,
        $push: { monthly_stats: { $each: monthly_stats } }
      },
      { upsert: true, new: true }
    );

    res.status(201).json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).send('Invalid request');
  }
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
