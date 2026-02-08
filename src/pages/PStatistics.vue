<script setup>
import { ref, onMounted, markRaw, onUnmounted } from 'vue'
import {
    Chart,
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js'
import { productService } from '@/entities/products/api/productService'
import { useThrottle } from '@/shared/lib/composables/useThrottle'

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const canvasRef = ref(null)
const chartInstance = ref(null)
const chartData = ref(null)

const fetchData = async () => {
    try {
        const data = await productService.getProducts(10)
        chartData.value = data
        drawChart()
    } catch (error) {
        console.error('Error fetching statistics:', error)
    }
}

const drawChart = () => {
    if (!canvasRef.value || !chartData.value) return;

    if (chartInstance.value) {
        chartInstance.value.destroy()
    }

    const ctx = canvasRef.value.getContext('2d')

    chartInstance.value = markRaw(new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartData.value.products.map(p => p.title),
            datasets: [{
                label: 'Price',
                data: chartData.value.products.map(p => p.price),
                backgroundColor: '#18A058'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    }))
}

const throttledResize = useThrottle(3000, drawChart)
window.addEventListener('resize', throttledResize)

onMounted(fetchData)
onUnmounted(() => {
    window.removeEventListener('resize', throttledResize)
})

</script>

<template>
    <div class="p-4 w-full h-[600px]">
        <div class="w-[70%] mx-auto relative h-full">
            <canvas ref="canvasRef"></canvas>
        </div>
    </div>
</template>