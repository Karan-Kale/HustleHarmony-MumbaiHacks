import { motion } from 'framer-motion';
import { DollarSign, TrendingDown, Wallet, Calculator, Plus, ArrowUpRight } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import TransactionList from '../components/dashboard/TransactionList';
import SavingsGoalCard from '../components/dashboard/SavingsGoalCard';
import LineChart from '../components/charts/LineChart';
import DonutChart from '../components/charts/DonutChart';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { mockSavingsGoals } from '../data/mockData'; // Keeping savings goals mock for now as requested to focus on profile/data cleanup first

const Dashboard = () => {
    const { user } = useAuth();
    const { transactions } = useData();

    // Calculate Stats
    const incomeTransactions = transactions.filter(t => t.type === 'income');
    const expenseTransactions = transactions.filter(t => t.type === 'expense');

    const totalIncome = incomeTransactions.reduce((sum, t) => sum + Number(t.amount), 0);
    const totalExpenses = expenseTransactions.reduce((sum, t) => sum + Number(t.amount), 0);
    const netIncome = totalIncome - totalExpenses;
    const taxSetAside = totalIncome * 0.25; // Estimating 25% for taxes

    // Prepare Chart Data
    // Group income by date for LineChart (simplified)
    const incomeByDate = incomeTransactions.reduce((acc, t) => {
        const date = t.date;
        acc[date] = (acc[date] || 0) + Number(t.amount);
        return acc;
    }, {});

    const incomeTrendData = Object.entries(incomeByDate)
        .map(([date, amount]) => ({ date, income: amount }))
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(-30); // Last 30 entries

    // Group income by platform/category
    const incomeByPlatform = incomeTransactions.reduce((acc, t) => {
        const key = t.platform || t.category || 'Other';
        acc[key] = (acc[key] || 0) + Number(t.amount);
        return acc;
    }, {});

    const incomePlatformData = Object.entries(incomeByPlatform).map(([platform, amount]) => ({
        platform,
        amount,
        percentage: Math.round((amount / totalIncome) * 100) || 0,
        color: '#10b981' // Simplified color
    }));

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl md:text-4xl font-bold text-dark-50 mb-2">
                    Welcome back, {user?.user_metadata?.full_name?.split(' ')[0] || 'User'}! 👋
                </h1>
                <p className="text-dark-400">
                    Here's your financial overview for this month
                </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title="Total Income"
                    value={totalIncome}
                    change={0} // No historical data for change yet
                    trend="neutral"
                    icon={DollarSign}
                    color="success"
                    delay={0}
                />
                <StatsCard
                    title="Total Expenses"
                    value={totalExpenses}
                    change={0}
                    trend="neutral"
                    icon={TrendingDown}
                    color="danger"
                    delay={0.1}
                />
                <StatsCard
                    title="Net Income"
                    value={netIncome}
                    change={0}
                    trend="neutral"
                    icon={Wallet}
                    color="primary"
                    delay={0.2}
                />
                <StatsCard
                    title="Tax Set Aside"
                    value={taxSetAside}
                    icon={Calculator}
                    color="warning"
                    delay={0.3}
                />
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Income Trend */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Card>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-dark-50">Income Trend</h2>
                                <p className="text-sm text-dark-400">Recent activity</p>
                            </div>
                        </div>
                        {incomeTrendData.length > 0 ? (
                            <LineChart data={incomeTrendData} height={300} />
                        ) : (
                            <div className="h-[300px] flex items-center justify-center text-dark-400">
                                No income data available
                            </div>
                        )}
                    </Card>
                </motion.div>

                {/* Income by Platform */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Card>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-dark-50">Income Sources</h2>
                                <p className="text-sm text-dark-400">This month</p>
                            </div>
                        </div>
                        {incomePlatformData.length > 0 ? (
                            <DonutChart data={incomePlatformData} size={240} />
                        ) : (
                            <div className="h-[240px] flex items-center justify-center text-dark-400">
                                No income data available
                            </div>
                        )}
                    </Card>
                </motion.div>
            </div>

            {/* Recent Transactions & Savings Goals */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Transactions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="lg:col-span-2"
                >
                    <Card>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-dark-50">Recent Transactions</h2>
                                <p className="text-sm text-dark-400">Latest activity</p>
                            </div>
                        </div>
                        {transactions.length > 0 ? (
                            <TransactionList transactions={transactions} maxItems={6} />
                        ) : (
                            <div className="py-8 text-center text-dark-400">
                                No transactions yet. Add some to get started!
                            </div>
                        )}
                    </Card>
                </motion.div>

                {/* Savings Goals Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <Card>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-dark-50">Savings Goals</h2>
                                <p className="text-sm text-dark-400">Track progress</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {mockSavingsGoals.slice(0, 2).map((goal, index) => (
                                <SavingsGoalCard key={goal.id} goal={goal} index={index} />
                            ))}
                            <Button variant="ghost" size="sm" className="w-full">
                                View All Goals
                                <ArrowUpRight size={16} />
                            </Button>
                        </div>
                    </Card>
                </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
                <Card>
                    <h2 className="text-xl font-bold text-dark-50 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <Button variant="secondary" className="justify-start">
                            <Plus size={18} />
                            Add Income
                        </Button>
                        <Button variant="secondary" className="justify-start">
                            <Plus size={18} />
                            Add Expense
                        </Button>
                        <Button variant="secondary" className="justify-start">
                            <Plus size={18} />
                            New Goal
                        </Button>
                        <Button variant="secondary" className="justify-start">
                            <Calculator size={18} />
                            Calculate Tax
                        </Button>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};

export default Dashboard;
