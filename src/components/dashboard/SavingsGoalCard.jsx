import { motion } from 'framer-motion';
import Card from '../ui/Card';
import ProgressRing from '../charts/ProgressRing';
import { formatCurrency } from '../../utils/formatters';
import { calculateSavingsProgress, calculateDaysUntil } from '../../utils/calculations';

const SavingsGoalCard = ({ goal, index = 0 }) => {
    const progress = calculateSavingsProgress(goal.current, goal.target);
    const daysLeft = calculateDaysUntil(goal.deadline);

    const colorMap = {
        primary: '#8b5cf6',
        accent: '#3b82f6',
        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#ef4444',
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
        >
            <Card hover className="text-center">
                <div className="mb-4">
                    <ProgressRing
                        progress={progress}
                        size={100}
                        strokeWidth={8}
                        color={colorMap[goal.color] || colorMap.primary}
                    />
                </div>

                <h3 className="text-lg font-bold text-dark-50 mb-2">{goal.name}</h3>

                <div className="space-y-1 mb-4">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-dark-400">Current</span>
                        <span className="font-semibold text-dark-200">
                            {formatCurrency(goal.current)}
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-dark-400">Target</span>
                        <span className="font-semibold text-dark-200">
                            {formatCurrency(goal.target)}
                        </span>
                    </div>
                </div>

                <div className="pt-3 border-t border-white/10">
                    <div className="text-xs text-dark-400">
                        {daysLeft > 0 ? (
                            <>
                                <span className="font-semibold text-dark-300">{daysLeft}</span> days left
                            </>
                        ) : daysLeft === 0 ? (
                            <span className="font-semibold text-warning-400">Due today</span>
                        ) : (
                            <span className="font-semibold text-danger-400">Overdue</span>
                        )}
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

export default SavingsGoalCard;
