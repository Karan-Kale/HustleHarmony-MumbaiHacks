import { motion } from 'framer-motion';
import { Plus, Target } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SavingsGoalCard from '../components/dashboard/SavingsGoalCard';
import { mockSavingsGoals } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';

const SavingsPage = () => {
    const totalSaved = mockSavingsGoals.reduce((sum, goal) => sum + goal.current, 0);
    const totalTarget = mockSavingsGoals.reduce((sum, goal) => sum + goal.target, 0);
    const overallProgress = (totalSaved / totalTarget) * 100;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-dark-50">Savings Goals</h1>
                    <p className="text-dark-400">Track and achieve your financial goals</p>
                </div>
                <Button icon={<Plus size={18} />}>
                    Create New Goal
                </Button>
            </div>

            {/* Overview Card */}
            <Card className="bg-gradient-to-br from-success-900/20 to-success-800/10">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-success-500/20 flex items-center justify-center">
                        <Target size={32} className="text-success-400" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-dark-400 mb-1">Total Savings Progress</p>
                        <div className="flex items-baseline gap-3">
                            <p className="text-4xl font-bold text-dark-50">{formatCurrency(totalSaved)}</p>
                            <p className="text-lg text-dark-400">of {formatCurrency(totalTarget)}</p>
                        </div>
                        <div className="mt-3 h-2 bg-dark-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-success-600 to-success-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${overallProgress}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-bold text-success-400">
                            {overallProgress.toFixed(0)}%
                        </p>
                        <p className="text-xs text-dark-400">Complete</p>
                    </div>
                </div>
            </Card>

            {/* Goals Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockSavingsGoals.map((goal, index) => (
                    <SavingsGoalCard key={goal.id} goal={goal} index={index} />
                ))}
            </div>

            {/* Tips Card */}
            <Card>
                <h2 className="text-xl font-bold text-dark-50 mb-4">Savings Tips</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-lg bg-primary-500/10 border border-primary-500/20"
                    >
                        <h3 className="font-semibold text-dark-50 mb-2">Automate Your Savings</h3>
                        <p className="text-sm text-dark-300">
                            Set up automatic transfers to your savings goals after each income deposit.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-4 rounded-lg bg-accent-500/10 border border-accent-500/20"
                    >
                        <h3 className="font-semibold text-dark-50 mb-2">The 50/30/20 Rule</h3>
                        <p className="text-sm text-dark-300">
                            Allocate 50% to needs, 30% to wants, and 20% to savings and debt repayment.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-4 rounded-lg bg-success-500/10 border border-success-500/20"
                    >
                        <h3 className="font-semibold text-dark-50 mb-2">Emergency Fund First</h3>
                        <p className="text-sm text-dark-300">
                            Aim for 3-6 months of expenses in your emergency fund before other goals.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="p-4 rounded-lg bg-warning-500/10 border border-warning-500/20"
                    >
                        <h3 className="font-semibold text-dark-50 mb-2">Track Your Progress</h3>
                        <p className="text-sm text-dark-300">
                            Regular check-ins help you stay motivated and adjust goals as needed.
                        </p>
                    </motion.div>
                </div>
            </Card>
        </div>
    );
};

export default SavingsPage;
