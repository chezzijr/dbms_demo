// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Revenue } from "./pages/revenue.jsx";  // Import component TrangCh
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Employee } from "./pages/Employee.jsx";  
function App() {
  return (
    
      <Router>
          <Routes>
            <Route path="/revenue" element={< Revenue />} /> 
            <Route path="/employee" element={< Employee />} /> 
          </Routes>
      </Router>
    
  );
}

export default App;
