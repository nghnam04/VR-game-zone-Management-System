import { useState, useEffect } from "react";
import axiosInstance from "../../api/axios";
import { Trash2, Edit, UserPlus } from "lucide-react";
import UserForm from "../../components/admin/UserForm";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const roleBadge = (role) => {
  switch (role) {
    case "ADMIN":
      return "bg-red-500/30 text-red-300";
    case "STAFF":
      return "bg-yellow-500/30 text-yellow-300";
    default:
      return "bg-green-500/30 text-green-300";
  }
};

const roleMap = {
  ADMIN: { id: 1, name: "ADMIN" },
  STAFF: { id: 2, name: "STAFF" },
  CUSTOMER: { id: 3, name: "CUSTOMER" },
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [editing, setEditing] = useState(null);
  const [fetchError, setFetchError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/users");

      const formattedUsers = res.data.map((u) => ({
        ...u,
        role: u.role && u.role.name ? u.role : roleMap["CUSTOMER"],
      }));

      setUsers(formattedUsers);
      setFetchError("");
    } catch (err) {
      console.error(err);
      setFetchError("Không thể tải danh sách người dùng.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Xóa User sẽ xóa Booking và Feedback tương ứng. Bạn có chắc chắn muốn xóa User này?"
      )
    )
      return;

    try {
      await axiosInstance.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          err?.response?.data ||
          "Lỗi khi xóa người dùng"
      );
    }
  };

  const handleSave = async (data) => {
    try {
      const payload = {
        name: data.name,
        username: data.username,
        email: data.email,
        ...(data.password ? { password: data.password } : {}),
        role: {
          id: roleMap[data.roleName].id,
          name: roleMap[data.roleName].name,
        },
      };

      if (editing) await axiosInstance.put(`/users/${editing.id}`, payload);
      else await axiosInstance.post("/users", payload);

      setFormVisible(false);
      setEditing(null);
      fetchUsers();
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Lỗi khi lưu dữ liệu người dùng"
      );
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center p-10 font-display text-vr-blue text-2xl gap-4">
        <div className="flex justify-center items-center gap-3">
          <LoadingSpinner />
          <span>Đang tải chi tiết người dùng...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-3xl font-display text-white mb-6">
        Quản lý Người dùng ({users.length})
      </h2>

      {fetchError && (
        <div className="bg-red-900/30 text-red-400 p-3 rounded mb-4">
          {fetchError}
        </div>
      )}

      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setEditing(null);
            setFormVisible(true);
          }}
          className="btn-primary flex items-center"
        >
          <UserPlus size={18} className="mr-2" /> Tạo User Mới
        </button>
      </div>

      <div className="overflow-x-auto card-base p-4">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs text-gray-300 uppercase">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-300 uppercase">
                Người dùng
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-300 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-300 uppercase">
                Vai trò
              </th>
              <th className="px-6 py-3 text-right text-xs text-gray-300 uppercase">
                Hành động
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-800">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-700/50 transition">
                <td className="px-6 py-4 text-gray-400">{u.id}</td>
                <td className="px-6 py-4 text-white font-medium">{u.name}</td>
                <td className="px-6 py-4 text-gray-400">{u.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${roleBadge(
                      u.role.name
                    )}`}
                  >
                    {u.role.name}
                  </span>
                </td>

                <td className="flex px-6 py-4 justify-end space-x-3">
                  <button
                    className="text-indigo-400 hover:text-indigo-300"
                    onClick={() => {
                      setEditing({
                        id: u.id,
                        name: u.name,
                        username: u.username,
                        email: u.email,
                        roleName: u.role.name,
                      });
                      setFormVisible(true);
                    }}
                  >
                    <Edit size={18} />
                  </button>

                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => handleDelete(u.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UserForm
        visible={formVisible}
        onClose={() => {
          setFormVisible(false);
          setEditing(null);
        }}
        onSave={handleSave}
        initial={editing}
      />
    </>
  );
};

export default UserManagement;
