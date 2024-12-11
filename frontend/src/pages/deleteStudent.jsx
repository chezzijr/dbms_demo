// src/pages/deleteStudent.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../css/deleteStudent.css'; 

const DeleteStudent = () => {
  const [deleteId, setDeleteId] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleDeleteStudent = async (e) => {
    e.preventDefault();
    try {
      if (!deleteId) {
        setResponseMessage("Please enter a student ID to delete.");
        return;
      }
      const response = await axios.delete(
        `http://localhost:5000/api/student/delete/${deleteId}`
      );
      setResponseMessage(response.data.message || `Student with ID ${deleteId} deleted successfully.`);
    } catch (error) {
      setResponseMessage(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="delete-container">
      <h2>Delete Student</h2>
      <form onSubmit={handleDeleteStudent} className="delete-form">
        <label>
          Student ID:
          <input
            type="text"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
          />
        </label>
        
        <button type="submit">Delete Student</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
      
      <div className="link-container">
        <Link to="/student" className="link-button">Go to Update Page</Link>
      </div>
    </div>
  );
};

export default DeleteStudent;
