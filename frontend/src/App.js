// src/App.js
import React from "react";
import AddStudentForm from "./pages/addStudent.jsx";
import StudentForm from "./pages/StudentForm.jsx";
import DeleteStudent from "./pages/deleteStudent.jsx";  // Import DeleteStudent
import StudentList from "./pages/StudentList.jsx";  // Import StudentList
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Revenue } from "./pages/revenue.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/add" element={<AddStudentForm />} />
        <Route path="/student" element={<StudentForm />} />
        <Route path="/delete" element={<DeleteStudent />} />
        <Route path="/students" element={<StudentList />} /> {/* Thêm route cho StudentList */}
        <Route path="/revenue" element={<Revenue />} />
      </Routes>
    </Router>
  );
}

export default App;

