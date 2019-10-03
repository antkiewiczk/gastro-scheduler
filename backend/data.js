import mongoose from 'mongoose';

const { Schema } = mongoose;

// this will be our data base's data structure
const StaffSchema = new Schema(
  {
    id: Number,
    fullName: String,
    position: String,
    schedule: Object,
    hourlyRate: Number,
  },
  { timestamps: true },
);

const OrganisationSchema = new Schema(
  {
    name: String,
    city: String,
    operatingHours: Array,
    ownerFullName: String,
  },
  { timestamps: true },
);

const Staff = mongoose.model('Staff', StaffSchema);
const Organisation = mongoose.model('Organisation', OrganisationSchema);

export { Staff, Organisation };
