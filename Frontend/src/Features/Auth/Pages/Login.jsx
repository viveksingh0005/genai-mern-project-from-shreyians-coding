import React from "react";

export const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-[350px]">

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Login
        </h1>

        <form className="flex flex-col gap-4">

          <div className="flex flex-col">
            <label className="text-gray-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter email address"
              className="px-3 py-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="px-3 py-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg font-semibold"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
};