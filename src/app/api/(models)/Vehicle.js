import mongoose from "mongoose";

// MongoDB veritabanına bağlan
mongoose.connect(process.env.MONGO_URL);

// Ayarlar
mongoose.Promise = global.Promise;

// Şema oluşturma
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

// Model oluştur
// Performans açısından her import'ta yeni model oluşturmamak için önce mevcut modellerin arasında Vehicle modeli var mı kontrol ediyor varsa onu export ediyor yoksa yenisini oluşturup export ediyor.
const Vehicle =
  mongoose.models?.Vehicle || mongoose.model("Vehicle", VehicleSchema);

export default Vehicle;
