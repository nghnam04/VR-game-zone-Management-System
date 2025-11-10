import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import DeviceForm from "../../components/admin/DeviceForm";
import { Trash2, Edit, PlusCircle } from "lucide-react";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const getStatusBadge = (status) => {
  switch (status) {
    case "AVAILABLE":
      return "bg-green-500/30 text-green-300";
    case "IN_USE":
      return "bg-yellow-500/30 text-yellow-300";
    case "MAINTENANCE":
      return "bg-red-500/30 text-red-300";
    default:
      return "bg-gray-500/30 text-gray-300";
  }
};

const getTypeBadge = (type) => {
  switch (type) {
    case "HEADSET":
      return "text-cyan-300";
    case "CONTROLLER":
      return "text-indigo-300";
    case "HEADPHONE":
      return "text-pink-300";
    case "SENSOR":
      return "text-yellow-300";
    case "CAMERA":
      return "text-orange-300";
    case "MICROPHONE":
      return "text-lime-300";
    default:
      return "text-gray-300";
  }
};

const DeviceManagement = () => {
  const [devices, setDevices] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [devicesRes, roomsRes] = await Promise.all([
        axiosInstance.get("/devices"),
        axiosInstance.get("/rooms"),
      ]);
      setDevices(devicesRes.data);
      setRooms(roomsRes.data);
      setError(null);
    } catch (err) {
      setError("Không thể tải danh sách thiết bị hoặc phòng.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa thiết bị ID: ${id}?`))
      return;
    try {
      await axiosInstance.delete(`/devices/${id}`);
      alert("Xóa thiết bị thành công!");
      fetchAll();
    } catch (err) {
      alert(
        "Lỗi khi xóa thiết bị. Chỉ xóa được thiết bị có trạng thái AVAILABLE."
      );
      console.error(err);
    }
  };

  const handleSave = async (payload) => {
    try {
      if (editing) {
        await axiosInstance.put(`/devices/${editing.id}`, payload);
        alert("Cập nhật thiết bị thành công!");
      } else {
        await axiosInstance.post("/devices", payload);
        alert("Thêm thiết bị mới thành công!");
      }
      setFormVisible(false);
      setEditing(null);
      fetchAll();
    } catch (err) {
      alert(
        "Lỗi khi lưu thiết bị. Chỉ thiết bị trạng thái AVAILABLE mới có thể chỉnh sửa."
      );
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center p-10 font-display text-vr-blue text-2xl gap-4">
        <div className="flex justify-center items-center gap-3">
          <LoadingSpinner />
          <span>Đang tải chi tiết thiết bị...</span>
        </div>
      </div>
    );
  }

  if (error)
    return (
      <div className="text-red-400 p-4 bg-red-900/30 rounded">{error}</div>
    );

  return (
    <div>
      <h2 className="text-3xl font-display text-white mb-6">
        Quản lý Thiết bị ({devices.length})
      </h2>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setEditing(null);
            setFormVisible(true);
          }}
          className="btn-primary flex items-center"
        >
          <PlusCircle size={18} className="mr-2" /> Thêm Thiết bị mới
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
                Tên
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-300 uppercase">
                Loại
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-300 uppercase">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-300 uppercase">
                Số lượng
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-300 uppercase">
                Phòng
              </th>
              <th className="px-6 py-3 text-right text-xs text-gray-300 uppercase">
                Hành động
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-800">
            {devices.map((device) => (
              <tr
                key={device.id}
                className="hover:bg-gray-700/50 transition duration-150"
              >
                <td className="px-6 py-4 text-gray-400 text-sm">{device.id}</td>
                <td className="px-6 py-4 font-medium text-white">
                  {device.name}
                </td>
                <td
                  className={`px-6 py-4 font-semibold text-sm ${getTypeBadge(
                    device.type
                  )}`}
                >
                  {device.type}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                      device.status
                    )}`}
                  >
                    {device.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-300 text-sm">
                  {device.quantity}
                </td>
                <td className="px-6 py-4 text-yellow-300 text-sm">
                  {device.roomName || "Chưa gắn phòng"}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        setEditing(device);
                        setFormVisible(true);
                      }}
                      className="text-indigo-400 hover:text-indigo-300 mr-3"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(device.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeviceForm
        visible={formVisible}
        onClose={() => {
          setFormVisible(false);
          setEditing(null);
        }}
        onSave={handleSave}
        initial={editing}
        rooms={rooms}
      />
    </div>
  );
};

export default DeviceManagement;
