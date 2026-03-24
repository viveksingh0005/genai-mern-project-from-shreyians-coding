import { Routes, Route } from "react-router-dom";

import { Login } from "./Features/Auth/Pages/Login";
import { Registration } from "./Features/Auth/Pages/Registration";


import Home from "./Features/interview/pages/Home.jsx";
import Interview from "./Features/interview/pages/Interview.jsx";
import First from "./First.jsx";
import PaymentPage from "./Features/Payment/pages/PaymentPage.jsx";
 function App () {
  return (
    
    <>
    <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Registration/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/interview/:id" element={<Interview />} />
        <Route path="/first" element={<First/>} />
        <Route path="/pay" element={<PaymentPage/>} />
         
    </Routes>

    </>
  )
}

export default App