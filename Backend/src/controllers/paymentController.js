const Razorpay = require("razorpay");
const crypto = require("crypto");
const Donation = require("../models/paymentd");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Step 1: Create Order
exports.createOrder = async (req, res) => {
  const { amount, name, email, cause } = req.body;

  try {
    const options = {
      amount: amount * 100, // Razorpay takes amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // Save donation to DB with pending status
    const donation = await Donation.create({
      name,
      email,
      amount,
      cause,
      razorpay_order_id: order.id,
    });

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      donationId: donation._id,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Step 2: Verify Payment
exports.verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    donationId,
  } = req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign)
    .toString("hex");

  if (expectedSign !== razorpay_signature) {
    return res.status(400).json({ success: false, message: "Invalid signature" });
  }

  // Update donation status
  await Donation.findByIdAndUpdate(donationId, {
    razorpay_payment_id,
    razorpay_signature,
    status: "success",
  });

  res.json({ success: true, message: "Payment verified!" });
};

// Get all donations (admin)
exports.getDonations = async (req, res) => {
  const donations = await Donation.find({ status: "success" }).sort({ createdAt: -1 });
  res.json(donations);
};