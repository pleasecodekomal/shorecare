import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  name: String,
  date: String,
  impact: String
});

const MonthlyStatsSchema = new mongoose.Schema({
  month: String,
  waste_kg: Number,
  tourists: Number,
  events: [EventSchema],
  beach_score: Number
});

const BeachSchema = new mongoose.Schema({
  name: { type: String, required: true },
  latitude: Number,
  longitude: Number,
  monthly_stats: [MonthlyStatsSchema]
});

export default mongoose.model('Beach', BeachSchema);
