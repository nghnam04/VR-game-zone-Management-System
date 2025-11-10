import { useState, useEffect } from "react";

const UserForm = ({ visible, onClose, onSave, initial }) => {
  const [form, setForm] = useState(
    initial || {
      name: "",
      username: "",
      email: "",
      password: "",
      roleName: "",
    }
  );

  const [error, setError] = useState("");

  useEffect(() => {
    setForm(
      initial || {
        name: "",
        username: "",
        email: "",
        password: "",
        roleName: "",
      }
    );
    setError("");
  }, [initial]);

  if (!visible) return null;

  const handleSubmit = () => {
    if (!form.name.trim()) return setError("Họ và tên là bắt buộc");
    if (!form.username.trim()) return setError("Tên đăng nhập là bắt buộc");
    if (!form.email.trim()) return setError("Email là bắt buộc");

    if (!initial) {
      if (!form.password.trim())
        return setError("Mật khẩu là bắt buộc khi tạo user mới");
      if (form.password.trim().length < 5)
        return setError("Mật khẩu phải có ít nhất 5 ký tự");
      return onSave(form);
    }

    const { password, ...rest } = form;
    onSave(rest);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-lg shadow-lg border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">
          {initial ? "Chỉnh sửa User" : "Tạo User mới"}
        </h3>

        {error && (
          <div className="bg-red-700/30 text-red-300 px-4 py-2 rounded mb-3">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm">Họ và tên</label>
            <input
              className="w-full mt-1 p-2 bg-gray-800 text-white rounded"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Nhập họ và tên"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm">Tên đăng nhập</label>
            <input
              className="w-full mt-1 p-2 bg-gray-800 text-white rounded"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="Nhập tên đăng nhập"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-2 bg-gray-800 text-white rounded"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Nhập email"
            />
          </div>

          {!initial && (
            <div>
              <label className="text-gray-400 text-sm">Mật khẩu</label>
              <input
                type="password"
                className="w-full mt-1 p-2 bg-gray-800 text-white rounded"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Nhập mật khẩu"
              />
            </div>
          )}

          <div>
            <label className="text-gray-400 text-sm">Vai trò</label>
            <select
              className="w-full mt-1 p-2 bg-gray-800 text-white rounded"
              value={form.roleName}
              onChange={(e) => setForm({ ...form, roleName: e.target.value })}
            >
              <option value="">-- Chọn vai trò --</option>
              <option>CUSTOMER</option>
              <option>STAFF</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-cyan-500 hover:bg-blue-700 text-white rounded"
          >
            {initial ? "Lưu thay đổi" : "Tạo mới"}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
