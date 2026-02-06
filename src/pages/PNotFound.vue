<script setup lang="ts">
import { useRouter } from "vue-router"
import { Home, ArrowLeft } from "lucide-vue-next"

const router = useRouter()

const goBack = () => {
  router.back()
}

const goHome = () => {
  router.push("/")
}
</script>

<template>
  <div class="not-found-container">
    <!-- Content -->
    <div class="content">
      <!-- 404 Number -->
      <div class="error-code">
        <span class="digit zero">4</span>
        <span class="digit zero"> 0 </span>
        <span class="digit zero">4</span>
      </div>

      <!-- Message -->
      <h1 class="title">Sahifa topilmadi</h1>
      <p class="description">
        Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki boshqa manzilga
        ko'chirilgan bo'lishi mumkin.
      </p>

      <!-- Action Buttons -->
      <div class="actions">
        <button @click="goBack" class="btn btn-secondary">
          <ArrowLeft :size="20" />
          <span>Ortga qaytish</span>
        </button>
        <button @click="goHome" class="btn btn-primary">
          <Home :size="20" />
          <span>Bosh sahifa</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  position: relative;
  overflow: hidden;
  padding: 2rem;
}

/* Animated Background */
.background-animation {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.4;
  animation: float 8s ease-in-out infinite;
}

.shape-1 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  top: -100px;
  left: -100px;
  animation-delay: 0s;
}

.shape-2 {
  width: 250px;
  height: 250px;
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
  bottom: -80px;
  right: -80px;
  animation-delay: 2s;
}

.shape-3 {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
  top: 50%;
  right: 10%;
  animation-delay: 4s;
}

.shape-4 {
  width: 180px;
  height: 180px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  bottom: 20%;
  left: 10%;
  animation-delay: 6s;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-30px) rotate(10deg);
  }
}

/* Content */
.content {
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 600px;
}

/* 404 Number */
.error-code {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.digit {
  font-size: clamp(80px, 15vw, 150px);
  font-weight: 800;
  background: linear-gradient(135deg, #1e293b 0%, #64748b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: slideIn 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(-30px);
}

.digit:nth-child(1) {
  animation-delay: 0.1s;
}

.digit:nth-child(2) {
  animation-delay: 0.2s;
}

.digit:nth-child(3) {
  animation-delay: 0.3s;
}

.zero {
  position: relative;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.pulse-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  border: 3px solid rgba(59, 130, 246, 0.5);
  border-radius: 50%;
  animation: pulse 2s ease-out infinite;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 1;
  }

  100% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Title & Description */
.title {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  animation: fadeIn 0.8s ease-out 0.5s forwards;
  opacity: 0;
}

.description {
  font-size: clamp(1rem, 2vw, 1.125rem);
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  animation: fadeIn 0.8s ease-out 0.7s forwards;
  opacity: 0;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

/* Action Buttons */
.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: fadeIn 0.8s ease-out 0.9s forwards;
  opacity: 0;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  outline: none;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: #ffffff;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 30px rgba(59, 130, 246, 0.5);
}

.btn-secondary {
  background: #f1f5f9;
  color: #1e293b;
  border: 1px solid #e2e8f0;
}

.btn-secondary:hover {
  background: #e2e8f0;
  transform: translateY(-2px);
}

/* Decorative Lines */
.decorative-line {
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg,
      transparent 0%,
      rgba(59, 130, 246, 0.5) 50%,
      transparent 100%);
  animation: lineExpand 2s ease-out infinite;
}

.line-1 {
  width: 200px;
  top: 30%;
  left: 5%;
  transform: rotate(-30deg);
}

.line-2 {
  width: 150px;
  bottom: 30%;
  right: 10%;
  transform: rotate(30deg);
  animation-delay: 1s;
}

@keyframes lineExpand {

  0%,
  100% {
    opacity: 0.3;
    transform: scaleX(0.8);
  }

  50% {
    opacity: 0.8;
    transform: scaleX(1.2);
  }
}

/* Responsive */
@media (max-width: 640px) {
  .actions {
    flex-direction: column;
    width: 100%;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .pulse-ring {
    width: 80px;
    height: 80px;
  }
}
</style>
