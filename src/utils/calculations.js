/**
 * Calculate total income from transactions
 */
export const calculateTotalIncome = (transactions) => {
    return transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
};

/**
 * Calculate total expenses from transactions
 */
export const calculateTotalExpenses = (transactions) => {
    return transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
};

/**
 * Calculate net income (income - expenses)
 */
export const calculateNetIncome = (transactions) => {
    const income = calculateTotalIncome(transactions);
    const expenses = calculateTotalExpenses(transactions);
    return income - expenses;
};

/**
 * Estimate quarterly tax based on income
 */
export const estimateQuarterlyTax = (income, options = {}) => {
    const {
        taxRate = 0.25, // Default 25% for self-employed
        deductions = 0,
    } = options;

    const taxableIncome = Math.max(0, income - deductions);
    return taxableIncome * taxRate;
};

/**
 * Calculate savings progress percentage
 */
export const calculateSavingsProgress = (current, target) => {
    if (target === 0) return 0;
    return Math.min(100, (current / target) * 100);
};

/**
 * Calculate days until deadline
 */
export const calculateDaysUntil = (deadline) => {
    const deadlineDate = typeof deadline === 'string' ? new Date(deadline) : deadline;
    const now = new Date();
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

/**
 * Group transactions by category
 */
export const groupByCategory = (transactions) => {
    return transactions.reduce((acc, transaction) => {
        const category = transaction.category || 'Uncategorized';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(transaction);
        return acc;
    }, {});
};

/**
 * Calculate category totals
 */
export const calculateCategoryTotals = (transactions) => {
    const grouped = groupByCategory(transactions);
    return Object.entries(grouped).map(([category, items]) => ({
        category,
        total: items.reduce((sum, item) => sum + item.amount, 0),
        count: items.length,
    })).sort((a, b) => b.total - a.total);
};

/**
 * Calculate income trend (percentage change)
 */
export const calculateIncomeTrend = (currentPeriod, previousPeriod) => {
    if (previousPeriod === 0) return currentPeriod > 0 ? 100 : 0;
    return ((currentPeriod - previousPeriod) / previousPeriod) * 100;
};

/**
 * Calculate average daily income
 */
export const calculateAverageDailyIncome = (transactions, days = 30) => {
    const total = calculateTotalIncome(transactions);
    return total / days;
};

/**
 * Get income by platform
 */
export const getIncomeByPlatform = (transactions) => {
    return transactions
        .filter(t => t.type === 'income')
        .reduce((acc, transaction) => {
            const platform = transaction.platform || 'Other';
            if (!acc[platform]) {
                acc[platform] = 0;
            }
            acc[platform] += transaction.amount;
            return acc;
        }, {});
};

/**
 * Calculate monthly recurring expenses
 */
export const calculateRecurringExpenses = (transactions) => {
    return transactions
        .filter(t => t.type === 'expense' && t.recurring)
        .reduce((sum, t) => sum + t.amount, 0);
};

/**
 * Generate date range for charts
 */
export const generateDateRange = (days = 30) => {
    const dates = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        dates.push(date);
    }

    return dates;
};

/**
 * Aggregate transactions by date
 */
export const aggregateByDate = (transactions, dateRange) => {
    return dateRange.map(date => {
        const dateStr = date.toISOString().split('T')[0];
        const dayTransactions = transactions.filter(t => {
            const tDate = new Date(t.date).toISOString().split('T')[0];
            return tDate === dateStr;
        });

        return {
            date,
            income: calculateTotalIncome(dayTransactions),
            expenses: calculateTotalExpenses(dayTransactions),
        };
    });
};
