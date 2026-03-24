const express = require("express");
const router = express.Router();
const {
  createOrder,
  verifyPayment,
  getDonations,
} = require("../controllers/paymentController");

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);
router.get("/donations", getDonations);

module.exports = router;