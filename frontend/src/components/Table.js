export default function Table({ data, onEdit }) {
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
                <td className="px-4 py-2 border-b">{row.ID}</td>
                <td className="px-4 py-2 border-b">{row.FullName}</td>
                <td className="px-4 py-2 border-b">{row.Email}</td>
                <td className="px-4 py-2 border-b">{row.PhoneNumber}</td>
                <td className="px-4 py-2 border-b">{row.Position}</td>
                <td className="px-4 py-2 border-b">{row.Salary}</td>
                <td className="px-4 py-2 border-b">{row.Expertise}</td>
                <td className="px-4 py-2 border-b">{row.Experience}</td>
                <td className="px-4 py-2 border-b">{row.CommunicationSkill}</td>
                <td className="px-4 py-2 border-b text-center">
                  <button
                    onClick={() => onEdit(row)}
                    className="mr-2 p-2 bg-yellow-400 text-white rounded hover:bg-yellow-600"
                  >
                    Chỉnh sửa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  