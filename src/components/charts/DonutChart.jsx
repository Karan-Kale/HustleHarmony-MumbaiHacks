import { motion } from 'framer-motion';
import { useState } from 'react';

const DonutChart = ({ data, size = 200, innerRadius = 0.6 }) => {
    const [hoveredSegment, setHoveredSegment] = useState(null);

    if (!data || data.length === 0) return null;

    const total = data.reduce((sum, item) => sum + item.amount, 0);
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 10;
    const innerR = radius * innerRadius;

    // Calculate segments
    let currentAngle = -90; // Start from top
    const segments = data.map((item, index) => {
        const percentage = (item.amount / total) * 100;
        const angle = (percentage / 100) * 360;
        const startAngle = currentAngle;
        const endAngle = currentAngle + angle;

        currentAngle = endAngle;

        return {
            ...item,
            percentage,
            startAngle,
            endAngle,
            index,
        };
    });

    // Create arc path
    const createArcPath = (startAngle, endAngle, outerRadius, innerRadius) => {
        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;

        const x1 = centerX + outerRadius * Math.cos(startRad);
        const y1 = centerY + outerRadius * Math.sin(startRad);
        const x2 = centerX + outerRadius * Math.cos(endRad);
        const y2 = centerY + outerRadius * Math.sin(endRad);

        const x3 = centerX + innerRadius * Math.cos(endRad);
        const y3 = centerY + innerRadius * Math.sin(endRad);
        const x4 = centerX + innerRadius * Math.cos(startRad);
        const y4 = centerY + innerRadius * Math.sin(startRad);

        const largeArc = endAngle - startAngle > 180 ? 1 : 0;

        return `
      M ${x1} ${y1}
      A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2}
      L ${x3} ${y3}
      A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}
      Z
    `;
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative">
                <svg width={size} height={size}>
                    {segments.map((segment) => {
                        const isHovered = hoveredSegment === segment.index;
                        const currentRadius = isHovered ? radius + 5 : radius;

                        return (
                            <motion.path
                                key={segment.index}
                                d={createArcPath(segment.startAngle, segment.endAngle, currentRadius, innerR)}
                                fill={segment.color}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: segment.index * 0.1, duration: 0.5 }}
                                onMouseEnter={() => setHoveredSegment(segment.index)}
                                onMouseLeave={() => setHoveredSegment(null)}
                                className="cursor-pointer transition-all duration-300"
                                style={{ transformOrigin: `${centerX}px ${centerY}px` }}
                            />
                        );
                    })}
                </svg>

                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold text-dark-50">
                        ${total.toLocaleString()}
                    </div>
                    <div className="text-sm text-dark-400">Total</div>
                </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                {segments.map((segment) => (
                    <motion.div
                        key={segment.index}
                        className={`flex items-center gap-2 p-2 rounded-lg transition-all cursor-pointer ${hoveredSegment === segment.index ? 'bg-dark-800/60' : ''
                            }`}
                        onMouseEnter={() => setHoveredSegment(segment.index)}
                        onMouseLeave={() => setHoveredSegment(null)}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: segment.index * 0.1 }}
                    >
                        <div
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: segment.color }}
                        />
                        <div className="flex-1 min-w-0">
                            <div className="text-xs text-dark-400 truncate">
                                {segment.category || segment.platform}
                            </div>
                            <div className="text-sm font-semibold text-dark-50">
                                ${segment.amount.toLocaleString()}
                            </div>
                        </div>
                        <div className="text-xs font-medium text-dark-300">
                            {segment.percentage.toFixed(0)}%
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default DonutChart;
