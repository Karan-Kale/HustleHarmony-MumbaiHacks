import { motion } from 'framer-motion';
import { User, Mail, Calendar, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { formatDate } from '../utils/formatters';

const ProfilePage = () => {
    const { user, signOut } = useAuth();

    if (!user) return null;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">
                        {user.user_metadata?.full_name?.[0] || user.email?.[0]?.toUpperCase() || 'U'}
                    </span>
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-dark-50">
                        {user.user_metadata?.full_name || 'User Profile'}
                    </h1>
                    <p className="text-dark-400">Manage your account settings</p>
                </div>
            </div>

            <Card>
                <h2 className="text-xl font-bold text-dark-50 mb-6">Account Details</h2>
                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-dark-800/50">
                        <div className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center text-dark-300">
                            <User size={20} />
                        </div>
                        <div>
                            <p className="text-sm text-dark-400">Full Name</p>
                            <p className="font-medium text-dark-50">
                                {user.user_metadata?.full_name || 'Not set'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-xl bg-dark-800/50">
                        <div className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center text-dark-300">
                            <Mail size={20} />
                        </div>
                        <div>
                            <p className="text-sm text-dark-400">Email Address</p>
                            <p className="font-medium text-dark-50">{user.email}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-xl bg-dark-800/50">
                        <div className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center text-dark-300">
                            <Calendar size={20} />
                        </div>
                        <div>
                            <p className="text-sm text-dark-400">Member Since</p>
                            <p className="font-medium text-dark-50">
                                {formatDate(user.created_at, { format: 'medium' })}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                    <Button
                        variant="danger"
                        className="w-full sm:w-auto"
                        icon={<LogOut size={18} />}
                        onClick={signOut}
                    >
                        Sign Out
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default ProfilePage;
