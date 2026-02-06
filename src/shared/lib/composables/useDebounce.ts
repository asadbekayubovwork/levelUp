import { onUnmounted } from 'vue';

export function useDebounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number = 300
) {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const debouncedFunction = (...args: Parameters<T>) => {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };

    onUnmounted(() => {
        if (timer) {
            clearTimeout(timer);
        }
    });

    return debouncedFunction;
}