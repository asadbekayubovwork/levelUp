import { onMounted, onUnmounted } from "vue";
import type { Ref } from "vue";

export function useInfiniteScroll<T extends HTMLElement = HTMLElement>(
    targetRef: Ref<T | null>,
    callback: (entry: IntersectionObserverEntry) => void,
    options: IntersectionObserverInit = {}
) {
    let observer: IntersectionObserver | null = null;

    onMounted(() => {
        observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    callback(entry);
                }
            },
            {
                root: null,
                threshold: 0.1,
                ...options,
            },
        );

        if (targetRef.value) {
            observer.observe(targetRef.value);
        }
    });

    onUnmounted(() => {
        if (observer && targetRef.value) {
            observer.unobserve(targetRef.value);
        }
    });
}
