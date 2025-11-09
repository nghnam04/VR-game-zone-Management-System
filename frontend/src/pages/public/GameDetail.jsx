import React from "react";
import { useParams, Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import gameService from "../../services/gameService";
import { motion } from "framer-motion";
import formatCurrency from "../../components/utils/formatCurrency";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const getGenreClass = (status) => {
  switch (status) {
    case "SPORTS":
      return "text-green-400 border-green-500";
    case "PUZZLE":
      return "text-yellow-400 border-yellow-500";
    case "HORROR":
      return "text-red-400 border-red-500";
    case "ADVENTURE":
      return "text-blue-400 border-blue-500";
    case "ACTION":
      return "text-pink-400 border-pink-500";
    case "SIMULATION":
      return "text-purple-400 border-purple-500";
    case "RACING":
      return "text-orange-400 border-orange-500";
    default:
      return "text-gray-400 border-gray-500";
  }
};

const GameDetail = () => {
  const { id } = useParams();
  const {
    data: game,
    loading,
    error,
  } = useFetch(() => gameService.getGameById(id), [id]);

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

  if (error || !game) {
    return (
      <div className="text-center p-10 text-red-400">
        Lỗi: Không tìm thấy game
      </div>
    );
  }

  const imageUrl =
    game.imageUrl ||
    `https://placehold.co/1200x600/00b4d8/071022?text=${game.name.replace(
      /\s/g,
      "+"
    )}`;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="card-base overflow-hidden md:flex">
        <div className="md:w-1/2">
          <img
            src={imageUrl}
            alt={game.name}
            className="w-full h-64 md:h-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://placehold.co/1200x600/111827/9ca3af?text=VR+GAME";
            }}
          />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col">
          <h1 className="text-4xl lg:text-5xl font-display text-vr-blue mb-4">
            {game.name}
          </h1>
          <p className="text-lg text-gray-300 mb-6">{game.description}</p>

          <div className="grid grid-cols-2 gap-4 text-lg mb-6">
            <div>
              <span className="block text-sm text-gray-500">Thể loại</span>
              <span className={`font-semibold ${getGenreClass(game.genre)}`}>
                {game.genre}
              </span>
            </div>
            <div>
              <span className="block text-sm text-gray-500">Thời lượng</span>
              <span className="font-semibold">{game.duration} phút</span>
            </div>
            <div>
              <span className="block text-sm text-gray-500">Số người chơi</span>
              <span className="font-semibold">{game.maxPlayers}</span>
            </div>
            <div>
              <span className="block text-sm text-gray-500">Giá</span>
              <span className="font-semibold text-vr-blue-2">
                {formatCurrency(game.price)}
              </span>
            </div>
          </div>

          {/* Rooms */}
          {game.roomNames?.length > 0 && (
            <div className="pt-4 border-t border-glass mb-6">
              <p className="text-sm text-gray-500 mb-2">Phòng hỗ trợ:</p>
              <div className="flex flex-wrap gap-2">
                {game.roomNames.map((room, index) => (
                  <span
                    key={index}
                    className="text-sm bg-gray-700/70 px-3 py-1 rounded-full shadow-sm"
                  >
                    {room}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto">
            <Link
              to={`/booking/game/${game.id}`}
              className="btn-primary w-full text-center text-lg"
            >
              Đặt Lịch Chơi Ngay
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GameDetail;
