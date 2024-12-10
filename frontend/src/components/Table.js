export default function Table({ data, onEdit, onDelete }) {
    return (
      <div className="max-h-[400px] overflow-y-auto"> {/* Giới hạn chiều cao bảng và thêm cuộn dọc */}
        <table className="min-w-full bg-white border border-gray-300 table-fixed">
          <thead className="bg-blue-100 sticky top-[-1px] z-10"> {/* Sticky header để giữ phần tiêu đề */}
            <tr>
              <th className="px-4 py-2 border-b text-left w-[10%]">ID</th>
              <th className="px-4 py-2 border-b text-left w-[15%]">Tên NV</th>
              <th className="px-4 py-2 border-b text-left w-[20%]">Email</th>
              <th className="px-4 py-2 border-b text-left w-[15%]">SDT</th>
              <th className="px-4 py-2 border-b text-left w-[15%]">Chức vụ</th>
              <th className="px-4 py-2 border-b text-left w-[15%]">Lương</th>
              <th className="px-4 py-2 border-b text-left w-[10%]">Chuyên môn</th>
              <th className="px-4 py-2 border-b text-left w-[15%]">Kinh nghiệm</th>
              <th className="px-4 py-2 border-b text-left w-[15%]">Kĩ năng giao tiếp</th>
              <th className="px-4 py-2 border-b text-center w-[20%]">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.id}
                className={`${
                  index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                } hover:bg-gray-200`}
              >
                <td className="px-4 py-2 border-b">{row.id}</td>
                <td className="px-4 py-2 border-b">{row.name}</td>
                <td className="px-4 py-2 border-b">{row.email}</td>
                <td className="px-4 py-2 border-b">{row.phone}</td>
                <td className="px-4 py-2 border-b">{row.position}</td>
                <td className="px-4 py-2 border-b">{row.salary}</td>
                <td className="px-4 py-2 border-b">{row.specialization}</td>
                <td className="px-4 py-2 border-b">{row.experience}</td>
                <td className="px-4 py-2 border-b">{row.communicationSkills}</td>
                <td className="px-4 py-2 border-b text-center">
                  <button
                    onClick={() => onEdit(row)}
                    className="mr-2 p-2 bg-yellow-400 text-white rounded hover:bg-yellow-600"
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    onClick={() => onDelete(row.id)}
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-700"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  