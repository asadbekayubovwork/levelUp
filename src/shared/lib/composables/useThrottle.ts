export function useThrottle(callback: (...args: any[]) => void, delay = 1000) {
    let isWaiting = false;

    return (...args: any[]) => {
        if (isWaiting) return;
        callback(...args);
        isWaiting = true;
        setTimeout(() => {
            isWaiting = false;
        }, delay);
    };
}
