import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const getStatusClass = (status) => {
  switch (status) {
    case "AVAILABLE":
      return "bg-green-500/20 text-green-400 border-green-500";
    case "IN_USE":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500";
    case "MAINTENANCE":
      return "bg-red-500/20 text-red-400 border-red-500";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500";
  }
};

const DeviceCard = ({ device }) => {
  const statusClasses = getStatusClass(device.status);
  const imageUrl =
    device.imageUrl ||
    `https://placehold.co/400x250/00b4d8/071022?text=${device.name.replace(
      /\s/g,
      "+"
    )}`;

  return (
    <motion.div
      className="card-base card-glow flex flex-col h-full"
      whileHover={{ y: -5 }}
    >
      <div className="overflow-hidden rounded-t-xl h-80">
        <img
          src={imageUrl}
          alt={device.name}
          className="w-full h-full object-cover transition duration-500 hover:scale-105"
          onError={(e) => {
            e.target.src =
              "https://placehold.co/400x250/111827/9ca3af?text=VR+DEVICE";
          }}
        />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2 gap-3">
          <h3
            className="text-2xl font-display text-vr-blue truncate"
            title={device.name}
          >
            {device.name}
          </h3>
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusClasses}`}
          >
            {device.status}
          </span>
        </div>

        <p className="text-gray-400 mb-2">ID: {device.id}</p>
        <p className="text-gray-400 mb-2">Loại thiết bị: {device.type}</p>
        <p className="text-gray-400 mb-4">Số lượng: {device.quantity}</p>

        <p className="text-sm text-gray-500 border-t border-glass pt-3 mt-auto mb-4">
          Phòng:{" "}
          {device.roomName ? (
            <span className="text-vr-blue">{device.roomName}</span>
          ) : (
            <span className="text-vr-blue">Chưa có</span>
          )}
        </p>
        <Link
          to={`/devices/${device.id}`}
          className="btn-primary text-center w-full block text-base"
        >
          Xem chi tiết
        </Link>
      </div>
    </motion.div>
  );
};

export default DeviceCard;
