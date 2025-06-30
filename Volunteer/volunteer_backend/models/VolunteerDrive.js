import mongoose from 'mongoose';

const driveSchema = new mongoose.Schema({
  volunteerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VolunteerProfile',
    required: true,
  },
  location: String,
  date: { type: Date, default: Date.now },
  wasteCollectedKg: Number,
  hoursVolunteered: Number
}, { collection: 'volunteer_drives', timestamps: true });

export default mongoose.model('VolunteerDrive', driveSchema);
