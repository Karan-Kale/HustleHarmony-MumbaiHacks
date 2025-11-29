import { clsx } from 'clsx';

const Badge = ({
    children,
    variant = 'default',
    size = 'md',
    className = '',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center font-medium rounded-full';

    const variants = {
        default: 'bg-dark-700 text-dark-200 border border-white/10',
        primary: 'bg-primary-500/20 text-primary-300 border border-primary-500/30',
        success: 'bg-success-500/20 text-success-300 border border-success-500/30',
        warning: 'bg-warning-500/20 text-warning-300 border border-warning-500/30',
        danger: 'bg-danger-500/20 text-danger-300 border border-danger-500/30',
        accent: 'bg-accent-500/20 text-accent-300 border border-accent-500/30',
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-base',
    };

    const badgeClasses = clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        className
    );

    return (
        <span className={badgeClasses} {...props}>
            {children}
        </span>
    );
};

export default Badge;
