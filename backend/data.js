import mongoose from 'mongoose';

const { Schema } = mongoose;

// this will be our data base's data structure
const DataSchema = new Schema(
  {
    id: Number,
    message: String,
  },
  { timestamps: true },
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Data', DataSchema);
