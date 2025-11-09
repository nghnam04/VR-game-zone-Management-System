import React from "react";
import { useParams, Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import deviceService from "../../services/deviceService";
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
    default:
      return "text-gray-400";
  }
};

const DeviceDetail = () => {
  const { id } = useParams();
  const {
    data: device,
    loading,
    error,
  } = useFetch(() => deviceService.getDeviceById(id), [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center p-10 font-display text-vr-blue text-2xl gap-4">
        <div className="flex justify-center items-center gap-3">
          <LoadingSpinner />
          <span>Đang tải thông tin thiết bị...</span>
        </div>
      </div>
    );
  }

  if (error || !device) {
    return (
      <div className="text-center p-10 text-red-400">
        Lỗi: Không tìm thấy thiết bị
      </div>
    );
  }

  const imageUrl =
    device.imageUrl ||
    `https://placehold.co/1200x600/0096c7/071022?text=${device.name.replace(
      /\s/g,
      "+"
    )}`;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="card-base overflow-hidden md:flex">
        <div className="md:w-1/2">
          <img
            src={imageUrl}
            alt={device.name}
            className="w-full h-64 md:h-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://placehold.co/1200x600/111827/9ca3af?text=VR+DEVICE";
            }}
          />
        </div>

        <div className="md:w-1/2 p-8 flex flex-col">
          <h1 className="text-4xl lg:text-5xl font-display text-vr-blue mb-4">
            {device.name}
          </h1>

          <div className="grid grid-cols-2 gap-4 text-lg mb-6">
            <div>
              <span className="block text-sm text-gray-500">Tình trạng</span>
              <span
                className={`font-semibold ${getStatusClass(device.status)}`}
              >
                {device.status}
              </span>
            </div>

            <div>
              <span className="block text-sm text-gray-500">Số lượng</span>
              <span className="font-semibold">{device.quantity}</span>
            </div>

            <div>
              <span className="block text-sm text-gray-500">Loại thiết bị</span>
              <span className="font-semibold">{device.type}</span>
            </div>
          </div>

          {/* Room */}
          {device.roomName && (
            <div className="pt-4 border-t border-glass mb-6">
              <p className="text-sm text-gray-500 mb-3">Phòng hỗ trợ:</p>
              <Link
                to={`/rooms/${device.roomId}`}
                className="btn-ghost px-3 py-1 rounded-full bg-vr-blue/20 text-vr-blue hover:bg-vr-blue/40"
              >
                {device.roomName}
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DeviceDetail;
