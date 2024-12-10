import { useState, useEffect } from 'react';
import Table from "../components/Table";
import "../css/tailwind.css";

// API functions
const fetchData = async () => {
  try {
    const response = await fetch('/api/employees'); // Thay '/api/employees' bằng URL thực tế của bạn
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const addEmployee = async (employee) => {
  try {
    const response = await fetch('/api/employees', {
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
    const response = await fetch(`/api/employees/${employee.id}`, {
      method: 'PUT',
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

const deleteEmployee = async (id) => {
  try {
    const response = await fetch(`/api/employees/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error deleting employee:', error);
  }
};

const initialData = [
  { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com', phone: '0123456789', position: 'Nhân viên', salary: '10.000.000 VND', specialization: 'Lập trình web', experience: '3 năm', communicationSkills: 'Tốt' },
  { id: 2, name: 'Trần Thị B', email: 'b@example.com', phone: '0987654321', position: 'Quản lý', salary: '15.000.000 VND', specialization: 'Quản lý dự án', experience: '5 năm', communicationSkills: 'Rất tốt' },
  { id: 3, name: 'Lê Minh C', email: 'c@example.com', phone: '0912345678', position: 'Lập trình viên', salary: '12.000.000 VND', specialization: 'Phát triển phần mềm', experience: '4 năm', communicationSkills: 'Khá' },
];

export const Employee = () => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('id');
  const [filteredData, setFilteredData] = useState(data);
  const [newEmployee, setNewEmployee] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    position: '',
    salary: '',
    specialization: '',
    experience: '',
    communicationSkills: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // Hàm lọc và sắp xếp dữ liệu
  const getProcessedData = () => {
    const filtered = data.filter((row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
      if (sortKey === 'salary') {
        const salaryA = parseInt(a.salary.replace(/[^\d.-]/g, ''));
        const salaryB = parseInt(b.salary.replace(/[^\d.-]/g, ''));
        return salaryA - salaryB;
      } else if (sortKey === 'id') {
        return a.id - b.id;
      }
      return 0;
    });

    setFilteredData(sorted);
  };

  // Cập nhật filteredData khi có thay đổi ở searchTerm, sortKey, hoặc data
  useEffect(() => {
    getProcessedData();
  }, [searchTerm, sortKey, data]);  // Khi thay đổi searchTerm, sortKey, hoặc data

  // Hàm gọi API khi lấy dữ liệu
  const loadData = async () => {
    const employees = await fetchData();
    setData(employees);
  };

  // Lưu thông tin nhân viên mới
  const handleSaveEmployee = async () => {
    if (isEditing) {
      const updatedEmployee = await updateEmployee(newEmployee);
      setData((prevData) => 
        prevData.map((emp) => (emp.id === newEmployee.id ? updatedEmployee : emp))
      );
    } else {
      const addedEmployee = await addEmployee(newEmployee);
      setData((prevData) => [...prevData, addedEmployee]);
    }

    resetNewEmployee();
    setIsEditing(false);
  };

  const handleEdit = (employee) => {
    setNewEmployee(employee);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    setData((prevData) => prevData.filter((emp) => emp.id !== id));
  };

  const handleCancelEdit = () => {
    resetNewEmployee();
    setIsEditing(false);
  };

  const resetNewEmployee = () => {
    setNewEmployee({
      id: '',
      name: '',
      email: '',
      phone: '',
      position: '',
      salary: '',
      specialization: '',
      experience: '',
      communicationSkills: ''
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
          placeholder="Tên / Email / SĐT"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded flex-1"
        />
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-gray-700">Sắp xếp:</label>
          <select
            id="sort"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="id">ID</option>
            <option value="salary">Lương</option>
          </select>
        </div>
      </div>

      {/* Bảng hiển thị nhân viên */}
      <Table data={filteredData} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Form Thêm / Chỉnh sửa */}
      <div className="mt-6 p-4 border border-gray-300 rounded bg-gray-50 max-w-md mx-auto">
        <h2 className="text-lg font-bold mb-4">{isEditing ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên mới'}</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Tên NV"
            value={newEmployee.name}
            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={newEmployee.email}
            onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="SDT"
            value={newEmployee.phone}
            onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Chức vụ"
            value={newEmployee.position}
            onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Lương"
            value={newEmployee.salary}
            onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Chuyên môn"
            value={newEmployee.specialization}
            onChange={(e) => setNewEmployee({ ...newEmployee, specialization: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Kinh nghiệm"
            value={newEmployee.experience}
            onChange={(e) => setNewEmployee({ ...newEmployee, experience: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Kĩ năng giao tiếp"
            value={newEmployee.communicationSkills}
            onChange={(e) => setNewEmployee({ ...newEmployee, communicationSkills: e.target.value })}
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
