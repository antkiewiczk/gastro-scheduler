import mongoose from 'mongoose';

const { Schema } = mongoose;

// this will be our data base's data structure
const StaffSchema = new Schema(
  {
    id: Number,
    fullName: String,
    position: String,
    schedule: Object,
  },
  { timestamps: true },
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Staff', StaffSchema);
