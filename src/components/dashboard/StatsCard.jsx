import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';
import Card from '../ui/Card';

const StatsCard = ({
    title,
    value,
    change,
    icon: Icon,
    trend = 'up',
    prefix = '$',
    suffix = '',
    color = 'primary',
    delay = 0
}) => {
    const animatedValue = useAnimatedCounter(value, 1000);

    const colorClasses = {
        primary: 'from-primary-600 to-accent-600',
        success: 'from-success-600 to-success-700',
        warning: 'from-warning-600 to-warning-700',
        danger: 'from-danger-600 to-danger-700',
    };

    const trendColor = trend === 'up' ? 'text-success-400' : 'text-danger-400';
    const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
        >
            <Card className="relative overflow-hidden">
                {/* Background gradient */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorClasses[color]} opacity-10 rounded-full blur-3xl`} />

                <div className="relative">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-dark-400">{title}</span>
                        {Icon && (
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${colorClasses[color]} bg-opacity-20`}>
                                <Icon size={20} className="text-dark-50" />
                            </div>
                        )}
                    </div>

                    {/* Value */}
                    <div className="mb-2">
                        <span className="text-3xl font-bold text-dark-50">
                            {prefix}
                            {animatedValue.toLocaleString('en-US', {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                            })}
                            {suffix}
                        </span>
                    </div>

                    {/* Change indicator */}
                    {change !== undefined && change !== null && (
                        <div className="flex items-center gap-1">
                            <TrendIcon size={16} className={trendColor} />
                            <span className={`text-sm font-medium ${trendColor}`}>
                                {Math.abs(change).toFixed(1)}%
                            </span>
                            <span className="text-sm text-dark-400">vs last month</span>
                        </div>
                    )}
                </div>
            </Card>
        </motion.div>
    );
};

export default StatsCard;
