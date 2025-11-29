// Mock user data
export const mockUser = {
    id: '1',
    name: 'Alex Rivera',
    email: 'alex.rivera@email.com',
    avatar: null,
    joinedDate: '2024-01-15',
    platforms: ['Uber', 'DoorDash', 'Upwork', 'Fiverr'],
};

// Mock income transactions
export const mockIncomeTransactions = [
    { id: '1', type: 'income', amount: 245.50, platform: 'Uber', category: 'Rideshare', date: '2024-11-28', description: '12 rides completed' },
    { id: '2', type: 'income', amount: 180.00, platform: 'DoorDash', category: 'Delivery', date: '2024-11-28', description: '15 deliveries' },
    { id: '3', type: 'income', amount: 500.00, platform: 'Upwork', category: 'Freelance', date: '2024-11-27', description: 'Web design project' },
    { id: '4', type: 'income', amount: 150.00, platform: 'Fiverr', category: 'Freelance', date: '2024-11-27', description: 'Logo design' },
    { id: '5', type: 'income', amount: 320.75, platform: 'Uber', category: 'Rideshare', date: '2024-11-26', description: '18 rides completed' },
    { id: '6', type: 'income', amount: 95.50, platform: 'DoorDash', category: 'Delivery', date: '2024-11-26', description: '8 deliveries' },
    { id: '7', type: 'income', amount: 750.00, platform: 'Upwork', category: 'Freelance', date: '2024-11-25', description: 'Mobile app development' },
    { id: '8', type: 'income', amount: 200.00, platform: 'Fiverr', category: 'Freelance', date: '2024-11-24', description: 'Brand identity package' },
    { id: '9', type: 'income', amount: 275.25, platform: 'Uber', category: 'Rideshare', date: '2024-11-23', description: '14 rides completed' },
    { id: '10', type: 'income', amount: 165.00, platform: 'DoorDash', category: 'Delivery', date: '2024-11-23', description: '12 deliveries' },
];

// Mock expense transactions
export const mockExpenseTransactions = [
    { id: '11', type: 'expense', amount: 65.00, category: 'Gas', date: '2024-11-28', description: 'Shell Station', recurring: false },
    { id: '12', type: 'expense', amount: 45.00, category: 'Food', date: '2024-11-28', description: 'Lunch break', recurring: false },
    { id: '13', type: 'expense', amount: 120.00, category: 'Insurance', date: '2024-11-27', description: 'Car insurance', recurring: true },
    { id: '14', type: 'expense', amount: 35.00, category: 'Maintenance', date: '2024-11-27', description: 'Car wash & oil', recurring: false },
    { id: '15', type: 'expense', amount: 50.00, category: 'Phone', date: '2024-11-26', description: 'Mobile plan', recurring: true },
    { id: '16', type: 'expense', amount: 80.00, category: 'Gas', date: '2024-11-25', description: 'Chevron Station', recurring: false },
    { id: '17', type: 'expense', amount: 25.00, category: 'Food', date: '2024-11-24', description: 'Coffee & snacks', recurring: false },
    { id: '18', type: 'expense', amount: 200.00, category: 'Equipment', date: '2024-11-23', description: 'Phone mount & charger', recurring: false },
];

// Combine all transactions
export const mockTransactions = [...mockIncomeTransactions, ...mockExpenseTransactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
);

// Mock savings goals
export const mockSavingsGoals = [
    {
        id: '1',
        name: 'Emergency Fund',
        target: 5000,
        current: 3250,
        deadline: '2025-03-31',
        category: 'emergency',
        color: 'primary',
    },
    {
        id: '2',
        name: 'New Laptop',
        target: 2000,
        current: 1450,
        deadline: '2025-02-28',
        category: 'equipment',
        color: 'accent',
    },
    {
        id: '3',
        name: 'Vacation Fund',
        target: 3000,
        current: 800,
        deadline: '2025-06-30',
        category: 'personal',
        color: 'success',
    },
    {
        id: '4',
        name: 'Car Upgrade',
        target: 8000,
        current: 2100,
        deadline: '2025-12-31',
        category: 'vehicle',
        color: 'warning',
    },
];

// Mock tax estimates
export const mockTaxEstimate = {
    annual: {
        estimatedIncome: 65000,
        estimatedTax: 16250,
        effectiveRate: 25,
        deductions: 5000,
    },
    quarterly: [
        { quarter: 'Q1 2024', due: '2024-04-15', amount: 4062.50, paid: 4062.50, status: 'paid' },
        { quarter: 'Q2 2024', due: '2024-06-15', amount: 4062.50, paid: 4062.50, status: 'paid' },
        { quarter: 'Q3 2024', due: '2024-09-15', amount: 4062.50, paid: 4062.50, status: 'paid' },
        { quarter: 'Q4 2024', due: '2024-12-15', amount: 4062.50, paid: 2500.00, status: 'pending' },
    ],
    setAside: 2500,
    recommendations: [
        'Consider increasing quarterly payments to avoid penalties',
        'Track mileage for potential deductions',
        'Keep receipts for equipment purchases',
    ],
};

// Mock income by platform (for charts)
export const mockIncomeByPlatform = [
    { platform: 'Uber', amount: 8420, percentage: 35, color: '#000000' },
    { platform: 'DoorDash', amount: 6150, percentage: 26, color: '#FF3008' },
    { platform: 'Upwork', amount: 7200, percentage: 30, color: '#14A800' },
    { platform: 'Fiverr', amount: 2180, percentage: 9, color: '#1DBF73' },
];

// Mock expense categories (for charts)
export const mockExpenseCategories = [
    { category: 'Gas', amount: 850, percentage: 32, color: '#8b5cf6' },
    { category: 'Insurance', amount: 720, percentage: 27, color: '#3b82f6' },
    { category: 'Food', amount: 450, percentage: 17, color: '#22c55e' },
    { category: 'Equipment', amount: 380, percentage: 14, color: '#f59e0b' },
    { category: 'Maintenance', amount: 180, percentage: 7, color: '#ef4444' },
    { category: 'Phone', amount: 100, percentage: 3, color: '#06b6d4' },
];

// Mock income trend data (last 30 days)
export const mockIncomeTrend = [
    { date: '2024-11-01', income: 245, expenses: 85 },
    { date: '2024-11-02', income: 180, expenses: 45 },
    { date: '2024-11-03', income: 320, expenses: 120 },
    { date: '2024-11-04', income: 150, expenses: 35 },
    { date: '2024-11-05', income: 275, expenses: 50 },
    { date: '2024-11-06', income: 420, expenses: 80 },
    { date: '2024-11-07', income: 195, expenses: 25 },
    { date: '2024-11-08', income: 380, expenses: 65 },
    { date: '2024-11-09', income: 225, expenses: 90 },
    { date: '2024-11-10', income: 510, expenses: 120 },
    { date: '2024-11-11', income: 165, expenses: 40 },
    { date: '2024-11-12', income: 290, expenses: 75 },
    { date: '2024-11-13', income: 340, expenses: 55 },
    { date: '2024-11-14', income: 425, expenses: 110 },
    { date: '2024-11-15', income: 185, expenses: 30 },
    { date: '2024-11-16', income: 295, expenses: 85 },
    { date: '2024-11-17', income: 370, expenses: 95 },
    { date: '2024-11-18', income: 215, expenses: 45 },
    { date: '2024-11-19', income: 455, expenses: 125 },
    { date: '2024-11-20', income: 325, expenses: 70 },
    { date: '2024-11-21', income: 280, expenses: 60 },
    { date: '2024-11-22', income: 395, expenses: 100 },
    { date: '2024-11-23', income: 440, expenses: 80 },
    { date: '2024-11-24', income: 200, expenses: 25 },
    { date: '2024-11-25', income: 750, expenses: 80 },
    { date: '2024-11-26', income: 416, expenses: 85 },
    { date: '2024-11-27', income: 650, expenses: 155 },
    { date: '2024-11-28', income: 425, expenses: 110 },
    { date: '2024-11-29', income: 0, expenses: 0 },
    { date: '2024-11-30', income: 0, expenses: 0 },
];

// Mock insights
export const mockInsights = {
    financialHealthScore: 78,
    peakEarningDays: ['Friday', 'Saturday', 'Sunday'],
    peakEarningHours: ['5 PM - 9 PM', '11 AM - 2 PM'],
    averageDailyIncome: 312,
    incomeStability: 'Moderate',
    topExpenseCategory: 'Gas',
    savingsRate: 22,
    recommendations: [
        'Your income is highest on weekends. Consider working more hours Friday-Sunday.',
        'Gas expenses are high. Track mileage for tax deductions.',
        'You\'re saving 22% of income - great job! Try to increase to 25%.',
        'Consider setting aside 30% for taxes to avoid year-end surprises.',
    ],
};

// Export summary stats
export const mockStats = {
    totalIncome: 24150,
    totalExpenses: 2680,
    netIncome: 21470,
    taxSetAside: 6037.50,
    savingsTotal: 7600,
    incomeChange: 12.5, // percentage
    expenseChange: -5.2, // percentage
};
