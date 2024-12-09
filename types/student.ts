// CREATE TABLE Students (
//     StudentID INT PRIMARY KEY, -- Mã Học viên
//     Email NVARCHAR(100) unique, -- Email
//     Password NVARCHAR(50) not null, -- Mật khẩu
//     FirstName NVARCHAR(50), -- Họ
//     LastName NVARCHAR(50), -- Tên
//     PhoneNumber NVARCHAR(20) not null, -- Số điện thoại
//     Address NVARCHAR(255), -- Địa chỉ
//     AccountBalance DECIMAL(18, 2), -- Số dư tài khoản
// 	CHECK (AccountBalance >= 0)
// );


export type StudentPayload = {
    Email: string;
    Password: string;
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    Address: string;
    AccountBalance: number;
}

export type Student = StudentPayload & {
    StudentID: number;
}

