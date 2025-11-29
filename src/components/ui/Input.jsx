import { clsx } from 'clsx';

const Input = ({
    label,
    error,
    icon,
    iconPosition = 'left',
    className = '',
    containerClassName = '',
    type = 'text',
    ...props
}) => {
    const inputClasses = clsx(
        'input-glass w-full',
        icon && iconPosition === 'left' && 'pl-12',
        icon && iconPosition === 'right' && 'pr-12',
        error && 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20',
        className
    );

    return (
        <div className={clsx('space-y-2', containerClassName)}>
            {label && (
                <label className="block text-sm font-medium text-dark-200">
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && iconPosition === 'left' && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    className={inputClasses}
                    {...props}
                />
                {icon && iconPosition === 'right' && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400">
                        {icon}
                    </div>
                )}
            </div>
            {error && (
                <p className="text-sm text-danger-400">{error}</p>
            )}
        </div>
    );
};

export default Input;
