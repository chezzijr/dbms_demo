const connectDB = require('../config/sqlConfig');
const sql = require('mssql');

// Cập nhật thông tin nhân viên
const updateEmployee = async (employeeData) => {
    try {
        // Kết nối với database
        const pool = await connectDB();

        // Sử dụng request để gọi stored procedure với các tham số
        const result = await pool.request()
            .input('EmployeeID', employeeData.EmployeeID)
            .input('Email', employeeData.Email ?? null)
            .input('Password', employeeData.Password ?? null)
            .input('FirstName', employeeData.FirstName ?? null)
            .input('LastName', employeeData.LastName ?? null)
            .input('PhoneNumber', employeeData.PhoneNumber ?? null)
            .input('Address', employeeData.Address ?? null)
            .input('Salary', employeeData.Salary ?? null)
            .input('WorkHours', employeeData.WorkHours ?? null)
            .input('SupervisorID', employeeData.SupervisorID ?? null)
            .input('Role', employeeData.Role ?? null)
            .input('Expertise', employeeData.Expertise ?? null)
            .input('Experience', employeeData.Experience ?? null)
            .input('EducationLevel', employeeData.EducationLevel ?? null)
            .input('CommunicationSkill', employeeData.CommunicationSkill ?? null)
            .execute('UpdateEmployee'); // gọi thủ tục

        return result; // trả về kết quả
    } catch (err) {
        console.error(err);
        throw new Error('Error updating employee: ' + err.message);
    }
};

const getEmployeeDetailsByPhone = async (phone, positionFilter, sortBy, sortOrder) => {
    try {
        const pool = await connectDB();
        const result = await pool.request()
            .input('Phone', phone)
            .input('PositionFilter', positionFilter)
            .input('SortBy', sortBy)
            .input('SortOrder', sortOrder)
            .execute('GetEmployeeDetailsByPhone'); // Gọi stored procedure
        
        return result.recordset; // Trả về kết quả
    } catch (err) {
        throw new Error('Database error: ' + err.message);
    }
};

const addEmployee = async (employeeData) => {
    try {
        const pool = await connectDB();
        
        // Thực thi thủ tục AddEmployee với các tham số
        const result = await pool.request()
            .input('Email', employeeData.Email)
            .input('Password', employeeData.Password)
            .input('FirstName', employeeData.FirstName)
            .input('LastName', employeeData.LastName)
            .input('PhoneNumber', employeeData.PhoneNumber)
            .input('Address', employeeData.Address ?? null)
            .input('Salary', employeeData.Salary)
            .input('SupervisorID', employeeData.SupervisorID ?? null)
            .input('Role', employeeData.Role)
            .input('Expertise', employeeData.Expertise ?? null)
            .input('Experience', employeeData.Experience ?? null)
            .input('EducationLevel', employeeData.EducationLevel ?? null)
            .input('CommunicationSkill', employeeData.CommunicationSkill ?? null)
            .execute('AddEmployee'); // Gọi thủ tục AddEmployee
        
        return result.recordset; // Trả về kết quả của thủ tục
    } catch (err) {
        throw new Error('Database error: ' + err.message);
    }
};


module.exports = {
    updateEmployee, getEmployeeDetailsByPhone, addEmployee
};