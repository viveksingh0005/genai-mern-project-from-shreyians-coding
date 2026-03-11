import { Routes, Route } from "react-router-dom";
import React from 'react'
import { Login } from "./Features/Auth/Pages/Login";
import { Registration } from "./Features/Auth/Pages/Registration";
import Home from  "./Home.jsx"
import Protected from "./Features/Auth/Components/Protected.jsx";
 function App () {
  return (
    
    <>
    <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Registration/>}/>
        <Route path="/home" element={<Protected><Home/></Protected>}/>
         
    </Routes>

    </>
  )
}

export default App