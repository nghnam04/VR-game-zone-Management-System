import { useState } from "react";
import { motion } from "framer-motion";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      className="card-base p-4 cursor-pointer hover:border-vr-blue/50 transition duration-300"
      onClick={() => setIsOpen(!isOpen)}
      layout
    >
      {/* Question */}
      <div className="flex justify-between items-center text-xl font-semibold text-white">
        <span>{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-vr-blue font-bold text-2xl"
        >
          ▼
        </motion.span>
      </div>

      {/* Answer */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
        style={{ overflow: "hidden" }}
      >
        <p className="pt-3 text-lg text-gray-300">{answer}</p>
      </motion.div>
    </motion.div>
  );
};

export default FAQItem;
