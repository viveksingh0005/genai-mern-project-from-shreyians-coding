const mongoose = require("mongoose");

const paySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  cause: { type: String },
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,
  status: { type: String, default: "pending" }, // pending | success
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PaymentLog", paySchema);