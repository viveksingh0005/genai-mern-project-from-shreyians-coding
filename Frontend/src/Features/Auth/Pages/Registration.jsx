import React from "react";

export const Registration = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        <form className="space-y-4">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

         

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Register
          </button>

        </form>

      </div>

    </div>
  );
};