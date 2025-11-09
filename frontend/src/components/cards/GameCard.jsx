import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import formatCurrency from "../utils/formatCurrency";

const getGenreClass = (status) => {
  switch (status) {
    case "SPORTS":
      return "bg-green-500/20 text-green-400 border-green-500";
    case "PUZZLE":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500";
    case "HORROR":
      return "bg-red-500/20 text-red-400 border-red-500";
    case "ADVENTURE":
      return "bg-blue-500/20 text-blue-400 border-blue-500";
    case "ACTION":
      return "bg-pink-500/20 text-pink-400 border-pink-500";
    case "SIMULATION":
      return "bg-purple-500/20 text-purple-400 border-purple-500";
    case "RACING":
      return "bg-orange-500/20 text-orange-400 border-orange-500";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500";
  }
};

const GameCard = ({ game }) => {
  const imageUrl =
    game.imageUrl ||
    `https://placehold.co/400x250/00b4d8/071022?text=${game.name.replace(
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
          alt={game.name}
          className="w-full h-full object-cover transition duration-500 hover:scale-105"
          onError={(e) => {
            e.target.src =
              "https://placehold.co/400x250/111827/9ca3af?text=VR+GAME";
          }}
        />
      </div>
      <div className="p-2 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <h3
            className="text-2xl font-display text-vr-blue truncate"
            title={game.name}
          >
            {game.name}
          </h3>
          <span
            className={`px-1 py-1 border rounded-md text-xs ${getGenreClass(
              game.genre
            )}`}
          >
            {game.genre}
          </span>
        </div>
        <p className="text-sm text-gray-400 mb-3">Thể loại: {game.genre}</p>
        <p className="text-sm text-gray-400 mb-3">
          Thời lượng: {game.duration} phút
        </p>
        <p className="text-sm text-gray-400 mb-3">
          Số người chơi tối đa: {game.maxPlayers}
        </p>

        <div className="mt-auto pt-4 border-t border-glass">
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-vr-blue-2">
              {formatCurrency(game.price)}
            </span>
          </div>
          <Link
            to={`/games/${game.id}`}
            className="btn-primary w-full text-center"
          >
            Xem Chi Tiết
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard;
