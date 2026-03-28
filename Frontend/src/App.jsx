import { Routes, Route } from "react-router-dom";

import { Login } from "./Features/Auth/Pages/Login";
import { Registration } from "./Features/Auth/Pages/Registration";



import Interview from "./Features/interview/pages/Interview.jsx";
import First from "./First.jsx";
import PaymentPage from "./Features/Payment/pages/PaymentPage.jsx";
import { Home } from "./Home.jsx";
import TemplatesPage from "./Features/resumecreator/pages/TemplatePage";
import TemplatePreview from "./Features/resumecreator/pages/TemplatePreview";
import ATSResumeBuilder from "./Features/resumecreator/pages/ATSResumeEditor";

import InterviewGuest from "./Features/interview/pages/InterviewGuest.jsx";
import Protected from "./Features/Auth/Components/Protected.jsx";
 function App () {
  return (
    
    <>
    <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Registration/>}/>
        <Route path="/interview" element={<InterviewGuest/>}/>
        <Route path="/interview/:id" element={<Interview />} />
        <Route path="/first" element={<First/>} />
        <Route path="/pay" element={<PaymentPage/>} />
        <Route path="/" element={<Home/>}/>
        <Route element={<Protected />}>
         <Route path="/templates" element={<TemplatesPage />} />
        </Route>
       
        <Route path="/template/:id" element={<TemplatePreview />} />
        <Route path="/editor/:id" element={<ATSResumeBuilder />} />
         
    </Routes>

    </>
  )
}

export default App