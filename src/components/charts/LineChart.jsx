import { motion } from 'framer-motion';
import { useState } from 'react';

const LineChart = ({ data, height = 300, showGrid = true, animate = true }) => {
    const [hoveredPoint, setHoveredPoint] = useState(null);

    if (!data || data.length === 0) return null;

    const padding = { top: 20, right: 20, bottom: 40, left: 50 };
    const chartWidth = 800;
    const chartHeight = height;
    const innerWidth = chartWidth - padding.left - padding.right;
    const innerHeight = chartHeight - padding.top - padding.bottom;

    // Find min and max values
    const allValues = data.flatMap(d => [d.income, d.expenses]);
    const maxValue = Math.max(...allValues);
    const minValue = 0;
    const valueRange = maxValue - minValue;

    // Create points for income and expense lines
    const createPoints = (key) => {
        return data.map((d, i) => {
            const x = padding.left + (i / (data.length - 1)) * innerWidth;
            const y = padding.top + innerHeight - ((d[key] - minValue) / valueRange) * innerHeight;
            return { x, y, value: d[key], date: d.date };
        });
    };

    const incomePoints = createPoints('income');
    const expensePoints = createPoints('expenses');

    // Create path string
    const createPath = (points) => {
        return points.reduce((path, point, i) => {
            if (i === 0) return `M ${point.x},${point.y}`;
            return `${path} L ${point.x},${point.y}`;
        }, '');
    };

    const incomePath = createPath(incomePoints);
    const expensePath = createPath(expensePoints);

    // Create area path (for gradient fill)
    const createAreaPath = (points) => {
        const linePath = createPath(points);
        const lastPoint = points[points.length - 1];
        const firstPoint = points[0];
        return `${linePath} L ${lastPoint.x},${padding.top + innerHeight} L ${firstPoint.x},${padding.top + innerHeight} Z`;
    };

    const incomeAreaPath = createAreaPath(incomePoints);

    // Grid lines
    const gridLines = showGrid ? [0, 0.25, 0.5, 0.75, 1].map(ratio => {
        const y = padding.top + innerHeight * (1 - ratio);
        const value = minValue + valueRange * ratio;
        return { y, value };
    }) : [];

    return (
        <div className="relative w-full overflow-x-auto">
            <svg width={chartWidth} height={chartHeight} className="w-full">
                <defs>
                    <linearGradient id="incomeGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="incomeStroke" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                </defs>

                {/* Grid lines */}
                {gridLines.map((line, i) => (
                    <g key={i}>
                        <line
                            x1={padding.left}
                            y1={line.y}
                            x2={chartWidth - padding.right}
                            y2={line.y}
                            stroke="rgba(148, 163, 184, 0.1)"
                            strokeWidth="1"
                        />
                        <text
                            x={padding.left - 10}
                            y={line.y + 4}
                            textAnchor="end"
                            className="text-xs fill-dark-400"
                        >
                            ${Math.round(line.value)}
                        </text>
                    </g>
                ))}

                {/* Income area */}
                <motion.path
                    d={incomeAreaPath}
                    fill="url(#incomeGradient)"
                    initial={animate ? { opacity: 0 } : {}}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                />

                {/* Expense line */}
                <motion.path
                    d={expensePath}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    initial={animate ? { pathLength: 0 } : {}}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                />

                {/* Income line */}
                <motion.path
                    d={incomePath}
                    fill="none"
                    stroke="url(#incomeStroke)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={animate ? { pathLength: 0 } : {}}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                />

                {/* Data points */}
                {incomePoints.map((point, i) => (
                    <motion.circle
                        key={`income-${i}`}
                        cx={point.x}
                        cy={point.y}
                        r={hoveredPoint === i ? 6 : 4}
                        fill="#8b5cf6"
                        stroke="#fff"
                        strokeWidth="2"
                        initial={animate ? { scale: 0 } : {}}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.02, duration: 0.3 }}
                        onMouseEnter={() => setHoveredPoint(i)}
                        onMouseLeave={() => setHoveredPoint(null)}
                        className="cursor-pointer"
                    />
                ))}

                {/* X-axis labels */}
                {data.map((d, i) => {
                    if (i % Math.ceil(data.length / 6) !== 0) return null;
                    const x = padding.left + (i / (data.length - 1)) * innerWidth;
                    const date = new Date(d.date);
                    const label = `${date.getMonth() + 1}/${date.getDate()}`;

                    return (
                        <text
                            key={`label-${i}`}
                            x={x}
                            y={chartHeight - padding.bottom + 20}
                            textAnchor="middle"
                            className="text-xs fill-dark-400"
                        >
                            {label}
                        </text>
                    );
                })}
            </svg>

            {/* Tooltip */}
            {hoveredPoint !== null && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute glass-card p-3 pointer-events-none"
                    style={{
                        left: incomePoints[hoveredPoint].x,
                        top: incomePoints[hoveredPoint].y - 80,
                        transform: 'translateX(-50%)',
                    }}
                >
                    <div className="text-xs text-dark-400 mb-1">
                        {new Date(data[hoveredPoint].date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                        <span className="text-sm text-dark-200">Income:</span>
                        <span className="text-sm font-semibold text-dark-50">
                            ${data[hoveredPoint].income}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-danger-500"></div>
                        <span className="text-sm text-dark-200">Expenses:</span>
                        <span className="text-sm font-semibold text-dark-50">
                            ${data[hoveredPoint].expenses}
                        </span>
                    </div>
                </motion.div>
            )}

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                    <span className="text-sm text-dark-300">Income</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-danger-500"></div>
                    <span className="text-sm text-dark-300">Expenses</span>
                </div>
            </div>
        </div>
    );
};

export default LineChart;
