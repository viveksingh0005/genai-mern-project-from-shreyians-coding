import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const causes = ["Feed the Hungry", "Education for All", "Clean Water Initiative", "General Fund"];
const presets = [100, 500, 1000, 5000];

export default function PaymentPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", amount: "", cause: causes[0] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePayment = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.amount || form.amount < 1) {
      setError("Please fill all fields with a valid amount.");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Create order on backend
      const { data } = await axios.post("http://localhost:3000/api/payment/create-order", {
        amount: Number(form.amount),
        name: form.name,
        email: form.email,
        cause: form.cause,
      });

      // Step 2: Open Razorpay Checkout
      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "DonateHope",
        description: `Donation for ${form.cause}`,
        order_id: data.orderId,
        handler: async (response) => {
          // Step 3: Verify on backend
          await axios.post("http://localhost:3000/api/payment/verify-payment", {
            ...response,
            donationId: data.donationId,
          });
          navigate("/success");
        },
        prefill: { name: form.name, email: form.email },
        theme: { color: "#16a34a" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => setError("Payment failed. Please try again."));
      rzp.open();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 py-16 px-6">
      <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-xl p-10">
        <h2 className="text-4xl font-heading font-black text-dark mb-2">Make a Donation</h2>
        <p className="text-gray-400 mb-8 text-sm">100% of your donation goes to the cause.</p>

        {/* Preset Amounts */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {presets.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => setForm({ ...form, amount: amt })}
              className={`px-5 py-2 rounded-full border font-medium text-sm transition ${
                Number(form.amount) === amt
                  ? "bg-primary text-white border-primary"
                  : "border-gray-200 text-gray-600 hover:border-primary"
              }`}
            >
              ₹{amt}
            </button>
          ))}
        </div>

        <form onSubmit={handlePayment} className="space-y-5">
          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
          <input
            name="amount"
            type="number"
            placeholder="Custom Amount (₹)"
            value={form.amount}
            onChange={handleChange}
            min="1"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
          <select
            name="cause"
            value={form.cause}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary text-sm text-gray-600"
          >
            {causes.map((c) => <option key={c}>{c}</option>)}
          </select>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition disabled:opacity-60"
          >
            {loading ? "Processing..." : `Donate ₹${form.amount || "..."}`}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          🔒 Secured by Razorpay · All major cards, UPI, Wallets accepted
        </p>
      </div>
    </main>
  );
}