import mongoose from "mongoose";

// Connect to the MongoDB database
mongoose.connect(process.env.MONGO_URL);

// Settings
mongoose.Promise = global.Promise;

// Create schema
const VehicleSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  price: Number,
  color: String,
  mileage: Number,
  fuelType: String,
  transmission: String,
  condition: String,
  imageUrl: String,
});

// Create model
// For performance reasons, instead of creating a new model on every import, 
// first check if the Vehicle model already exists among existing models. 
// If it exists, export it; otherwise, create a new one and export it.
const Vehicle =
  mongoose.models?.Vehicle || mongoose.model("Vehicle", VehicleSchema);

export default Vehicle;
