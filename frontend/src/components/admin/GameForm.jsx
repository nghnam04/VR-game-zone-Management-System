import { useEffect, useState } from "react";

const GameForm = ({ visible, onClose, onSave, initial, allRooms }) => {
  const [form, setForm] = useState(
    initial || {
      name: "",
      genre: "",
      imageUrl: "",
      description: "",
      duration: 60,
      price: 100,
      maxPlayers: 4,
      rooms: [],
    }
  );

  const [error, setError] = useState("");

  useEffect(() => {
    setForm(
      initial || {
        name: "",
        genre: "",
        imageUrl: "",
        description: "",
        duration: 60,
        price: 100,
        maxPlayers: 4,
        rooms: [],
      }
    );
    setError("");
  }, [initial]);

  if (!visible) return null;

  const handleSubmit = () => {
    if (!form.name.trim()) return setError("Tên game là bắt buộc");
    if (!form.genre.trim()) return setError("Thể loại là bắt buộc");
    if (form.duration <= 0) return setError("Thời lượng phải lớn hơn 0");
    if (form.duration > 120) return setError("Thời lượng tối đa là 120 phút");
    if (form.price <= 0) return setError("Giá tiền phải lớn hơn 0");
    if (form.maxPlayers <= 0) return setError("Số người chơi phải là số dương");
    setError("");
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-lg shadow-lg border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">
          {initial ? "Chỉnh sửa Game" : "Thêm Game mới"}
        </h3>

        {error && (
          <div className="bg-red-700/30 text-red-300 px-4 py-2 rounded mb-3">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm">Tên game</label>
            <input
              className="w-full mt-1 p-2 bg-gray-800 text-white rounded"
              placeholder="Nhập tên game"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm">Thể loại</label>
            <select
              className="w-full mt-1 p-2 bg-gray-800 text-white rounded"
              value={form.genre}
              onChange={(e) => setForm({ ...form, genre: e.target.value })}
            >
              <option value="">-- Chọn thể loại --</option>
              <option>ACTION</option>
              <option>ADVENTURE</option>
              <option>SPORTS</option>
              <option>HORROR</option>
              <option>PUZZLE</option>
              <option>RACING</option>
              <option>SIMULATION</option>
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
            <label className="text-gray-400 text-sm">Mô tả</label>
            <textarea
              className="w-full mt-1 p-2 bg-gray-800 text-white rounded"
              rows="4"
              placeholder="Giới thiệu sơ lược về trò chơi..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-gray-400 text-sm">Thời lượng (phút)</label>
              <input
                type="number"
                className="w-full mt-1 p-2 bg-gray-800 text-white rounded"
                value={form.duration}
                onChange={(e) =>
                  setForm({ ...form, duration: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm">Giá (nghìn đồng)</label>
              <input
                type="number"
                className="w-full mt-1 p-2 bg-gray-800 text-white rounded"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm">Số người chơi</label>
              <input
                type="number"
                className="w-full mt-1 p-2 bg-gray-800 text-white rounded"
                value={form.maxPlayers}
                onChange={(e) =>
                  setForm({ ...form, maxPlayers: Number(e.target.value) })
                }
              />
            </div>
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-1 block">
              Phòng hỗ trợ
            </label>
            <div className="max-h-32 overflow-y-auto bg-gray-800 p-2 rounded space-y-1">
              {allRooms.map((r) => {
                const checked = form.rooms?.includes(r.id);
                return (
                  <label
                    key={r.id}
                    className="flex items-center gap-2 text-white text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        const updated = checked
                          ? form.rooms.filter((x) => x !== r.id) //bỏ chọn
                          : [...form.rooms, r.id];
                        setForm({ ...form, rooms: updated });
                      }}
                    />
                    {r.name}
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

export default GameForm;
