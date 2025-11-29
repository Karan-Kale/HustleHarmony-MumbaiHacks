import { motion } from 'framer-motion';
import { Calculator, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import ProgressRing from '../components/charts/ProgressRing';
import { mockTaxEstimate } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';

const TaxPage = () => {
    const { annual, quarterly, setAside, recommendations } = mockTaxEstimate;
    const progressPercentage = (setAside / annual.estimatedTax) * 100;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-dark-50">Tax Calculator</h1>
                <p className="text-dark-400">Estimate and track your quarterly tax obligations</p>
            </div>

            {/* Annual Estimate */}
            <Card className="bg-gradient-to-br from-warning-900/20 to-warning-800/10">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-32 h-32 rounded-2xl bg-warning-500/20 flex items-center justify-center">
                        <Calculator size={48} className="text-warning-400" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <p className="text-sm text-dark-400 mb-2">Estimated Annual Tax</p>
                        <p className="text-5xl font-bold text-dark-50 mb-2">
                            {formatCurrency(annual.estimatedTax)}
                        </p>
                        <p className="text-sm text-dark-300">
                            Based on {formatCurrency(annual.estimatedIncome)} estimated income
                            <span className="mx-2">•</span>
                            {annual.effectiveRate}% effective rate
                        </p>
                    </div>
                    <div className="text-center">
                        <ProgressRing
                            progress={progressPercentage}
                            size={120}
                            strokeWidth={10}
                            color="#f59e0b"
                        />
                        <p className="text-xs text-dark-400 mt-2">Amount Set Aside</p>
                        <p className="text-lg font-bold text-dark-50">{formatCurrency(setAside)}</p>
                    </div>
                </div>
            </Card>

            {/* Quarterly Breakdown */}
            <Card>
                <h2 className="text-xl font-bold text-dark-50 mb-6">Quarterly Payments</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {quarterly.map((quarter, index) => {
                        const statusConfig = {
                            paid: { icon: CheckCircle, color: 'success', text: 'Paid' },
                            pending: { icon: Clock, color: 'warning', text: 'Pending' },
                            overdue: { icon: AlertCircle, color: 'danger', text: 'Overdue' },
                        };

                        const config = statusConfig[quarter.status];
                        const Icon = config.icon;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card p-4 hover:bg-dark-800/60 transition-colors"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-bold text-dark-50">{quarter.quarter}</h3>
                                    <Badge variant={config.color} size="sm">
                                        <Icon size={12} className="mr-1" />
                                        {config.text}
                                    </Badge>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-dark-400">Due Date</span>
                                        <span className="text-dark-200">{quarter.due}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-dark-400">Amount Due</span>
                                        <span className="font-semibold text-dark-50">
                                            {formatCurrency(quarter.amount)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-dark-400">Paid</span>
                                        <span className={`font-semibold ${quarter.paid >= quarter.amount ? 'text-success-400' : 'text-warning-400'
                                            }`}>
                                            {formatCurrency(quarter.paid)}
                                        </span>
                                    </div>
                                    {quarter.paid < quarter.amount && (
                                        <div className="pt-2 border-t border-white/10">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-dark-400">Remaining</span>
                                                <span className="font-bold text-danger-400">
                                                    {formatCurrency(quarter.amount - quarter.paid)}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </Card>

            {/* Recommendations */}
            <Card>
                <h2 className="text-xl font-bold text-dark-50 mb-4">Tax-Saving Recommendations</h2>
                <div className="space-y-3">
                    {recommendations.map((rec, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3 p-3 rounded-lg bg-primary-500/10 border border-primary-500/20"
                        >
                            <AlertCircle size={20} className="text-primary-400 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-dark-200">{rec}</p>
                        </motion.div>
                    ))}
                </div>
            </Card>

            {/* Deductions */}
            <Card>
                <h2 className="text-xl font-bold text-dark-50 mb-4">Potential Deductions</h2>
                <p className="text-sm text-dark-300 mb-4">
                    Estimated deductions: {formatCurrency(annual.deductions)}
                </p>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {['Mileage', 'Home Office', 'Equipment', 'Phone & Internet', 'Insurance', 'Professional Fees'].map((deduction, index) => (
                        <div
                            key={index}
                            className="p-3 rounded-lg bg-dark-800/40 border border-white/10 text-center"
                        >
                            <p className="text-sm font-medium text-dark-200">{deduction}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default TaxPage;
