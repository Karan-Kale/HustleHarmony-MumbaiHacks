/**
 * Format currency values
 */
export const formatCurrency = (amount, options = {}) => {
    const {
        currency = 'USD',
        locale = 'en-US',
        minimumFractionDigits = 2,
        maximumFractionDigits = 2,
    } = options;

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits,
        maximumFractionDigits,
    }).format(amount);
};

/**
 * Format large numbers with abbreviations (1.2K, 1.5M, etc.)
 */
export const formatNumber = (num, decimals = 1) => {
    if (num === 0) return '0';
    if (num < 1000) return num.toFixed(0);

    const k = 1000;
    const sizes = ['', 'K', 'M', 'B', 'T'];
    const i = Math.floor(Math.log(num) / Math.log(k));

    return parseFloat((num / Math.pow(k, i)).toFixed(decimals)) + sizes[i];
};

/**
 * Format date to readable string
 */
export const formatDate = (date, options = {}) => {
    const {
        format = 'short', // 'short', 'medium', 'long', 'relative'
        locale = 'en-US',
    } = options;

    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if (format === 'relative') {
        return formatRelativeDate(dateObj);
    }

    const formatOptions = {
        short: { month: 'short', day: 'numeric' },
        medium: { month: 'short', day: 'numeric', year: 'numeric' },
        long: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
    };

    return new Intl.DateTimeFormat(locale, formatOptions[format] || formatOptions.medium).format(dateObj);
};

/**
 * Format date relative to now (e.g., "2 days ago", "in 3 hours")
 */
export const formatRelativeDate = (date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor((now - dateObj) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
    if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }
    if (diffInSeconds < 2592000) {
        const weeks = Math.floor(diffInSeconds / 604800);
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }

    return formatDate(dateObj, { format: 'medium' });
};

/**
 * Format percentage
 */
export const formatPercentage = (value, decimals = 1) => {
    return `${value.toFixed(decimals)}%`;
};

/**
 * Format time duration
 */
export const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
};

/**
 * Get initials from name
 */
export const getInitials = (name) => {
    if (!name) return '';

    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();

    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

/**
 * Truncate text with ellipsis
 */
export const truncate = (text, maxLength = 50) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};
