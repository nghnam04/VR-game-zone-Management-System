import { useState, useEffect } from "react";
import { Trash2, Edit, PlusCircle } from "lucide-react";
import axiosInstance from "../../api/axios";
import GameForm from "../../components/admin/GameForm";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import formatCurrency from "../../components/utils/formatCurrency";

const getTypeBadge = (genre) => {
  switch (genre?.toUpperCase()) {
    case "SPORTS":
      return "bg-green-500/30 text-green-400 border-green-500";
    case "PUZZLE":
      return "bg-yellow-500/30 text-yellow-400 border-yellow-500";
    case "HORROR":
      return "bg-red-500/30 text-red-400 border-red-500";
    case "ADVENTURE":
      return "bg-blue-500/30 text-blue-400 border-blue-500";
    case "ACTION":
      return "bg-pink-500/30 text-pink-400 border-pink-500";
    case "SIMULATION":
      return "bg-purple-500/30 text-purple-400 border-purple-500";
    case "RACING":
      return "bg-orange-500/30 text-orange-400 border-orange-500";
    default:
      return "bg-gray-500/30 text-gray-400 border-gray-500";
  }
};

const GameManagement = () => {
  const [games, setGames] = useState([]);
  const [allRooms, setAllRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [editing, setEditing] = useState(null);
  const [fetchError, setFetchError] = useState("");

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [gamesRes, roomsRes] = await Promise.all([
        axiosInstance.get("/games"),
        axiosInstance.get("/rooms"),
      ]);

      // chuyển thành object
      // const roomsMap = Object.fromEntries(
      //   roomsRes.data.map((r) => [r.id, r.name])
      // );

      const gamesWithRoomNames = gamesRes.data.map((g) => ({
        ...g,
        roomNames: g.roomNames || [],
      }));

      setGames(gamesWithRoomNames);
      setAllRooms(roomsRes.data);
      setFetchError("");
    } catch (err) {
      console.error(err);
      setFetchError("Không thể tải danh sách game hoặc phòng.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa game ID: ${id}?`)) return;
    try {
      await axiosInstance.delete(`/games/${id}`);
      fetchAll();
    } catch (err) {
      alert("Lỗi khi xóa game. Game có thể đang được đặt.");
      console.error(err);
    }
  };

  const handleSave = async (data) => {
    try {
      if (editing) await axiosInstance.put(`/games/${editing.id}`, data);
      else await axiosInstance.post("/games", data);
      setFormVisible(false);
      setEditing(null);
      fetchAll();
    } catch (err) {
      alert("Lỗi khi lưu game!");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center p-10 font-display text-vr-blue text-2xl gap-4">
        <div className="flex justify-center items-center gap-3">
          <LoadingSpinner />
          <span>Đang tải chi tiết game...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-3xl font-display text-white mb-6">
        Quản lý Game ({games.length})
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
          <PlusCircle size={18} className="mr-2" /> Tạo Game Mới
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
                Tên Game
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-300 uppercase">
                Số người tối đa
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-300 uppercase">
                Thể loại
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-300 uppercase">
                Phòng
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-300 uppercase">
                Giá thuê/người/giờ
              </th>
              <th className="px-6 py-3 text-right text-xs text-gray-300 uppercase">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {games.map((g) => (
              <tr
                key={g.id}
                className="hover:bg-gray-700/50 transition duration-150"
              >
                <td className="px-6 py-4 text-gray-400">{g.id}</td>
                <td className="px-6 py-4 text-white font-medium">{g.name}</td>
                <td className="px-6 py-4 text-gray-400">{g.maxPlayers}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeBadge(
                      g.genre
                    )}`}
                  >
                    {g.genre}
                  </span>
                </td>
                <td className="px-6 py-4 max-w-xs text-sm text-yellow-400 truncate">
                  {g.roomNames.join(", ")}
                </td>
                <td className="px-6 py-4 text-sm text-right text-green-400">
                  {formatCurrency(g.price)}
                </td>
                <td className="flex px-6 py-4 text-right text-sm font-medium space-x-3">
                  <button
                    className="text-indigo-400 hover:text-indigo-300"
                    onClick={() => {
                      setEditing(g);
                      setFormVisible(true);
                    }}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => handleDelete(g.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GameForm
        visible={formVisible}
        onClose={() => {
          setFormVisible(false);
          setEditing(null);
        }}
        onSave={handleSave}
        initial={editing}
        allRooms={allRooms}
      />
    </>
  );
};

export default GameManagement;
