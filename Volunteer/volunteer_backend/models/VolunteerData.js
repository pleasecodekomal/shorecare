import mongoose from 'mongoose';

const volunteerDataSchema = new mongoose.Schema({
  volunteerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VolunteerProfile',
    required: true,
    unique: true,
  },
  xp: { type: Number, default: 0 },
  totalCleanups: { type: Number, default: 0 },
  wallContributions: { type: Number, default: 0 },
  quizzesWon: { type: Number, default: 0 },

  skills: [String],
  badges: [String],

  feedback: [
    {
      comment: String,
      from: String,
      date: { type: Date, default: Date.now }
    }
  ]
}, { collection: 'volunteer_data', timestamps: true });

export default mongoose.model('VolunteerData', volunteerDataSchema);
