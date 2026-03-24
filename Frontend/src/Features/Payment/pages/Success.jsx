import { Link } from "react-router-dom";

export default function Success() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-green-50 px-6">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🎉</div>
        <h1 className="text-5xl font-heading font-black text-primary mb-4">Thank You!</h1>
        <p className="text-gray-500 text-lg mb-8">
          Your donation was successful. You're making a real difference in someone's life.
        </p>
        <Link
          to="/"
          className="bg-primary text-white px-10 py-4 rounded-full font-semibold hover:bg-green-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}