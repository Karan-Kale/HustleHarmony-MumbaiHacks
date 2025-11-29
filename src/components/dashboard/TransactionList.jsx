import { motion } from 'framer-motion';
import { formatCurrency, formatRelativeDate } from '../../utils/formatters';
import Badge from '../ui/Badge';

const TransactionList = ({ transactions, maxItems = 5 }) => {
    const displayTransactions = transactions.slice(0, maxItems);

    const getCategoryVariant = (category) => {
        const variants = {
            'Rideshare': 'primary',
            'Delivery': 'accent',
            'Freelance': 'success',
            'Gas': 'warning',
            'Insurance': 'danger',
            'Food': 'default',
            'Maintenance': 'warning',
            'Equipment': 'accent',
            'Phone': 'primary',
        };
        return variants[category] || 'default';
    };

    return (
        <div className="space-y-3">
            {displayTransactions.map((transaction, index) => (
                <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-dark-800/40 transition-colors"
                >
                    {/* Icon/Type indicator */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.type === 'income'
                            ? 'bg-success-500/20 text-success-400'
                            : 'bg-danger-500/20 text-danger-400'
                        }`}>
                        {transaction.type === 'income' ? '+' : '-'}
                    </div>

                    {/* Transaction details */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-dark-50 truncate">
                                {transaction.description}
                            </span>
                            <Badge variant={getCategoryVariant(transaction.category)} size="sm">
                                {transaction.category}
                            </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-dark-400">
                            {transaction.platform && (
                                <>
                                    <span>{transaction.platform}</span>
                                    <span>•</span>
                                </>
                            )}
                            <span>{formatRelativeDate(transaction.date)}</span>
                        </div>
                    </div>

                    {/* Amount */}
                    <div className={`text-lg font-bold ${transaction.type === 'income' ? 'text-success-400' : 'text-danger-400'
                        }`}>
                        {transaction.type === 'income' ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default TransactionList;
