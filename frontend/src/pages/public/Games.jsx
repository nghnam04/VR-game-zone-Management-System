import GameCard from "../../components/cards/GameCard";
import gameService from "../../services/gameService";
import useFetch from "../../hooks/useFetch";
import { motion } from "framer-motion";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const Games = () => {
  const { data: games, loading, error } = useFetch(gameService.getAllGames);

  if (loading) {
    return (
      <div className="flex flex-col items-center p-10 font-display text-vr-blue text-2xl gap-4">
        <div className="flex justify-center items-center gap-3">
          <LoadingSpinner />
          <span>Đang tải thư viện game...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-10 text-red-400">Lỗi: {error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <h2 className="text-5xl font-display font-bold text-white border-b border-vr-blue/50 pb-4">
        Thư Viện Game
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {games && games.map((game) => <GameCard key={game.id} game={game} />)}
      </div>
    </motion.div>
  );
};

export default Games;
