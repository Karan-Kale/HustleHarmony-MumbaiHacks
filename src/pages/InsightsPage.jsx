import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Clock, Zap, Target } from 'lucide-react';
import Card from '../components/ui/Card';
import ProgressRing from '../components/charts/ProgressRing';
import { mockInsights, mockStats } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';

const InsightsPage = () => {
    const { financialHealthScore, peakEarningDays, peakEarningHours, averageDailyIncome, incomeStability, topExpenseCategory, savingsRate, recommendations } = mockInsights;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-dark-50">Financial Insights</h1>
                <p className="text-dark-400">AI-powered analytics and recommendations</p>
            </div>

            {/* Financial Health Score */}
            <Card className="bg-gradient-to-br from-primary-900/20 to-accent-900/20">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="text-center">
                        <ProgressRing
                            progress={financialHealthScore}
                            size={140}
                            strokeWidth={12}
                            color="#8b5cf6"
                        >
                            <div>
                                <div className="text-4xl font-bold text-dark-50">{financialHealthScore}</div>
                                <div className="text-xs text-dark-400">Score</div>
                            </div>
                        </ProgressRing>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl font-bold text-dark-50 mb-2">Financial Health Score</h2>
                        <p className="text-dark-300 mb-4">
                            Your financial health is <span className="font-semibold text-primary-400">Good</span>.
                            Keep up the great work with consistent income and smart savings habits!
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 rounded-full bg-success-500/20 text-success-300 text-sm">
                                Strong Income
                            </span>
                            <span className="px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 text-sm">
                                Good Savings Rate
                            </span>
                            <span className="px-3 py-1 rounded-full bg-warning-500/20 text-warning-300 text-sm">
                                Moderate Stability
                            </span>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card className="text-center">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-success-600 to-success-700 flex items-center justify-center mx-auto mb-3">
                            <DollarSign size={24} className="text-white" />
                        </div>
                        <p className="text-sm text-dark-400 mb-1">Avg Daily Income</p>
                        <p className="text-2xl font-bold text-dark-50">{formatCurrency(averageDailyIncome)}</p>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card className="text-center">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center mx-auto mb-3">
                            <TrendingUp size={24} className="text-white" />
                        </div>
                        <p className="text-sm text-dark-400 mb-1">Income Stability</p>
                        <p className="text-2xl font-bold text-dark-50">{incomeStability}</p>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="text-center">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-warning-600 to-warning-700 flex items-center justify-center mx-auto mb-3">
                            <Target size={24} className="text-white" />
                        </div>
                        <p className="text-sm text-dark-400 mb-1">Savings Rate</p>
                        <p className="text-2xl font-bold text-dark-50">{savingsRate}%</p>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card className="text-center">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-danger-600 to-danger-700 flex items-center justify-center mx-auto mb-3">
                            <TrendingUp size={24} className="text-white" />
                        </div>
                        <p className="text-sm text-dark-400 mb-1">Top Expense</p>
                        <p className="text-2xl font-bold text-dark-50">{topExpenseCategory}</p>
                    </Card>
                </motion.div>
            </div>

            {/* Peak Times */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
                            <Clock size={20} className="text-primary-400" />
                        </div>
                        <h2 className="text-xl font-bold text-dark-50">Peak Earning Days</h2>
                    </div>
                    <div className="space-y-2">
                        {peakEarningDays.map((day, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 rounded-lg bg-dark-800/40"
                            >
                                <span className="text-dark-200">{day}</span>
                                <Zap size={16} className="text-warning-400" />
                            </div>
                        ))}
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-accent-500/20 flex items-center justify-center">
                            <Clock size={20} className="text-accent-400" />
                        </div>
                        <h2 className="text-xl font-bold text-dark-50">Peak Earning Hours</h2>
                    </div>
                    <div className="space-y-2">
                        {peakEarningHours.map((hour, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 rounded-lg bg-dark-800/40"
                            >
                                <span className="text-dark-200">{hour}</span>
                                <Zap size={16} className="text-warning-400" />
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Recommendations */}
            <Card>
                <h2 className="text-xl font-bold text-dark-50 mb-4">Personalized Recommendations</h2>
                <div className="space-y-3">
                    {recommendations.map((rec, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20"
                        >
                            <div className="w-6 h-6 rounded-full bg-primary-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold text-primary-300">{index + 1}</span>
                            </div>
                            <p className="text-sm text-dark-200">{rec}</p>
                        </motion.div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default InsightsPage;
