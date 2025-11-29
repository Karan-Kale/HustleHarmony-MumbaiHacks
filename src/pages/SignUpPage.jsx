import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Check } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

import { useAuth } from '../context/AuthContext';

const SignUpPage = ({ onSignUpSuccess, onNavigateToSignIn, onNavigateToLanding }) => {
    const { signUp } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const googleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => {
            console.log('Google Sign-Up Success:', codeResponse);
            // In a real app, send codeResponse.code to backend
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                if (onSignUp) {
                    onSignUp({
                        name: 'Google User',
                        email: 'google-user@example.com',
                        provider: 'google',
                        token: codeResponse.access_token
                    });
                }
            }, 1000);
        },
        onError: (error) => console.log('Google Sign-Up Error:', error),
    });

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name) {
            newErrors.name = 'Name is required';
        } else if (formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain uppercase, lowercase, and number';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        setIsLoading(true);
        setErrors({});

        try {
            await signUp(formData.email, formData.password, {
                full_name: formData.name,
            });
            if (onSignUpSuccess) {
                onSignUpSuccess();
            }
        } catch (error) {
            console.error('Sign up error:', error);
            setErrors({ form: error.message || 'Failed to sign up. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Password strength indicator
    const getPasswordStrength = () => {
        const password = formData.password;
        if (!password) return { strength: 0, label: '', color: '' };

        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;

        const levels = [
            { strength: 0, label: '', color: '' },
            { strength: 1, label: 'Weak', color: 'bg-danger-500' },
            { strength: 2, label: 'Fair', color: 'bg-warning-500' },
            { strength: 3, label: 'Good', color: 'bg-primary-500' },
            { strength: 4, label: 'Strong', color: 'bg-success-500' },
            { strength: 5, label: 'Very Strong', color: 'bg-success-600' },
        ];

        return levels[strength];
    };

    const passwordStrength = getPasswordStrength();

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">HH</span>
                        </div>
                        <h1 className="text-3xl font-bold gradient-text">HustleHarmony</h1>
                    </div>
                    <p className="text-dark-400">Create your account</p>
                </motion.div>

                {/* Sign Up Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="glass-card p-8">
                        {errors.form && (
                            <div className="mb-4 p-3 bg-danger-500/10 border border-danger-500/20 rounded-lg text-danger-400 text-sm">
                                {errors.form}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name Input */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-dark-200 mb-2">
                                    Full Name
                                </label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="John Doe"
                                    icon={<User size={18} />}
                                    value={formData.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-danger-400">{errors.name}</p>
                                )}
                            </div>

                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-dark-200 mb-2">
                                    Email Address
                                </label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    icon={<Mail size={18} />}
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-danger-400">{errors.email}</p>
                                )}
                            </div>

                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-dark-200 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        icon={<Lock size={18} />}
                                        value={formData.password}
                                        onChange={handleChange}
                                        error={errors.password}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-200 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1 text-sm text-danger-400">{errors.password}</p>
                                )}

                                {/* Password Strength Indicator */}
                                {formData.password && (
                                    <div className="mt-2">
                                        <div className="flex gap-1 mb-1">
                                            {[1, 2, 3, 4, 5].map((level) => (
                                                <div
                                                    key={level}
                                                    className={`h-1 flex-1 rounded-full transition-colors ${level <= passwordStrength.strength
                                                        ? passwordStrength.color
                                                        : 'bg-dark-700'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        {passwordStrength.label && (
                                            <p className="text-xs text-dark-400">
                                                Password strength: <span className="font-medium">{passwordStrength.label}</span>
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password Input */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-dark-200 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        icon={<Lock size={18} />}
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        error={errors.confirmPassword}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-200 transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="mt-1 text-sm text-danger-400">{errors.confirmPassword}</p>
                                )}
                            </div>

                            {/* Terms and Conditions */}
                            <div>
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className="relative flex items-center justify-center mt-0.5">
                                        <input
                                            type="checkbox"
                                            name="agreeToTerms"
                                            checked={formData.agreeToTerms}
                                            onChange={handleChange}
                                            className="w-5 h-5 rounded border-dark-600 bg-dark-800 text-primary-600 focus:ring-primary-500 focus:ring-offset-dark-900 cursor-pointer"
                                        />
                                        {formData.agreeToTerms && (
                                            <Check size={14} className="absolute text-white pointer-events-none" />
                                        )}
                                    </div>
                                    <span className="text-sm text-dark-300 group-hover:text-dark-200 transition-colors">
                                        I agree to the{' '}
                                        <a href="#" className="text-primary-400 hover:text-primary-300">
                                            Terms and Conditions
                                        </a>{' '}
                                        and{' '}
                                        <a href="#" className="text-primary-400 hover:text-primary-300">
                                            Privacy Policy
                                        </a>
                                    </span>
                                </label>
                                {errors.agreeToTerms && (
                                    <p className="mt-1 text-sm text-danger-400">{errors.agreeToTerms}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full"
                                loading={isLoading}
                                icon={<ArrowRight size={18} />}
                                iconPosition="right"
                            >
                                Create Account
                            </Button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-dark-900 text-dark-400">Or sign up with</span>
                            </div>
                        </div>

                        {/* Social Sign Up */}
                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                variant="secondary"
                                size="md"
                                className="w-full"
                                onClick={() => googleLogin()}
                                type="button"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Google
                            </Button>
                            <Button variant="secondary" size="md" className="w-full">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                </svg>
                                GitHub
                            </Button>
                        </div>
                    </div>

                    {/* Sign In Link */}
                    <p className="mt-6 text-center text-sm text-dark-400">
                        Already have an account?{' '}
                        <button
                            onClick={onNavigateToSignIn}
                            className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
                        >
                            Sign in
                        </button>
                    </p>

                    {/* Back to Landing */}
                    <p className="mt-4 text-center">
                        <button
                            onClick={onNavigateToLanding}
                            className="text-sm text-dark-500 hover:text-dark-300 transition-colors"
                        >
                            ← Back to home
                        </button>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default SignUpPage;
