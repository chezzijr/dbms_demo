import React from 'react';
import '../css/Header.css'; // Import file CSS cho Header

const Header = () => {
  return (
    <header className="header-container">
      <div className="logo">
        <h5>MyApp</h5> {/* Bạn có thể thay đổi tên ứng dụng hoặc thêm logo */}
      </div>
      <nav>
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/revenue">Revenue</a></li>
          <li><a href="/login">Login</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
