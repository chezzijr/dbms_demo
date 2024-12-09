CREATE DATABASE KhoaHocOnline;
use KhoaHocOnline;

CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY, -- Mã định danh
    Email NVARCHAR(50), 
    Password NVARCHAR(50), 
    FirstName NVARCHAR(50), -- Họ
    LastName NVARCHAR(50), -- Tên
    PhoneNumber NVARCHAR(20) not null, 
    Address NVARCHAR(50), 
    Salary DECIMAL(10, 2) not null, 
    WorkHours INT, -- Giờ làm việc
    SupervisorID INT, -- Mã nhân viên giám sát
	unique (email)
);


CREATE TABLE Teachers (
    EmployeeID INT PRIMARY KEY, -- Mã nhân viên
    Expertise NVARCHAR(50), -- Chuyên môn
    Experience INT -- Kinh nghiệm
);

CREATE TABLE Assisstants (
    EmployeeID INT PRIMARY KEY, -- Mã nhân viên
    EducationLevel NVARCHAR(50), -- Trình độ học vấn
    SpecializedSubject NVARCHAR(50) -- Môn học chuyên môn
);


CREATE TABLE ConsultingEmployees (
    EmployeeID INT PRIMARY KEY, -- Mã nhân viên
    CommunicationSkill NVARCHAR(50), -- Kỹ năng giao tiếp
    Experience INT -- Kinh nghiệm
);



CREATE TABLE Messages (
    MessageID INT PRIMARY KEY, -- ID tin nhắn
    SentDate DATETIME, -- Ngày gửi
    Content NVARCHAR(MAX), -- Nội dung
    SenderID INT -- Mã người gửi
);

CREATE TABLE MessageSenders (
    SenderID INT PRIMARY KEY -- Mã người gửi
);



CREATE TABLE Classes (
    ClassID INT PRIMARY KEY, -- Mã lớp học
    TeacherID INT, -- Mã giảng viên
    CourseID INT, -- Mã khóa học
    ClassName NVARCHAR(50), -- Tên lớp
    Price DECIMAL(10, 2), -- Giá tiền
    StartDate DATE, -- Ngày mở lớp
    EndDate DATE, -- Ngày đóng lớp
    Duration INT, -- Thời lượng (số buổi)
	NumberOfStudents INT DEFAULT 0,
	CONSTRAINT check_price_non_negative CHECK (Price >= 0)
);

CREATE TABLE Courses (
    CourseID INT PRIMARY KEY, -- Mã khóa học
    CourseName NVARCHAR(50), -- Tên khóa học
    Description NVARCHAR(MAX) -- Mô tả
);


CREATE TABLE Lessons (
    ClassID INT, -- Mã lớp học
    LessonID INT, -- Mã buổi học
    LessonDate DATE, -- Ngày học
    StartTime TIME, -- Giờ bắt đầu
    EndTime TIME, -- Giờ kết thúc
    LessonContent NVARCHAR(MAX), -- Nội dung dạy
    PRIMARY KEY (ClassID, LessonID) -- Khóa chính
);

CREATE TABLE Forums (
    ClassID INT, -- Mã lớp học
    ForumName NVARCHAR(100), -- Tên diễn đàn
    PRIMARY KEY (ClassID, ForumName) -- Khóa chính
);



CREATE TABLE Comments (
    ClassID INT, -- Mã lớp học
    ForumName NVARCHAR(100), -- Tên diễn đàn
    CommentID INT, -- Mã bình luận
    PostedTime DATETIME not null, -- Thời gian đăng
    Content NVARCHAR(MAX) not null, -- Nội dung
    ReplyToCommentID INT, -- Mã bình luận phản hồi
    UserID INT not null, -- Mã người bình luận
    PRIMARY KEY (ClassID, ForumName, CommentID) -- Khóa chính
);

CREATE TABLE Commentators (
    CommentatorID INT PRIMARY KEY -- Mã người bình luận
);

CREATE TABLE Quizzes (
    ClassID INT, -- Mã lớp học
    QuizName NVARCHAR(100), -- Tên quiz
    TimeTaken INT, -- Thời gian làm bài
    NumQuestions INT DEFAULT 0, -- Số lượng câu hỏi
    PRIMARY KEY (ClassID, QuizName) -- Khóa chính
);


CREATE TABLE Questions (
    ClassID INT, -- Mã lớp học
    QuizName NVARCHAR(100), -- Tên quiz
    QuestionNumber INT, -- Số thứ tự
    QuestionText NVARCHAR(MAX) not null, -- Đề bài
    PRIMARY KEY (ClassID, QuizName, QuestionNumber) -- Khóa chính
);

CREATE TABLE Choices (
    ClassID INT, -- Mã lớp học
    QuizName NVARCHAR(100), -- Tên quiz
    QuestionNumber INT, -- Số thứ tự câu hỏi
    ChoiceText NVARCHAR(100), -- Nội dung phương án lựa chọn
    IsTrue BIT not null, -- Có phải là đáp án đúng hay không (1: True, 0: False)
    PRIMARY KEY (ClassID, QuizName, QuestionNumber, ChoiceText) -- Khóa chính
);


CREATE TABLE Notifications (
    ClassID INT, -- Mã lớp học
    NotificationName NVARCHAR(100), -- Tên thông báo
    TimeSent DATETIME not null, -- Thời gian
    Content NVARCHAR(MAX) not null, -- Nội dung
    PRIMARY KEY (ClassID, NotificationName) -- Khóa chính
);

CREATE TABLE AnswerChoices (
    StudentID INT, -- Mã Học viên
    ClassID INT, -- Mã lớp học
    QuizName NVARCHAR(100), -- Tên quiz
    QuestionNumber INT, -- Số thứ tự câu hỏi
    ChoiceText NVARCHAR(100), -- Nội dung phương án
    IsChosen BIT not null, -- Đánh dấu xem phương án đã được chọn hay chưa (1: Chosen, 0: Not chosen)
    PRIMARY KEY (StudentID, ClassID, QuizName, QuestionNumber, ChoiceText) -- Khóa chính
);

CREATE TABLE Students (
    StudentID INT PRIMARY KEY, -- Mã Học viên
    Email NVARCHAR(100) unique, -- Email
    Password NVARCHAR(50) not null, -- Mật khẩu
    FirstName NVARCHAR(50), -- Họ
    LastName NVARCHAR(50), -- Tên
    PhoneNumber NVARCHAR(20) not null, -- Số điện thoại
    Address NVARCHAR(255), -- Địa chỉ
    AccountBalance DECIMAL(18, 2), -- Số dư tài khoản
	CHECK (AccountBalance >= 0)
);


CREATE TABLE Payments (
    InvoiceID INT PRIMARY KEY, -- Mã hóa đơn
    ClassID INT not null, -- Mã lớp học
    StudentID INT not null -- Mã học viên
);

CREATE TABLE Bills (
    BillID INT PRIMARY KEY, -- Mã hóa đơn
    IssueDate DATETIME not null, -- Thời gian xuất hóa đơn
    ClassName NVARCHAR(100), -- Tên lớp học
    Price DECIMAL(18, 2), -- Giá tiền
    PaymentMethod NVARCHAR(50), -- Phương thức thanh toán
	check (Price >= 0)
);

CREATE TABLE DoQuiz (
    StudentID INT, -- Mã học viên
    ClassID INT, -- Mã lớp học
    QuizName NVARCHAR(100), -- Tên quiz
    Score DECIMAL(5, 2), -- Điểm số
    PRIMARY KEY (StudentID, ClassID, QuizName)
);


ALTER TABLE Teachers
ADD CONSTRAINT FK_Teachers_Employees FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID);

ALTER TABLE Assisstants
ADD CONSTRAINT FK_Assistants_Employees FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID);

ALTER TABLE ConsultingEmployees
ADD CONSTRAINT FK_ConsultingEmployees_Employees FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID);

ALTER TABLE Messages
ADD CONSTRAINT FK_Messages_MessageSenders FOREIGN KEY (SenderID) REFERENCES MessageSenders(SenderID);

ALTER TABLE MessageSenders
ADD CONSTRAINT FK_MessageSenders_ConsultingEmployees FOREIGN KEY (SenderID) REFERENCES ConsultingEmployees(EmployeeID);

ALTER TABLE MessageSenders
ADD CONSTRAINT FK_MessageSenders_Students FOREIGN KEY (SenderID) REFERENCES Students(StudentID);

ALTER TABLE Classes
ADD CONSTRAINT FK_Classes_Teachers FOREIGN KEY (TeacherID) REFERENCES Teachers(EmployeeID);

ALTER TABLE Classes
ADD CONSTRAINT FK_Classes_Courses FOREIGN KEY (CourseID) REFERENCES Courses(CourseID);

ALTER TABLE Lessons
ADD CONSTRAINT FK_Lessons_Classes FOREIGN KEY (ClassID) REFERENCES Classes(ClassID);

ALTER TABLE Forums
ADD CONSTRAINT FK_Forums_Classes FOREIGN KEY (ClassID) REFERENCES Classes(ClassID);

ALTER TABLE Quizzes
ADD CONSTRAINT FK_Quizzes_Classes FOREIGN KEY (ClassID) REFERENCES Classes(ClassID);

ALTER TABLE Questions
ADD CONSTRAINT FK_Questions_Quizzes FOREIGN KEY (ClassID, QuizName) REFERENCES Quizzes(ClassID, QuizName);

ALTER TABLE Choices
ADD CONSTRAINT FK_Choices_Questions FOREIGN KEY (ClassID, QuizName, QuestionNumber) REFERENCES Questions(ClassID, QuizName, QuestionNumber);

ALTER TABLE Notifications
ADD CONSTRAINT FK_Notifications_Classes FOREIGN KEY (ClassID) REFERENCES Classes(ClassID);

ALTER TABLE AnswerChoices
ADD CONSTRAINT FK_AnswerChoices_Students FOREIGN KEY (StudentID) REFERENCES Students(StudentID);

ALTER TABLE AnswerChoices
ADD CONSTRAINT FK_AnswerChoices_Choices FOREIGN KEY (ClassID, QuizName, QuestionNumber, ChoiceText) REFERENCES Choices(ClassID, QuizName, QuestionNumber, ChoiceText);

ALTER TABLE Payments
ADD CONSTRAINT FK_Payments_Students FOREIGN KEY (StudentID) REFERENCES Students(StudentID);

ALTER TABLE Payments
ADD CONSTRAINT FK_Payments_Classes FOREIGN KEY (ClassID) REFERENCES Classes(ClassID);

ALTER TABLE Payments
ADD CONSTRAINT FK_Payments_Bills FOREIGN KEY (InvoiceID) REFERENCES Bills(BillID);

ALTER TABLE DoQuiz
ADD CONSTRAINT FK_StudentID_Students FOREIGN KEY (StudentID) REFERENCES Students(StudentID);

ALTER TABLE DoQuiz
ADD CONSTRAINT FK_Quiz_Quizzes FOREIGN KEY (classID, QuizName) REFERENCES Quizzes(classID, QuizName);


select * from Quizzes
--thêm dữ liệu

INSERT INTO Employees (EmployeeID, Email, Password, FirstName, LastName, PhoneNumber, Address, Salary, WorkHours, SupervisorID) 
VALUES
(1, 'teacher1@gmail.com', 'password1', 'Nguyen', 'An', '0123456789', 'Hanoi', 12300000, 40, NULL),
(2, 'teacher2@gmail.com', 'password2', 'Pham', 'Bao', '0987654321', 'HCM', 15000000, 40, NULL),
(3, 'teacher3@gmail.com', 'password3', 'Le', 'Chuong', '0912345678', 'Da Nang', 13000000, 40, NULL),
(4, 'assistant1@gmail.com', 'password4', 'Tran', 'Duong', '0123459876', 'Hanoi', 8000000, 35, 1),
(5, 'assistant2@gmail.com', 'password5', 'Nguyen', 'Khanh', '0987654322', 'HCM', 8500000, 35, 2),
(6, 'consultant1@gmail.com', 'password6', 'Bui', 'Long', '0912345544', 'Da Nang', 11000000, 40, NULL),
(7, 'consultant2@gmail.com', 'password7', 'Tran', 'Dan', '0923456789', 'Hue', 11500000, 40, NULL);

INSERT INTO Teachers (EmployeeID, Expertise, Experience)
VALUES
(1, 'Mathematics', 5),
(2, 'Physics', 8),
(3, 'Chemistry', 6);

INSERT INTO Assisstants (EmployeeID, EducationLevel, SpecializedSubject)
VALUES
(4, 'Bachelor', 'Mathematics'),
(5, 'Bachelor', 'Physics');

INSERT INTO ConsultingEmployees (EmployeeID, CommunicationSkill, Experience)
VALUES
(6, 'Good Comunication', 3),
(7, 'Excellent Comunication', 4);

-- Du lieu cho bang Courses
INSERT INTO Courses (CourseID, CourseName, Description)
VALUES
(1, 'Physics 12', 'Basic physical scourse includes topics such as dynamics, fluid mechanics, and thermodynamics.'),
(2, 'Chemistry 12', 'Basic chemical course, including atomic structure, chemical reactions, and basic chemical principles.'),
(3, 'Mathematics 12', 'Basic mathematics course, including algebra, calculus and basic geometry.');

-- Du lieu cho bang Classes
INSERT INTO Classes (ClassID, TeacherID, CourseID, ClassName, Price, StartDate, EndDate, Duration)
VALUES
(1, 2, 1, 'Physics Introduction', 500.00, '2024-01-01', '2024-12-31', 10),
(2, 3, 2, 'Chemistry Basics', 600.00, '2024-01-01', '2024-12-31', 10),
(3, 1, 3, 'Mathematics Fundamentals', 550.00, '2024-01-01', '2024-12-31', 10);

-- Du lieu cho bang Lessons
INSERT INTO Lessons (ClassID, LessonID, LessonDate, StartTime, EndTime, LessonContent)
VALUES
-- Lessons for Class 1 (Physics Introduction)
(1, 1, '2024-01-01', '08:00', '10:00', 'Introduction to Physics'),
(1, 2, '2024-01-03', '08:00', '10:00', 'Newtons Laws of Motion'),
(1, 3, '2024-01-05', '08:00', '10:00', 'Force and Acceleration'),
(1, 4, '2024-01-08', '08:00', '10:00', 'Work, Energy, and Power'),
(1, 5, '2024-01-10', '08:00', '10:00', 'Gravitational Force'),
(1, 6, '2024-01-12', '08:00', '10:00', 'Circular Motion'),
(1, 7, '2024-01-15', '08:00', '10:00', 'Momentum and Impulse'),
(1, 8, '2024-01-17', '08:00', '10:00', 'Conservation of Energy'),
(1, 9, '2024-01-19', '08:00', '10:00', 'Thermodynamics'),
(1, 10, '2024-01-22', '08:00', '10:00', 'Review and Final Exam');

-- Lessons for Class 2 (Chemistry Basics)
INSERT INTO Lessons (ClassID, LessonID, LessonDate, StartTime, EndTime, LessonContent)
VALUES
(2, 1, '2024-02-01', '09:00', '11:00', 'Introduction to Chemistry'),
(2, 2, '2024-02-03', '09:00', '11:00', 'Atomic Structure'),
(2, 3, '2024-02-05', '09:00', '11:00', 'Chemical Bonds'),
(2, 4, '2024-02-07', '09:00', '11:00', 'Stoichiometry'),
(2, 5, '2024-02-09', '09:00', '11:00', 'Acids and Bases'),
(2, 6, '2024-02-12', '09:00', '11:00', 'Organic Chemistry'),
(2, 7, '2024-02-14', '09:00', '11:00', 'Chemical Reactions'),
(2, 8, '2024-02-16', '09:00', '11:00', 'Thermochemistry'),
(2, 9, '2024-02-19', '09:00', '11:00', 'Chemical Kinetics'),
(2, 10, '2024-02-21', '09:00', '11:00', 'Review and Final Exam');

-- Lessons for Class 3 (Mathematics Fundamentals)
INSERT INTO Lessons (ClassID, LessonID, LessonDate, StartTime, EndTime, LessonContent)
VALUES
(3, 1, '2024-03-01', '10:00', '12:00', 'Introduction to Mathematics'),
(3, 2, '2024-03-03', '10:00', '12:00', 'Real Numbers and Operations'),
(3, 3, '2024-03-05', '10:00', '12:00', 'Linear Equations'),
(3, 4, '2024-03-07', '10:00', '12:00', 'Quadratic Equations'),
(3, 5, '2024-03-09', '10:00', '12:00', 'Functions and Graphs'),
(3, 6, '2024-03-12', '10:00', '12:00', 'Polynomials'),
(3, 7, '2024-03-14', '10:00', '12:00', 'Exponents and Logarithms'),
(3, 8, '2024-03-16', '10:00', '12:00', 'Trigonometry'),
(3, 9, '2024-03-19', '10:00', '12:00', 'Calculus Basics'),
(3, 10, '2024-03-21', '10:00', '12:00', 'Review and Final Exam');

INSERT INTO Forums (ClassID, ForumName)
VALUES
(1, 'Physics 12 Discussion'),
(2, 'Chemistry 12 Discussion'),
(3, 'Mathematics 12 Discussion');

-- Dữ liệu cho bảng Students với Gmail
INSERT INTO Students (StudentID, Email, Password, FirstName, LastName, PhoneNumber, Address, AccountBalance)
VALUES
(1, 'student1@gmail.com', 'password1', 'Nguyen', 'Hoang', '0123456789', 'Hanoi', 1000000),
(2, 'student2@gmail.com', 'password2', 'Pham', 'Minh', '0987654321', 'HCM', 1500000),
(3, 'student3@gmail.com', 'password3', 'Le', 'Thao', '0912345678', 'Da Nang', 2000000),
(4, 'student4@gmail.com', 'password4', 'Tran', 'Thien', '0123456789', 'Hanoi', 800000),
(5, 'student5@gmail.com', 'password5', 'Nguyen', 'Quoc', '0987654321', 'HCM', 1200000),
(6, 'student6@gmail.com', 'password6', 'Bui', 'Hieu', '0912345678', 'Da Nang', 1000000),
(7, 'student7@gmail.com', 'password7', 'Vo', 'Tuan', '0923456789', 'Hue', 1500000);
INSERT INTO Bills (BillID, IssueDate, ClassName, Price, PaymentMethod)
VALUES
(1, '2024-01-01', 'Physics Introduction', 500.00, 'Credit Card'),
(2, '2024-02-01', 'Chemistry Basics', 600.00, 'PayPal'),
(3, '2024-03-01', 'Mathematics Fundamentals', 550.00, 'Bank Transfer'),
(4, '2024-01-01', 'Physics Introduction', 500.00, 'Credit Card'),
(5, '2024-02-01', 'Chemistry Basics', 600.00, 'PayPal'),
(6, '2024-03-01', 'Mathematics Fundamentals', 550.00, 'Bank Transfer'),
(7, '2024-01-01', 'Physics Introduction', 500.00, 'Credit Card');
-- Thêm dữ liệu vào bảng Payments

INSERT INTO Payments (InvoiceID, ClassID, StudentID)
VALUES
(1, 1, 1), 
(2, 2, 2), 
(3, 3, 3), 
(4, 1, 4), 
(5, 2, 5), 
(6, 3, 6), 
(7, 1, 7); 
INSERT INTO Quizzes (ClassID, QuizName, TimeTaken) 
VALUES
(1, 'Physics Midterm Quiz', 45),
(2, 'Chemistry Midterm Quiz', 50),
(3, 'Mathematics Midterm Quiz', 40);
--
INSERT INTO Questions (ClassID, QuizName, QuestionNumber, QuestionText) 
VALUES
(1, 'Physics Midterm Quiz', 1, 'What is the unit of force?'),
(1, 'Physics Midterm Quiz', 2, 'What is Newton’s second law of motion?'),
(2, 'Chemistry Midterm Quiz', 1, 'What is the chemical symbol for water?'),
(2, 'Chemistry Midterm Quiz', 2, 'Which gas is most abundant in the Earth’s atmosphere?'),
(3, 'Mathematics Midterm Quiz', 1, 'Solve for x: 2x + 5 = 15'),
(3, 'Mathematics Midterm Quiz', 2, 'What is the derivative of x²?');


--
INSERT INTO Choices (ClassID, QuizName, QuestionNumber, ChoiceText, IsTrue) 
VALUES
(1, 'Physics Midterm Quiz', 1, 'Newton (N)', 1),
(1, 'Physics Midterm Quiz', 1, 'Joule (J)', 0),
(1, 'Physics Midterm Quiz', 2, 'F = ma', 1),
(1, 'Physics Midterm Quiz', 2, 'F = m/v', 0),
(2, 'Chemistry Midterm Quiz', 1, 'H2O', 1),
(2, 'Chemistry Midterm Quiz', 1, 'CO2', 0),
(2, 'Chemistry Midterm Quiz', 2, 'Nitrogen', 1),
(2, 'Chemistry Midterm Quiz', 2, 'Oxygen', 0),
(3, 'Mathematics Midterm Quiz', 1, 'x = 5', 1),
(3, 'Mathematics Midterm Quiz', 1, 'x = 10', 0),
(3, 'Mathematics Midterm Quiz', 2, '2x', 1),
(3, 'Mathematics Midterm Quiz', 2, 'x^2', 0);

-- Bảng AnswerChoices
INSERT INTO AnswerChoices (StudentID, ClassID, QuizName, QuestionNumber, ChoiceText, IsChosen) 
VALUES
(1, 1, 'Physics Midterm Quiz', 1, 'Newton (N)', 1),
(1, 1, 'Physics Midterm Quiz', 2, 'F = ma', 1),
(2, 2, 'Chemistry Midterm Quiz', 1, 'H2O', 1),
(2, 2, 'Chemistry Midterm Quiz', 2, 'Nitrogen', 1),
(3, 3, 'Mathematics Midterm Quiz', 1, 'x = 5', 1),
(3, 3, 'Mathematics Midterm Quiz', 2, '2x', 1);

-- Bảng Comments

INSERT INTO Comments (ClassID, ForumName, CommentID, PostedTime, Content, ReplyToCommentID, UserID) 
VALUES
(1, 'Physics 12 Discussion', 1, '2024-11-27 08:00:00', 'Can anyone explain Newton’s second law?', NULL, 1),
(2, 'Chemistry 12 Discussion', 2, '2024-11-27 09:00:00', 'How does Stoichiometry work?', NULL, 2),
(3, 'Mathematics 12 Discussion', 3, '2024-11-27 10:00:00', 'What is the shortcut for derivatives?', NULL, 3);

-- Bảng Commentators
INSERT INTO Commentators (CommentatorID) 
VALUES
(6),
(7);
Select * from ConsultingEmployees


-- Bảng MessageSenders
INSERT INTO MessageSenders (SenderID) 
VALUES
(6),
(7);
-- Bảng Messages
INSERT INTO Messages (MessageID, SentDate, Content, SenderID) 
VALUES
(1, '2024-11-26 08:00:00', 'Hello, I need help with Physics Quiz.', 6),
(2, '2024-11-26 08:30:00', 'Sure, what specific question?', 7);
-- Bảng Notifications
INSERT INTO Notifications (ClassID, NotificationName, TimeSent, Content) 
VALUES
(1, 'Quiz Reminder', '2024-11-26 07:00:00', 'Physics Quiz starts in 1 hour!'),
(2, 'Quiz Results Available', '2024-11-27 12:00:00', 'Results for Chemistry Quiz are now live.'),
(3, 'Class Reminder', '2024-11-27 08:00:00', 'Don’t forget to attend Mathematics Class tomorrow.');
 -- Insert quiz data into DoQuiz table
INSERT INTO DoQuiz (StudentID, ClassID, QuizName, Score) 
VALUES
(1, 1, 'Physics Midterm Quiz', 85.00),
(2, 2, 'Chemistry Midterm Quiz', 90.00),
(3, 3, 'Mathematics Midterm Quiz', 95.00),
(4, 1, 'Physics Midterm Quiz', 78.00),
(5, 2, 'Chemistry Midterm Quiz', 88.00),
(6, 3, 'Mathematics Midterm Quiz', 92.00),
(7, 1, 'Physics Midterm Quiz', 80.00);


select * from Classes
CREATE FUNCTION GetQuizScoresByTeacher (@TeacherID INT)
RETURNS TABLE
AS
RETURN
    SELECT 
        s.StudentID, 
        s.FirstName, 
        s.LastName, 
        dq.Score, 
        dq.ClassID, 
        dq.QuizName
    FROM 
        Students s
    JOIN 
        DoQuiz dq ON s.StudentID = dq.StudentID
    JOIN 
        Classes c ON dq.ClassID = c.ClassID
    WHERE 
        c.TeacherID = @TeacherID

SELECT * FROM dbo.GetQuizScoresByTeacher(1)
ORDER BY StudentID, QuizName;



CREATE FUNCTION GetActiveClassesByStudent (@StudentID INT)
RETURNS TABLE
AS
RETURN
    SELECT 
        c.ClassID,
        c.ClassName,
        co.CourseName,
        c.Price,
        c.StartDate,
        c.EndDate,
        c.Duration
    FROM 
        Payments p
    JOIN 
        Classes c ON p.ClassID = c.ClassID
    JOIN 
        Courses co ON c.CourseID = co.CourseID
    WHERE 
        p.StudentID = @StudentID  
        AND c.EndDate >= GETDATE() 
    

SELECT * FROM dbo.GetActiveClassesByStudent(1)
ORDER BY StartDate;

CREATE TRIGGER UpdateNumQuestions
ON Questions
AFTER INSERT, DELETE
AS
BEGIN
    UPDATE Quizzes
    SET NumQuestions = (
        SELECT COUNT(*) 
        FROM Questions 
        WHERE Quizzes.ClassID = Questions.ClassID AND Quizzes.QuizName = Questions.QuizName
    )
    WHERE EXISTS (
        SELECT 1
        FROM Inserted I
        WHERE Quizzes.ClassID = I.ClassID AND Quizzes.QuizName = I.QuizName
    )
    OR EXISTS (
        SELECT 1
        FROM Deleted D
        WHERE Quizzes.ClassID = D.ClassID AND Quizzes.QuizName = D.QuizName
    );
END;

CREATE TRIGGER UpdateNumberOfStudents
ON Payments
AFTER INSERT, DELETE
AS
BEGIN
    UPDATE Classes
    SET NumberOfStudents = (
        SELECT COUNT(*)
        FROM Payments P
        WHERE P.ClassID = Classes.ClassID
    )
    WHERE EXISTS (
        SELECT 1
        FROM Inserted I
        WHERE Classes.ClassID = I.ClassID
    )
    OR EXISTS (
        SELECT 1
        FROM Deleted D
        WHERE Classes.ClassID = D.ClassID
    );
END;

