import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'left',
    loading = false,
    disabled = false,
    className = '',
    onClick,
    type = 'button',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus-ring disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 text-white shadow-lg hover:shadow-glow',
        secondary: 'bg-dark-700 hover:bg-dark-600 text-dark-50 border border-white/10 hover:border-white/20',
        ghost: 'bg-transparent hover:bg-dark-800/50 text-dark-200 hover:text-dark-50',
        danger: 'bg-gradient-to-r from-danger-600 to-danger-700 hover:from-danger-500 hover:to-danger-600 text-white shadow-lg',
        success: 'bg-gradient-to-r from-success-600 to-success-700 hover:from-success-500 hover:to-success-600 text-white shadow-lg',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm gap-1.5',
        md: 'px-6 py-3 text-base gap-2',
        lg: 'px-8 py-4 text-lg gap-2.5',
    };

    const buttonClasses = clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        className
    );

    return (
        <motion.button
            type={type}
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled || loading}
            whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
            whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
            {...props}
        >
            {loading && (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {icon && iconPosition === 'left' && !loading && icon}
            {children}
            {icon && iconPosition === 'right' && !loading && icon}
        </motion.button>
    );
};

export default Button;
