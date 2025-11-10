import { useState, useEffect } from "react";
import axiosInstance from "../../api/axios";
import RoomForm from "../../components/admin/RoomForm";
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
    case "BOOKED":
      return "bg-blue-500/30 text-blue-300";
    default:
      return "bg-gray-500/30 text-gray-300";
  }
};

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [editing, setEditing] = useState(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [roomsRes, gamesRes] = await Promise.all([
        axiosInstance.get("/rooms"),
        axiosInstance.get("/games"),
      ]);

      // const gamesMap = Object.fromEntries(
      //   gamesRes.data.map((g) => [g.id, g.name])
      // );

      const roomsWithGameNames = roomsRes.data.map((r) => ({
        ...r,
        gameNames: r.gameNames || [],
      }));

      setRooms(roomsWithGameNames);
      setAllGames(gamesRes.data);
    } catch (err) {
      alert("Không thể tải danh sách phòng hoặc game");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa Room ID: ${id}?`)) return;
    try {
      await axiosInstance.delete(`/rooms/${id}`);
      fetchAll();
    } catch (err) {
      alert("Lỗi khi xóa phòng. Phòng có thể đang được đặt.");
      console.error(err);
    }
  };

  const handleSave = async (data) => {
    try {
      if (editing) await axiosInstance.put(`/rooms/${editing.id}`, data);
      else await axiosInstance.post("/rooms", data);
      setFormVisible(false);
      setEditing(null);
      fetchAll();
    } catch (err) {
      alert("Lỗi khi lưu phòng!");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center p-10 font-display text-vr-blue text-2xl gap-4">
        <div className="flex justify-center items-center gap-3">
          <LoadingSpinner />
          <span>Đang tải chi tiết phòng...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-display text-white mb-6">
        Quản lý Phòng ({rooms.length})
      </h2>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setEditing(null);
            setFormVisible(true);
          }}
          className="btn-primary flex items-center"
        >
          <PlusCircle size={18} className="mr-2" /> Tạo Phòng Mới
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
                Tên Phòng
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-300 uppercase">
                Sức chứa
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-300 uppercase">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-300 uppercase">
                Game hiện có
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-300 uppercase">
                Thiết bị hỗ trợ
              </th>
              <th className="px-6 py-3 text-right text-xs text-gray-300 uppercase">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {rooms.map((r) => (
              <tr
                key={r.id}
                className="hover:bg-gray-700/50 transition duration-150"
              >
                <td className="px-6 py-4 text-gray-400">{r.id}</td>
                <td className="px-6 py-4 text-white font-medium">{r.name}</td>
                <td className="px-6 py-4 text-gray-400">{r.capacity}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 inline-flex text-xs rounded-full ${getStatusBadge(
                      r.status
                    )}`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-6 py-4 max-w-xs text-sm text-green-500 truncate">
                  {r.gameNames?.join(", ")}
                </td>
                <td className="px-6 py-4 max-w-xs text-sm text-blue-500 truncate">
                  {r.deviceNames?.join(", ")}
                </td>
                <td className="flex px-6 py-4 text-right space-x-3">
                  <button
                    className="text-indigo-400 hover:text-indigo-300"
                    onClick={() => {
                      setEditing(r);
                      setFormVisible(true);
                    }}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => handleDelete(r.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RoomForm
        visible={formVisible}
        onClose={() => {
          setFormVisible(false);
          setEditing(null);
        }}
        onSave={handleSave}
        initial={editing}
        allGames={allGames}
      />
    </div>
  );
};

export default RoomManagement;
