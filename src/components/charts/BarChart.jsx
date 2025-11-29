import { motion } from 'framer-motion';
import { useState } from 'react';

const BarChart = ({ data, height = 300, maxBars = 10 }) => {
    const [hoveredBar, setHoveredBar] = useState(null);

    if (!data || data.length === 0) return null;

    // Limit number of bars
    const displayData = data.slice(0, maxBars);
    const maxValue = Math.max(...displayData.map(d => d.total));

    return (
        <div className="w-full">
            <div className="flex items-end justify-between gap-2" style={{ height }}>
                {displayData.map((item, index) => {
                    const barHeight = (item.total / maxValue) * (height - 40);
                    const isHovered = hoveredBar === index;

                    return (
                        <div
                            key={index}
                            className="flex-1 flex flex-col items-center gap-2 group"
                            onMouseEnter={() => setHoveredBar(index)}
                            onMouseLeave={() => setHoveredBar(null)}
                        >
                            {/* Value label */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                                className="text-sm font-semibold text-dark-50 whitespace-nowrap"
                            >
                                ${item.total.toLocaleString()}
                            </motion.div>

                            {/* Bar */}
                            <motion.div
                                className="w-full rounded-t-lg cursor-pointer relative overflow-hidden"
                                style={{
                                    background: `linear-gradient(to top, ${item.color || '#8b5cf6'}, ${item.color || '#8b5cf6'}dd)`,
                                }}
                                initial={{ height: 0 }}
                                animate={{ height: barHeight }}
                                transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                                whileHover={{ scale: 1.05 }}
                            >
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 shimmer opacity-20" />
                            </motion.div>

                            {/* Category label */}
                            <div className="text-xs text-dark-400 text-center truncate w-full">
                                {item.category}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BarChart;
