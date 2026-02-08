export function useThrottle<T extends (...args: any[]) => any>(
    callback: T,
    delay = 1000
) {
    let isWaiting = false;

    const throttledFunction = (...args: Parameters<T>): ReturnType<T> | void => {
        if (isWaiting) return;
        const result = callback(...args);
        isWaiting = true;
        setTimeout(() => {
            isWaiting = false;
        }, delay);
        return result;
    };

    return throttledFunction;
}
