// src/pages/StudentList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Paginator } from 'primereact/paginator';

// Import CSS cho StudentList
import '../css/StudentList.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [studentsPerPage] = useState(10); // Số sinh viên mỗi trang

  useEffect(() => {
    // Gọi API để lấy dữ liệu sinh viên
    axios.get('http://localhost:5000/api/student/get')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  }, []);

  // Hàm thay đổi trang
  const handlePageChange = (event) => {
    setCurrentPage(event.page + 1); // Sửa trang bắt đầu từ 1
  };

  // Hàm để tìm kiếm theo StudentID
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Hàm lọc sinh viên theo StudentID
  const filteredStudents = students.filter(student =>
    student.StudentID.toString().includes(search)
  );

  // Phân trang dữ liệu
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  return (
    <div className="student-list">
      <h2>Student List</h2>

      {/* Tìm kiếm */}
      <div className="search-container">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText 
            value={search} 
            onChange={handleSearchChange} 
            placeholder="Search by ID" 
          />
        </span>
      </div>

      {/* DataTable */}
      <DataTable value={currentStudents} responsiveLayout="scroll">
        <Column field="StudentID" header="ID" sortable />
        <Column field="FirstName" header="First Name" sortable />
        <Column field="LastName" header="Last Name" sortable />
        <Column field="Email" header="Email" sortable />
        <Column field="PhoneNumber" header="Phone Number" sortable />
        <Column field="Address" header="Address" sortable />
        <Column field="AccountBalance" header="Account Balance" sortable />
        <Column field="status" header="Status" sortable />
      </DataTable>

      {/* Paginator */}
      <Paginator 
        first={indexOfFirstStudent} 
        rows={studentsPerPage} 
        totalRecords={filteredStudents.length} 
        onPageChange={handlePageChange}
        template="FirstPageLink PrevPageLink  NextPageLink LastPageLink"
      />
    </div>
  );
};

export default StudentList;
