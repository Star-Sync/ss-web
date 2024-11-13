import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CardData {
    color: string;
    title: string;
    text: string;
}

interface MotionCardListProps {
    cards: CardData[];
}

const MotionCardList: React.FC<MotionCardListProps> = ({ cards }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AnimatePresence>
                {cards.map((card, index) => (
                    <motion.div
                        key={card.title}
                        className={`${card.color} text-white p-4 rounded-lg shadow-md`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 * index, duration: 0.5 }}
                    >
                        <h3 className="text-lg font-semibold">{card.title}</h3>
                        <p>{card.text}</p>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default MotionCardList;
