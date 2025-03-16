import mongoose, { Schema } from "mongoose";

// Connect to Mongo.DB 
mongoose.connect(process.env.MONGO_URL);

// Payment Details
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
