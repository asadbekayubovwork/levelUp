import { createApp } from "vue"
import App from "./App.vue"
import "./index.css"
import { setupProviders } from "@/app/providers"

const app = createApp(App)

app.directive("focus-input", {
    mounted(el) {
        const input = el.querySelector('input');
        if (input) {
            input.focus();
        }
    },
});

app.directive("custom-tooltip", {
    mounted(el, binding) {
        const tooltipSpan = document.createElement("span");
        tooltipSpan.className = "custom-tooltip";
        tooltipSpan.innerText = binding.value;

        document.body.appendChild(tooltipSpan);

        const showTooltip = () => {
            const rect = el.getBoundingClientRect();
            tooltipSpan.style.display = "block";
            tooltipSpan.style.left = `${rect.left + rect.width / 2}px`;
            tooltipSpan.style.top = `${rect.top - 10}px`;
        };

        const hideTooltip = () => {
            tooltipSpan.style.display = "none";
        };

        el.addEventListener("mouseenter", showTooltip);
        el.addEventListener("mouseleave", hideTooltip);

        el._tooltipCleanup = () => {
            el.removeEventListener("mouseenter", showTooltip);
            el.removeEventListener("mouseleave", hideTooltip);
            tooltipSpan.remove();
        };
    },
    unmounted(el) {
        if (el._tooltipCleanup) {
            el._tooltipCleanup();
        }
    },
});

setupProviders(app)

export { app }
