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
    case "BOOKED":
      return "bg-blue-500/20 text-blue-400 border-blue-500";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500";
  }
};

const RoomCard = ({ room }) => {
  const statusClasses = getStatusClass(room.status);
  const imageUrl =
    room.imageUrl ||
    `https://placehold.co/400x250/0096c7/071022?text=${room.name.replace(
      /\s/g,
      "+"
    )}`;

  return (
    <motion.div
      className="card-base card-glow flex flex-col h-full"
      whileHover={{ y: -5 }}
    >
      <div className="overflow-hidden rounded-t-xl h-48">
        <img
          src={imageUrl}
          alt={room.name}
          className="w-full h-full object-cover transition duration-500 hover:scale-105"
        />
      </div>
      <div className="p-3 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-4">
          <h3
            className="text-2xl font-display text-vr-blue truncate"
            title={room.name}
          >
            {room.name}
          </h3>
          <span
            className={`px-4 py-1 text-xs font-semibold rounded-full border ${statusClasses}`}
          >
            {room.status}
          </span>
        </div>
        <p className="text-gray-400 mb-2">Trạng thái: {room.status}</p>
        <p className="text-gray-400 mb-3">Sức chứa: {room.capacity} người</p>

        <Link
          to={`/rooms/${room.id}`}
          className="btn-primary text-center w-full block text-base"
        >
          Xem chi tiết
        </Link>
      </div>
    </motion.div>
  );
};

export default RoomCard;
