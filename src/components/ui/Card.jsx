import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const Card = ({
    children,
    variant = 'default',
    hover = false,
    className = '',
    onClick,
    ...props
}) => {
    const baseStyles = 'glass-card p-6';

    const variants = {
        default: '',
        highlighted: 'border-primary-500/30 bg-primary-900/10',
        interactive: 'cursor-pointer',
    };

    const hoverStyles = hover ? 'glass-card-hover' : '';

    const cardClasses = clsx(
        baseStyles,
        variants[variant],
        hoverStyles,
        onClick && 'cursor-pointer',
        className
    );

    const CardComponent = onClick || hover ? motion.div : 'div';
    const motionProps = onClick || hover ? {
        whileHover: { scale: 1.02, y: -2 },
        transition: { duration: 0.2 }
    } : {};

    return (
        <CardComponent
            className={cardClasses}
            onClick={onClick}
            {...motionProps}
            {...props}
        >
            {children}
        </CardComponent>
    );
};

export default Card;
