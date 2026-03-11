import React, {useState} from "react";
import {useNavigate, Link} from 'react-router'
import {useAuth} from '../hooks/useAuth'

export const Registration = () => {
  const navigate = useNavigate()
  const[username, setUsername] =useState("second")
  const[email, setEmail] =useState("")
  const[password, setPassword] =useState("")

  const {loading,handleRegister} = useAuth()

  const handleSubmit= async(e)=>{
    e.preventDefault()
    await handleRegister({username, email,password})
    navigate("/home")

    if(loading){
      return(<main><h1>Loading...</h1></main>)
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium">User Name</label>
            <input
            onchange ={(e)=>{setUsername(e.target.value)}}
              type="text"
              placeholder="Enter your username"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              onchange ={(e)=>{setEmail(e.target.value)}}
              type="email"
              placeholder="Enter email address"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              onchange ={(e)=>{setPassword(e.target.value)}}
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