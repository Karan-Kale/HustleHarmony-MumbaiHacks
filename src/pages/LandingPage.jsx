import { motion } from 'framer-motion';
import { ArrowRight, DollarSign, TrendingUp, Shield, Zap, Target, PieChart } from 'lucide-react';
import Button from '../components/ui/Button';

const LandingPage = ({ onGetStarted }) => {
    const features = [
        {
            icon: DollarSign,
            title: 'Multi-Platform Income Tracking',
            description: 'Automatically sync earnings from Uber, DoorDash, Upwork, Fiverr, and more in one place.',
        },
        {
            icon: PieChart,
            title: 'Smart Expense Management',
            description: 'Track business expenses, categorize spending, and maximize tax deductions effortlessly.',
        },
        {
            icon: Calculator,
            title: 'Automated Tax Estimates',
            description: 'Real-time quarterly tax calculations with smart recommendations to avoid penalties.',
        },
        {
            icon: Target,
            title: 'Savings Goals',
            description: 'Set and track financial goals with automated savings suggestions based on your income.',
        },
        {
            icon: TrendingUp,
            title: 'Financial Insights',
            description: 'AI-powered analytics reveal your peak earning times and spending patterns.',
        },
        {
            icon: Shield,
            title: 'Secure & Private',
            description: 'Bank-level encryption keeps your financial data safe and completely private.',
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 px-4">
                {/* Background Effects */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-float" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-600/20 rounded-full blur-3xl animate-float animation-delay-500" />
                </div>

                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/20 border border-primary-500/30 mb-8"
                        >
                            <Zap size={16} className="text-primary-400" />
                            <span className="text-sm font-medium text-primary-300">Your Autonomous Financial Co-Pilot</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                            <span className="text-dark-50">Master Your </span>
                            <span className="gradient-text">Gig Economy</span>
                            <br />
                            <span className="text-dark-50">Finances</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-dark-300 mb-12 max-w-3xl mx-auto">
                            Track income from multiple platforms, optimize taxes, and achieve your financial goals—all in one intelligent dashboard built for hustlers.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                size="lg"
                                onClick={onGetStarted}
                                icon={<ArrowRight size={20} />}
                                iconPosition="right"
                            >
                                Get Started Free
                            </Button>
                            <Button
                                size="lg"
                                variant="secondary"
                            >
                                Watch Demo
                            </Button>
                        </div>

                        <p className="text-sm text-dark-400 mt-6">
                            No credit card required • 14-day free trial • Cancel anytime
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="gradient-text">Everything You Need</span>
                        </h2>
                        <p className="text-xl text-dark-300">
                            Powerful features designed specifically for gig workers
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass-card p-6 hover:bg-dark-800/80 transition-all duration-300 group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Icon size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-dark-50 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-dark-300">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="glass-card p-12 text-center relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-accent-600/20 -z-10" />

                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark-50">
                            Ready to Take Control?
                        </h2>
                        <p className="text-xl text-dark-300 mb-8">
                            Join thousands of gig workers who've simplified their finances
                        </p>
                        <Button
                            size="lg"
                            onClick={onGetStarted}
                            icon={<ArrowRight size={20} />}
                            iconPosition="right"
                        >
                            Start Your Free Trial
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

// Missing import
import { Calculator } from 'lucide-react';

export default LandingPage;
