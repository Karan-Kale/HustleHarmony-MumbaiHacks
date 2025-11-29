import { motion } from 'framer-motion';
import { Plus, TrendingDown } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import DonutChart from '../components/charts/DonutChart';
import BarChart from '../components/charts/BarChart';
import { useState } from 'react';
import { useData } from '../context/DataContext';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';

const ExpensesPage = () => {
    const { transactions, addTransaction } = useData();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newExpense, setNewExpense] = useState({
        description: '',
        amount: '',
        category: 'Other',
        date: new Date().toISOString().split('T')[0],
    });

    const expenses = transactions.filter(t => t.type === 'expense');
    const totalExpenses = expenses.reduce((sum, t) => sum + Number(t.amount), 0);
    const categoryTotals = calculateCategoryTotals(expenses);

    // Calculate category breakdown for Donut Chart
    const expenseCategories = Object.entries(categoryTotals).map(([category, amount]) => ({
        category,
        amount,
        percentage: Math.round((amount / totalExpenses) * 100) || 0,
        color: '#ef4444' // You might want to map colors dynamically
    }));

    const handleAddExpense = async (e) => {
        e.preventDefault();
        try {
            await addTransaction({
                ...newExpense,
                type: 'expense',
                amount: Number(newExpense.amount),
            });
            setIsAddModalOpen(false);
            setNewExpense({
                description: '',
                amount: '',
                category: 'Other',
                date: new Date().toISOString().split('T')[0],
            });
        } catch (error) {
            console.error('Failed to add expense:', error);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-dark-50">Expense Management</h1>
                    <p className="text-dark-400">Track and categorize your business expenses</p>
                </div>
                <Button icon={<Plus size={18} />} onClick={() => setIsAddModalOpen(true)}>
                    Add Expense
                </Button>
            </div>

            {/* Total Expenses Card */}
            <Card className="bg-gradient-to-br from-danger-900/20 to-danger-800/10">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-danger-500/20 flex items-center justify-center">
                        <TrendingDown size={32} className="text-danger-400" />
                    </div>
                    <div>
                        <p className="text-sm text-dark-400 mb-1">Total Expenses This Month</p>
                        <p className="text-4xl font-bold text-dark-50">{formatCurrency(totalExpenses)}</p>
                    </div>
                </div>
            </Card>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                    <h2 className="text-xl font-bold text-dark-50 mb-4">Expense Breakdown</h2>
                    {expenses.length > 0 ? (
                        <DonutChart data={expenseCategories} size={220} />
                    ) : (
                        <p className="text-dark-400 text-center py-8">No expenses yet</p>
                    )}
                </Card>

                <Card>
                    <h2 className="text-xl font-bold text-dark-50 mb-4">Top Categories</h2>
                    {expenses.length > 0 ? (
                        <BarChart data={categoryTotals} height={280} maxBars={6} />
                    ) : (
                        <p className="text-dark-400 text-center py-8">No data available</p>
                    )}
                </Card>
            </div>

            {/* Expense List */}
            <Card>
                <h2 className="text-xl font-bold text-dark-50 mb-6">Recent Expenses</h2>
                <div className="space-y-3">
                    {expenses.length === 0 && (
                        <p className="text-dark-400 text-center py-4">No recent expenses</p>
                    )}
                    {expenses.map((expense, index) => (
                        <motion.div
                            key={expense.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center gap-4 p-4 rounded-xl hover:bg-dark-800/40 transition-colors"
                        >
                            <div className="w-12 h-12 rounded-full bg-danger-500/20 flex items-center justify-center">
                                <TrendingDown size={20} className="text-danger-400" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-medium text-dark-50">
                                        {expense.description}
                                    </span>
                                    <Badge variant="danger" size="sm">
                                        {expense.category}
                                    </Badge>
                                    {expense.recurring && (
                                        <Badge variant="warning" size="sm">
                                            Recurring
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-xs text-dark-400">
                                    {formatDate(expense.date, { format: 'medium' })}
                                </p>
                            </div>

                            <div className="text-lg font-bold text-danger-400">
                                -{formatCurrency(expense.amount)}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Card>


            {/* Add Expense Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Add New Expense"
            >
                <form onSubmit={handleAddExpense} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-dark-200 mb-1">Description</label>
                        <Input
                            value={newExpense.description}
                            onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                            placeholder="e.g. Gas, Lunch"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-dark-200 mb-1">Amount</label>
                        <Input
                            type="number"
                            value={newExpense.amount}
                            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                            placeholder="0.00"
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-dark-200 mb-1">Category</label>
                        <select
                            value={newExpense.category}
                            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                            className="w-full bg-dark-800 border border-dark-700 rounded-xl px-4 py-3 text-dark-50 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                        >
                            <option value="Gas">Gas</option>
                            <option value="Food">Food</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Equipment">Equipment</option>
                            <option value="Insurance">Insurance</option>
                            <option value="Phone">Phone</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-dark-200 mb-1">Date</label>
                        <Input
                            type="date"
                            value={newExpense.date}
                            onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <Button variant="ghost" onClick={() => setIsAddModalOpen(false)} type="button">
                            Cancel
                        </Button>
                        <Button type="submit">
                            Add Expense
                        </Button>
                    </div>
                </form>
            </Modal>
        </div >
    );
};

export default ExpensesPage;
