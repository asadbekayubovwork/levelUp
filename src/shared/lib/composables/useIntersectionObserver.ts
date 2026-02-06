import { onMounted, onUnmounted } from "vue";
import type { Ref } from "vue";

export function useInfiniteScroll(targetRef: Ref<HTMLElement | null>, callback: () => void, options = {}) {
    let observer: IntersectionObserver | null = null;

    onMounted(() => {
        observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    callback();
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
