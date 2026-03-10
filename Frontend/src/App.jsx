import { Routes, Route } from "react-router-dom";
import React from 'react'
import { Login } from "./Features/Auth/Pages/Login";
import { Registration } from "./Features/Auth/Pages/Registration";

 function App () {
  return (
    
    <>
    <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Registration/>}/>
         
    </Routes>

    </>
  )
}

export default App