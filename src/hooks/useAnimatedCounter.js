import { useEffect, useState } from 'react';

/**
 * Custom hook for animated number counting
 */
export const useAnimatedCounter = (endValue, duration = 1000, startValue = 0) => {
    const [count, setCount] = useState(startValue);

    useEffect(() => {
        let startTime;
        let animationFrame;

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            // Easing function (easeOutQuad)
            const easeProgress = progress * (2 - progress);

            const currentCount = startValue + (endValue - startValue) * easeProgress;
            setCount(currentCount);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [endValue, duration, startValue]);

    return count;
};
