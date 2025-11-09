import React from "react";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[60vh] flex items-center justify-center card-base"
    >
      <h2 className="text-4xl font-display text-vr-blue-2">
        404 Not Found | Không tìm thấy trang
      </h2>
    </motion.div>
  );
};

export default NotFound;
