import { useState, useEffect } from "react";

const DeviceForm = ({ visible, onClose, onSave, initial, rooms }) => {
  const [form, setForm] = useState(
    initial || {
      name: "",
      type: "",
      status: "",
      imageUrl: "",
      roomId: null,
      quantity: 1,
    }
  );
  useEffect(
    () =>
      setForm(
        initial || {
          name: "",
          type: "",
          status: "",
          imageUrl: "",
          roomId: null,
          quantity: 1,
        }
      ),
    [initial]
  );

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-lg shadow-lg border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">
          {initial ? "Chỉnh sửa Thiết bị" : "Thêm Thiết bị mới"}
        </h3>

        <div className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm">Tên thiết bị</label>
            <input
              className="w-full mt-1 p-2 bg-gray-800 text-white rounded"
              placeholder="Nhập tên thiết bị"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm">Loại thiết bị</label>
            <select
              className="w-full mt-1 p-2 bg-gray-800 text-white rounded"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="">-- Chọn loại thiết bị --</option>
              <option>HEADSET</option>
              <option>CONTROLLER</option>
              <option>HEADPHONE</option>
              <option>SENSOR</option>
              <option>CAMERA</option>
              <option>MICROPHONE</option>
            </select>
          </div>

          <div>
            <label className="text-gray-400 text-sm">Trạng thái</label>
            <select
              className="w-full mt-1 p-2 bg-gray-800 text-white rounded"
              value={form.status}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="">-- Chọn trạng thái --</option>
              <option>AVAILABLE</option>
              <option>MAINTENANCE</option>
              <option>IN_USE</option>
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
            <label className="text-gray-400 text-sm">Phòng</label>
            <select
              className="w-full mt-1 p-2 bg-gray-800 text-white rounded"
              value={form.roomId || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  roomId: e.target.value ? Number(e.target.value) : null,
                })
              }
            >
              <option value="">Chưa gắn phòng</option>
              {rooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-gray-400 text-sm">Số lượng</label>
            <input
              type="number"
              min="1"
              className="w-full mt-1 p-2 bg-gray-800 text-white rounded"
              value={form.quantity}
              onChange={(e) =>
                setForm({ ...form, quantity: Number(e.target.value) })
              }
            />
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={() => onSave(form)}
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

export default DeviceForm;
