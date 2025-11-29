import { motion } from 'framer-motion';
import { Menu, X, Home, DollarSign, CreditCard, Calculator, Target, TrendingUp, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Header = ({ currentPage, onNavigate }) => {
    const { user, signOut } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigation = [
        { name: 'Dashboard', icon: Home, page: 'dashboard' },
        { name: 'Income', icon: DollarSign, page: 'income' },
        { name: 'Expenses', icon: CreditCard, page: 'expenses' },
        { name: 'Tax', icon: Calculator, page: 'tax' },
        { name: 'Savings', icon: Target, page: 'savings' },
        { name: 'Insights', icon: TrendingUp, page: 'insights' },
    ];

    return (
        <header className="sticky top-0 z-30 glass-card border-b border-white/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center">
                            <span className="text-xl font-bold text-white">HH</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold gradient-text">HustleHarmony</h1>
                            <p className="text-xs text-dark-400 hidden sm:block">Financial Co-Pilot</p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentPage === item.page;

                            return (
                                <button
                                    key={item.name}
                                    onClick={() => onNavigate(item.page)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isActive
                                        ? 'bg-primary-500/20 text-primary-300'
                                        : 'text-dark-300 hover:text-dark-50 hover:bg-dark-800/50'
                                        }`}
                                >
                                    <Icon size={18} />
                                    <span className="text-sm font-medium">{item.name}</span>
                                </button>
                            );
                        })}
                    </nav>

                    {/* User Menu */}
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:block text-right">
                            <div className="text-sm font-medium text-dark-50">{user?.name || 'User'}</div>
                            <div className="text-xs text-dark-400">{user?.email || 'user@email.com'}</div>
                        </div>
                        <button
                            onClick={() => onNavigate('profile')}
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center hover:opacity-90 transition-opacity"
                        >
                            <User size={20} className="text-white" />
                        </button>

                        <button
                            onClick={signOut}
                            className="p-2 rounded-lg hover:bg-dark-800/50 text-dark-300 hover:text-danger-400 transition-colors"
                            title="Sign Out"
                        >
                            <LogOut size={20} />
                        </button>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-dark-800/50 text-dark-300"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <motion.nav
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden py-4 border-t border-white/10"
                    >
                        <div className="space-y-1">
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                const isActive = currentPage === item.page;

                                return (
                                    <button
                                        key={item.name}
                                        onClick={() => {
                                            onNavigate(item.page);
                                            setMobileMenuOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                            ? 'bg-primary-500/20 text-primary-300'
                                            : 'text-dark-300 hover:text-dark-50 hover:bg-dark-800/50'
                                            }`}
                                    >
                                        <Icon size={20} />
                                        <span className="font-medium">{item.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.nav>
                )}
            </div>
        </header>
    );
};

export default Header;
