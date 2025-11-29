import { motion } from 'framer-motion';
import { Plus, Filter, Search, Download } from 'lucide-react';
import { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import DonutChart from '../components/charts/DonutChart';
import LineChart from '../components/charts/LineChart';
import { formatCurrency, formatDate } from '../utils/formatters';
import { useData } from '../context/DataContext';
import Modal from '../components/ui/Modal';

const IncomePage = () => {
    const { transactions, addTransaction } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newIncome, setNewIncome] = useState({
        description: '',
        amount: '',
        category: 'Salary',
        platform: 'Upwork',
        date: new Date().toISOString().split('T')[0],
    });

    const incomeTransactions = transactions.filter(t => t.type === 'income');
    const totalIncome = incomeTransactions.reduce((sum, t) => sum + Number(t.amount), 0);

    // Calculate Chart Data
    const incomeByPlatform = incomeTransactions.reduce((acc, t) => {
        const key = t.platform || 'Other';
        acc[key] = (acc[key] || 0) + Number(t.amount);
        return acc;
    }, {});

    const incomePlatformData = Object.entries(incomeByPlatform).map(([platform, amount]) => ({
        platform,
        amount,
        percentage: Math.round((amount / totalIncome) * 100) || 0,
        color: '#10b981' // Simplified color mapping
    }));

    const incomeByDate = incomeTransactions.reduce((acc, t) => {
        const date = t.date;
        acc[date] = (acc[date] || 0) + Number(t.amount);
        return acc;
    }, {});

    const incomeTrendData = Object.entries(incomeByDate)
        .map(([date, amount]) => ({ date, income: amount }))
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(-30);

    const handleAddIncome = async (e) => {
        e.preventDefault();
        try {
            await addTransaction({
                ...newIncome,
                type: 'income',
                amount: Number(newIncome.amount),
            });
            setIsAddModalOpen(false);
            setNewIncome({
                description: '',
                amount: '',
                category: 'Salary',
                platform: 'Upwork',
                date: new Date().toISOString().split('T')[0],
            });
        } catch (error) {
            console.error('Failed to add income:', error);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-dark-50">Income Tracking</h1>
                    <p className="text-dark-400">Manage income from all your platforms</p>
                </div>
                <Button icon={<Plus size={18} />} onClick={() => setIsAddModalOpen(true)}>
                    Add Income
                </Button>
            </div>

            {/* Stats & Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                    <h2 className="text-xl font-bold text-dark-50 mb-4">Income by Platform</h2>
                    {incomeTransactions.length > 0 ? (
                        <DonutChart data={incomePlatformData} size={220} />
                    ) : (
                        <p className="text-dark-400 text-center py-8">No income data available</p>
                    )}
                </Card>

                <Card>
                    <h2 className="text-xl font-bold text-dark-50 mb-4">Income Trend</h2>
                    {incomeTransactions.length > 0 ? (
                        <LineChart data={incomeTrendData} height={250} />
                    ) : (
                        <p className="text-dark-400 text-center py-8">No income data available</p>
                    )}
                </Card>
            </div>

            {/* Income Table */}
            <Card>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <h2 className="text-xl font-bold text-dark-50">Income History</h2>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <Input
                            placeholder="Search transactions..."
                            icon={<Search size={18} />}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full sm:w-64"
                        />
                        <Button variant="secondary" size="sm" icon={<Filter size={18} />}>
                            Filter
                        </Button>
                        <Button variant="ghost" size="sm" icon={<Download size={18} />}>
                            Export
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-300">Date</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-300">Platform</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-300">Description</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-300">Category</th>
                                <th className="text-right py-3 px-4 text-sm font-semibold text-dark-300">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {incomeTransactions.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="py-8 text-center text-dark-400">
                                        No income transactions found. Add one to get started!
                                    </td>
                                </tr>
                            )}
                            {incomeTransactions.map((transaction, index) => (
                                <motion.tr
                                    key={transaction.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="border-b border-white/5 hover:bg-dark-800/40 transition-colors"
                                >
                                    <td className="py-3 px-4 text-sm text-dark-300">
                                        {formatDate(transaction.date, { format: 'medium' })}
                                    </td>
                                    <td className="py-3 px-4 text-sm font-medium text-dark-50">
                                        {transaction.platform || 'N/A'}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-dark-300">
                                        {transaction.description}
                                    </td>
                                    <td className="py-3 px-4">
                                        <Badge variant="success" size="sm">
                                            {transaction.category}
                                        </Badge>
                                    </td>
                                    <td className="py-3 px-4 text-right text-sm font-bold text-success-400">
                                        {formatCurrency(transaction.amount)}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="border-t-2 border-white/20">
                                <td colSpan="4" className="py-3 px-4 text-sm font-bold text-dark-50">
                                    Total Income
                                </td>
                                <td className="py-3 px-4 text-right text-lg font-bold text-success-400">
                                    {formatCurrency(totalIncome)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </Card>

            {/* Add Income Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Add New Income"
            >
                <form onSubmit={handleAddIncome} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-dark-200 mb-1">Description</label>
                        <Input
                            value={newIncome.description}
                            onChange={(e) => setNewIncome({ ...newIncome, description: e.target.value })}
                            placeholder="e.g. Web Design Project"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-dark-200 mb-1">Amount</label>
                        <Input
                            type="number"
                            value={newIncome.amount}
                            onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
                            placeholder="0.00"
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-dark-200 mb-1">Platform</label>
                        <select
                            value={newIncome.platform}
                            onChange={(e) => setNewIncome({ ...newIncome, platform: e.target.value })}
                            className="w-full bg-dark-800 border border-dark-700 rounded-xl px-4 py-3 text-dark-50 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                        >
                            <option value="Upwork">Upwork</option>
                            <option value="Fiverr">Fiverr</option>
                            <option value="Uber">Uber</option>
                            <option value="DoorDash">DoorDash</option>
                            <option value="Direct Client">Direct Client</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-dark-200 mb-1">Category</label>
                        <select
                            value={newIncome.category}
                            onChange={(e) => setNewIncome({ ...newIncome, category: e.target.value })}
                            className="w-full bg-dark-800 border border-dark-700 rounded-xl px-4 py-3 text-dark-50 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                        >
                            <option value="Salary">Salary</option>
                            <option value="Freelance">Freelance</option>
                            <option value="Tips">Tips</option>
                            <option value="Bonus">Bonus</option>
                            <option value="Investment">Investment</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-dark-200 mb-1">Date</label>
                        <Input
                            type="date"
                            value={newIncome.date}
                            onChange={(e) => setNewIncome({ ...newIncome, date: e.target.value })}
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <Button variant="ghost" onClick={() => setIsAddModalOpen(false)} type="button">
                            Cancel
                        </Button>
                        <Button type="submit">
                            Add Income
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default IncomePage;
