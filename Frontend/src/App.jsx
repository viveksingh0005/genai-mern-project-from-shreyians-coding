import { Routes, Route } from "react-router-dom";
import React from 'react'
import { Login } from "./Features/Auth/Pages/Login";
import { Registration } from "./Features/Auth/Pages/Registration";

import Protected from "./Features/Auth/Components/Protected.jsx";
import Home from "./Features/interview/pages/Home.jsx";
 function App () {
  return (
    
    <>
    <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Registration/>}/>
        <Route path="/" element={<Home/>}/>
         
    </Routes>

    </>
  )
}

export default App