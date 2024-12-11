import { useState, useEffect } from 'react';
import Table from "../components/Table";
import Notification from "../components/Notification";
import "../css/tailwind.css";

// API functions
const fetchData = async (filters) => {
  try {
    const queryString = new URLSearchParams(filters).toString();
    const response = await fetch(`http://localhost:5000/api/employee/search?${queryString}`); 
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const addEmployee = async (employee) => {
  try {
    console.log(employee)
    const response = await fetch('http://localhost:5000/api/employee/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error adding employee:', error);
  }
};

const updateEmployee = async (employee) => {
  try {
    console.log(employee)
    const response = await fetch(`http://localhost:5000/api/employee/update-employee`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error updating employee:', error);
  }
};

export const Employee = () => {
  const [data, setData] = useState([]);
  const [noti, setNoti] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    Email: '',
    Password: '',
    FisrtName: '',
    LastName: '',
    PhoneNumber: '',
    Address: '',
    Salary: '',
    WorkHours: '',
    SupervisorID: '',
    Role: '',
    Expertise: '',
    Experience: '',
    EducationLevel: '',
    CommunicationSkill: ''
  });
  const [filters, setFilters] = useState({
    phone: '',
    position: 'Teacher',
    sortBy: 'ID',
    sortOrder: 'ASC',
  });
  
  const trigNoti = (noti) => {
    setNoti(noti);
    setTimeout(() => {
      setNoti("");
    }, 3000);
  };

  // Cập nhật giá trị các bộ lọc
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value, // Cập nhật giá trị mới cho trường 'position'
    }));
  };

  // Hàm gọi API khi lấy dữ liệu
  const handleSearch = async () => {
    const result = await loadData(); // Đợi loadData() hoàn thành
    if (result === -1) {
      trigNoti("Nhập số điện thoại đầy đủ");
    }
  };

  const loadData = async () => {
    const response = await fetchData(filters);
    console.log(Array.isArray(response))
    if (Array.isArray(response)) {setData(response);}
    else {return -1;}
  };

  // Lưu thông tin nhân viên mới
  const handleEdit = (employee) => {
    setNewEmployee({
      EmployeeID: employee.ID,
      Email: employee.Email,
      Password: '',
      FirstName: '',
      LastName: '',
      PhoneNumber: employee.PhoneNumber,
      Address: '',
      Salary: employee.Salary,
      WorkHours: '',
      SupervisorID: '',
      Role: employee.Position,
      Expertise: employee.Expertise,
      Experience: employee.Experience,
      EducationLevel: '',
      CommunicationSkill: employee.CommunicationSkill
    });
    setIsEditing(true);
  };

  const handleSaveEmployee = async () => {
    if (isEditing) {
      const response = await updateEmployee(newEmployee);
      console.log(response)
      trigNoti(response.message)
    } else {
      const response = await addEmployee(newEmployee);
      console.log(response)
      trigNoti(response.message)
    }
    loadData()
    resetNewEmployee();
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    resetNewEmployee();
    setIsEditing(false);
  };

  const resetNewEmployee = () => {
    setNewEmployee({
      Email: '',
      Password: '',
      FirstName: '',
      LastName: '',
      PhoneNumber: '',
      Address: '',
      Salary: '',
      WorkHours: '',
      SupervisorID: '',
      Role: '',
      Expertise: '',
      Experience: '',
      EducationLevel: '',
      CommunicationSkill: ''
    });
  };

  useEffect(() => {
    loadData();
  }, []); // Gọi API để lấy dữ liệu khi component mount

  return (
    <div className="p-4">
      {/* Các phần tử giao diện */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="SĐT"
          name="phone"
          value={filters.phone}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded flex-1"
        />
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-gray-700">Sắp xếp theo:</label>
          <select
            id="sort"
            name="sortBy"
            value={filters.sortBy}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="ID">ID</option>
            <option value="Email">Email</option>
            <option value="FullName">Họ tên</option>
            <option value="PhoneNumber">SĐT</option>
            <option value="Position">Chức vụ</option>
            <option value="Salary">Lương</option>
            <option value="Expertise">Chuyên môn</option>
            <option value="Experience">Kinh nghiệm</option>
            <option value="CommunicationSkill">KN Giao Tiếp</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-gray-700">Sắp xếp:</label>
          <select
            id="sort"
            name="sortOrder"
            value={filters.sortOrder}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="ASC">Tăng dần</option>
            <option value="DESC">Giảm dần</option>
          </select>
        </div>
        {/* Thêm Select lọc theo chức vụ */}
        <div className="flex items-center gap-2">
          <label htmlFor="position" className="text-gray-700">Lọc theo chức vụ:</label>
          <select
            id="position"
            value={filters.position}
            name="position"
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="Teacher">Giảng Viên</option>
            <option value="Assistant">Trợ Giảng</option>
            <option value="Consulting Employee">Tư Vấn Viên</option>
            {/* Thêm các chức vụ khác nếu có */}
          </select>
        </div>
        <button
          onClick={handleSearch} // Function to call when the button is clicked
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Tìm kiếm
        </button>
      </div>

      {/* Bảng hiển thị nhân viên */}
      <Table data={data} onEdit={handleEdit} />
      <Notification noti={noti} />
      {/* Form Thêm / Chỉnh sửa */}
      <div className="mt-6 p-4 border border-gray-300 rounded bg-gray-50 max-w-md mx-auto">
        <h2 className="text-lg font-bold mb-4">{isEditing ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên mới'}</h2>
        <div className="grid grid-cols-3 gap-2">
          <input
            type="email"
            placeholder="Email"
            value={newEmployee.Email}
            onChange={(e) => setNewEmployee({ ...newEmployee, Email: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Họ NV"
            value={newEmployee.FirstName}
            onChange={(e) => setNewEmployee({ ...newEmployee, FirstName: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Tên NV"
            value={newEmployee.LastName}
            onChange={(e) => setNewEmployee({ ...newEmployee, LastName: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Mật khẩu"
            value={newEmployee.Password}
            onChange={(e) => setNewEmployee({ ...newEmployee, Password: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="SDT"
            value={newEmployee.PhoneNumber}
            onChange={(e) => setNewEmployee({ ...newEmployee, PhoneNumber: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Địa chỉ"
            value={newEmployee.Address}
            onChange={(e) => setNewEmployee({ ...newEmployee, Address: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Lương"
            value={newEmployee.Salary}
            onChange={(e) => setNewEmployee({ ...newEmployee, Salary: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="ID người giám sát"
            value={newEmployee.SupervisorID}
            onChange={(e) => setNewEmployee({ ...newEmployee, SupervisorID: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Chức vụ"
            value={newEmployee.Role}
            onChange={(e) => setNewEmployee({ ...newEmployee, Role: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Chuyên môn"
            value={newEmployee.Expertise}
            onChange={(e) => setNewEmployee({ ...newEmployee, Expertise: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Kinh nghiệm"
            value={newEmployee.Experience}
            onChange={(e) => setNewEmployee({ ...newEmployee, Experience: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Học vấn"
            value={newEmployee.EducationLevel}
            onChange={(e) => setNewEmployee({ ...newEmployee, EducationLevel: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Kĩ năng giao tiếp"
            value={newEmployee.CommunicationSkill}
            onChange={(e) => setNewEmployee({ ...newEmployee, CommunicationSkill: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={handleCancelEdit}
            className="p-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Hủy
          </button>
          <button
            onClick={handleSaveEmployee}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            {isEditing ? 'Cập nhật' : 'Thêm'}
          </button>
        </div>
      </div>
    </div>
  );
};
