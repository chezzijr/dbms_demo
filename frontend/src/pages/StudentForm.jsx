// src/pages/StudentForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../css/StudentForm.css';  // Thêm CSS cho StudentForm nếu cần

const StudentForm = () => {
  const [student, setStudent] = useState({
    StudentID: null,
    Email: "",
    Password: "",
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    Address: "",
    AccountBalance: 0,
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({
      ...student,
      [name]: value,
    });
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/student/add",
        student
      );
      setResponseMessage(response.data.message || "Student added successfully!");
    } catch (error) {
      setResponseMessage((error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="update-container">
      <h2>Update Student</h2>
      <form onSubmit={handleAddStudent} className="update-form">
        <label>
          Student ID:
          <input
            type="number"
            name="StudentID"
            value={student.StudentID}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="Email"
            value={student.Email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="Password"
            value={student.Password}
            onChange={handleChange}
          />
        </label>
        <label>
          First Name:
          <input
            type="text"
            name="FirstName"
            value={student.FirstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="LastName"
            value={student.LastName}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone Number:
          <input
            type="text"
            name="PhoneNumber"
            value={student.PhoneNumber}
            onChange={handleChange}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="Address"
            value={student.Address}
            onChange={handleChange}
          />
        </label>
        <label>
          Account Balance:
          <input
            type="number"
            name="AccountBalance"
            value={student.AccountBalance}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Student</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
      
      <div className="link-container">
        <Link to="/delete" className="link-button">Go to Delete Page</Link>
      </div>
    </div>
  );
};

export default StudentForm;
