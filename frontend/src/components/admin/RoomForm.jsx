import { useState, useEffect } from "react";
const RoomForm = ({ visible, onClose, onSave, initial, allGames }) => {
  const [form, setForm] = useState(
    initial || { name: "", capacity: 2, status: "", imageUrl: "", games: [] }
  );

  useEffect(() => {
    setForm(
      initial || { name: "", capacity: 2, status: "", imageUrl: "", games: [] }
    );
  }, [initial]);

  if (!visible) return null;

  const handleSubmit = () => {
    if (!form.name.trim()) return alert("Tên phòng là bắt buộc");
    if (form.capacity < 1) return alert("Sức chứa phải là số dương");
    if (!form.status.trim()) return alert("Trạng thái phòng là bắt buộc");
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-lg shadow-lg border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">
          {initial ? "Chỉnh sửa Phòng" : "Tạo Phòng mới"}
        </h3>

        <div className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm">Tên Phòng</label>
            <input
              className="w-full mt-1 p-2 bg-gray-800 text-white rounded"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm">Sức chứa</label>
            <input
              type="number"
              className="w-full mt-1 p-2 bg-gray-800 text-white rounded"
              value={form.capacity}
              onChange={(e) =>
                setForm({ ...form, capacity: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm">Trạng thái</label>
            <select
              className="w-full mt-1 p-2 bg-gray-800 text-white rounded"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="">-- Chọn trạng thái --</option>
              <option>AVAILABLE</option>
              <option>MAINTENANCE</option>
              <option>IN_USE</option>
              <option>BOOKED</option>
            </select>
          </div>

          <div>
            <label className="text-gray-400 text-sm">Hình ảnh</label>
            <input
              type="text"
              className="w-full mt-1 p-2 bg-gray-800 text-white rounded"
              placeholder="Nhập URL hình ảnh"
              value={form.imageUrl || ""}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-1 block">
              Chọn Game
            </label>
            <div className="max-h-32 overflow-y-auto bg-gray-800 p-2 rounded space-y-1">
              {allGames.map((g) => {
                const checked = form.games?.includes(g.id);
                return (
                  <label
                    key={g.id}
                    className="flex items-center gap-2 text-white text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        const updated = checked
                          ? form.games.filter((x) => x !== g.id)
                          : [...form.games, g.id];
                        setForm({ ...form, games: updated });
                      }}
                    />
                    {g.name}
                  </label>
                );
              })}
            </div>
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

export default RoomForm;
