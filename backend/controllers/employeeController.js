const employeeModel = require('../models/employeeModel');

// Cập nhật thông tin nhân viên
const updateEmployee = async (req, res) => {
    const employeeData = req.body;

    try {
        const result = await employeeModel.updateEmployee(employeeData);
        res.status(200).json({ message: 'Employee updated successfully', result: result.recordset });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating employee', error: err.message });
    }
};

const searchEmployees = async (req, res) => {
    const phone = req.query.phone ?? null;
    const positionFilter = req.query.position ?? null;
    const sortBy = req.query.sortBy ?? "FullName";
    const sortOrder = req.query.sortOrder ?? "ASC";

    // Kiểm tra các tham số đầu vào
    if (phone && !phone.match(/^\d{10}$/)) {
        return res.status(422).json({ message: "Error: invalid phone number" });
    }

    if (positionFilter && !["Teacher", "Assistant", "Consulting Employee"].includes(positionFilter)) {
        return res.status(422).json({ message: "Error: invalid position filter. Must be one of 'Teacher', 'Assistant', 'Consulting Employee'" });
    }

    if (!["ID", "FullName", "Email", "PhoneNumber", "Position", "Salary", "Expertise", "Experience", "CommunicationSkill"].includes(sortBy)) {
        return res.status(422).json({ message: "Error: invalid sortBy. Must be one of 'ID', 'FullName', 'Email', 'PhoneNumber', 'Position', 'Salary', 'Expertise', 'Experience', 'CommunicationSkill'" });
    }

    if (!["ASC", "DESC"].includes(sortOrder)) {
        return res.status(422).json({ message: "Error: invalid sortOrder. Must be one of 'ASC', 'DESC'" });
    }

    try {
        // Gọi model để truy vấn cơ sở dữ liệu
        const result = await employeeModel.getEmployeeDetailsByPhone(phone, positionFilter, sortBy, sortOrder);
        res.json(result); // Trả về kết quả
    } catch (err) {
        res.status(500).json({ message: "Error: " + err.message });
    }
};


const createEmployee = async (req, res) => {
    const { 
        Email, Password, FirstName, LastName, PhoneNumber, Address, 
        Salary, SupervisorID, Role, Expertise, Experience, EducationLevel, CommunicationSkill
    } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!Email || !Password || !FirstName || !LastName || !PhoneNumber || !Salary || !Role) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Kiểm tra các giá trị của Role
    const validRoles = ['Teacher', 'Assistant', 'ConsultingEmployee'];
    if (!validRoles.includes(Role)) {
        return res.status(422).json({ message: "Invalid role. Must be one of 'Teacher', 'Assistant', or 'ConsultingEmployee'" });
    }

    try {
        // Gọi model để thêm nhân viên
        const result = await employeeModel.addEmployee({
            Email, Password, FirstName, LastName, PhoneNumber, Address, 
            Salary, SupervisorID, Role, Expertise, Experience, EducationLevel, CommunicationSkill
        });

        res.status(201).json({ message: 'Employee added successfully', data: result });
    } catch (err) {
        res.status(500).json({ message: 'Error: ' + err.message });
    }
};

module.exports = {
    updateEmployee, searchEmployees, createEmployee
};
