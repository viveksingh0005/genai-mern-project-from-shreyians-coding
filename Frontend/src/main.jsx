
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './Features/Auth/auth.context.jsx';
import { InterviewProvider } from './Features/interview/interview.context.jsx';
createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <InterviewProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </InterviewProvider>
  </AuthProvider>

)
