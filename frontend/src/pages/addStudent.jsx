// frontend/src/components/AddStudentForm.js
import React, { useState } from "react";
import axios from "axios";
import "../css/addStudent.css";

const AddStudentForm = () => {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    Address: "",
    AccountBalance: 0, // Mặc định là 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Đảm bảo AccountBalance luôn là 0
    const dataToSend = {
      ...formData,
      AccountBalance: 0, // Set mặc định là 0
    };

    console.log("Data to send:", dataToSend); // Log để kiểm tra dữ liệu gửi

    try {
      const response = await axios.post("http://localhost:5000/api/student/add", dataToSend);
      console.log("Sinh viên đã được thêm:", response.data);
      alert("Sinh viên đã được thêm thành công!");

      // Reset form sau khi thêm thành công
      setFormData({
        Email: "",
        Password: "",
        FirstName: "",
        LastName: "",
        PhoneNumber: "",
        Address: "",
        AccountBalance: 0, // Đặt lại AccountBalance là 0
      });
    } catch (error) {
      console.error("Lỗi khi thêm sinh viên:", error.response || error);
      // Hiển thị thông báo lỗi chi tiết hơn nếu có
      const errorMessage = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Có lỗi xảy ra, vui lòng thử lại.";
      alert(`Có lỗi xảy ra: ${errorMessage}`);
    }
  };

  return (
    <div className="form-container">
      <h2>Đăng ký</h2>
      <form onSubmit={handleSubmit}>
        {/* Hàng 1: Email và Password */}
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Hàng 2: First Name và Last Name */}
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="FirstName"
            value={formData.FirstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="LastName"
            value={formData.LastName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Hàng 3: Phone Number và Address */}
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="PhoneNumber"
            value={formData.PhoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="Address"
            value={formData.Address}
            onChange={handleChange}
          />
        </div>

        {/* Không cần nhập Account Balance */}
        {/* Bỏ ô nhập AccountBalance */}

        <button type="submit">Đăng ký</button>
      </form>
    </div>
  );
};

export default AddStudentForm;
