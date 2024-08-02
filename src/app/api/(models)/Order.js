import mongoose, { Schema } from "mongoose";

// Mongo.DB veritabanına bağlan
mongoose.connect(process.env.MONGO_URL);

// Ödeme detayları
mongoose.Promise = global.Promise;

const OrderSchema = new Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Vehicle",
    },
    money_spend: Number,
    currency: String,
    type: String,
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models?.Order || mongoose.model("Order", OrderSchema);

export default Order;
