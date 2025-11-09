import React from "react";
import { useParams, Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import roomService from "../../services/roomService";
import { motion } from "framer-motion";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const getStatusClass = (status) => {
  switch (status) {
    case "AVAILABLE":
      return "text-green-400";
    case "IN_USE":
      return "text-yellow-400";
    case "MAINTENANCE":
      return "text-red-400";
    case "BOOKED":
      return "text-blue-400";
    default:
      return "text-gray-400";
  }
};

const RoomDetail = () => {
  const { id } = useParams();
  const {
    data: room,
    loading,
    error,
  } = useFetch(() => roomService.getRoomById(id), [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center p-10 font-display text-vr-blue text-2xl gap-4">
        <div className="flex justify-center items-center gap-3">
          <LoadingSpinner />
          <span>Đang tải thông tin phòng...</span>
        </div>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="text-center p-10 text-red-400">
        Lỗi: Không tìm thấy phòng
      </div>
    );
  }

  const imageUrl =
    room.imageUrl ||
    `https://placehold.co/1200x600/0096c7/071022?text=${room.name.replace(
      /\s/g,
      "+"
    )}`;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="card-base overflow-hidden md:flex">
        <div className="md:w-1/2">
          <img
            src={imageUrl}
            alt={room.name}
            className="w-full h-64 md:h-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://placehold.co/1200x600/111827/9ca3af?text=VR+ROOM";
            }}
          />
        </div>

        <div className="md:w-1/2 p-8 flex flex-col">
          <h1 className="text-4xl lg:text-5xl font-display text-vr-blue mb-4">
            {room.name}
          </h1>

          <div className="grid grid-cols-2 gap-4 text-lg mb-6">
            <div>
              <span className="block text-sm text-gray-500">Tình trạng</span>
              <span className={`font-semibold ${getStatusClass(room.status)}`}>
                {room.status}
              </span>
            </div>

            <div>
              <span className="block text-sm text-gray-500">Sức chứa</span>
              <span className="font-semibold">{room.capacity} người</span>
            </div>
          </div>

          {/* Games */}
          {room.gameNames?.length > 0 && (
            <div className="pt-4 border-t border-glass mb-6">
              <p className="text-sm text-gray-500 mb-2">Trò chơi hỗ trợ:</p>
              <div className="flex flex-wrap gap-2">
                {room.gameNames.map((game, index) => (
                  <span
                    key={index}
                    className="text-sm bg-gray-700/70 px-3 py-1 rounded-full shadow-sm"
                  >
                    {game}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Thiết bị */}
          {room.deviceNames?.length > 0 && (
            <div className="pt-4 border-t border-glass mb-6">
              <p className="text-sm text-gray-500 mb-2">Thiết bị hỗ trợ:</p>
              <div className="flex flex-wrap gap-2">
                {room.deviceNames.map((device, index) => (
                  <span
                    key={index}
                    className="text-sm bg-gray-700/70 px-3 py-1 rounded-full shadow-sm"
                  >
                    {device}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto">
            <Link
              to={`/booking/room/${room.id}`}
              className="btn-primary w-full text-center text-lg"
            >
              Đặt phòng ngay
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RoomDetail;
