import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/revenue.css";
import Header from '../components/header';
export const Revenue = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [payments, setPayments] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  
  // Lấy dữ liệu thanh toán và tổng doanh thu
  

  // Hàm xử lý thay đổi ngày bắt đầu và kết thúc
  const handleDateChange = () => {
    // Chỉ cập nhật dữ liệu khi người dùng thay đổi ngày
    setStartDate(document.getElementById("startDate").value);
    setEndDate(document.getElementById("endDate").value);
  };
  const handleSearch = () => {
    if (startDate && endDate) {
      // API call to fetch the data
      axios.get(`http://localhost:5000/api/payment/get?startDate=${startDate}&endDate=${endDate}`)
        .then(response => {
          setPayments(response.data);
        })
        .catch(error => {
          console.error('Error fetching invoices:', error);
        });

      // API call to fetch the total revenue
      axios.get(`http://localhost:5000/api/payment/revenue?startDate=${startDate}&endDate=${endDate}`)
        .then(response => {
          setTotalRevenue(response.data.totalRevenue);
        })
        .catch(error => {
          console.error('Error fetching total revenue:', error);
        });
    }
  };
  return (
    
    <div>
      <Header/>
      <h1>Danh sách thanh toán và Doanh thu</h1>

      {/* Phần chọn ngày */}
      <div className="search-container">
  <label htmlFor="startDate">Start Date: </label>
  <input type="date" id="startDate" value={startDate} onChange={handleDateChange} />
  
  <label htmlFor="endDate">End Date: </label>
  <input type="date" id="endDate" value={endDate} onChange={handleDateChange} />
  
  <button onClick={handleSearch}>Tìm kiếm</button>
</div>


      {/* Hiển thị tổng doanh thu */}
      <div>
        <h2>Tổng doanh thu: {totalRevenue.toLocaleString()} VND</h2>
      </div>

      {/* Hiển thị danh sách thanh toán */}
      <div>
        {payments.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Class Name</th>
                <th>Amount (VND)</th>
                <th>Payment Date</th>
                <th>Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={index}>
                  <td>{payment.StudentName}</td>
                  <td>{payment.ClassName}</td>
                  <td>{payment.Amount.toLocaleString()}</td>
                  <td>{new Date(payment.PaymentDate).toLocaleDateString()}</td>
                  <td>{payment.PaymentMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Không có thanh toán nào trong khoảng thời gian này.</p>
        )}
      </div>
    </div>
  );
};


