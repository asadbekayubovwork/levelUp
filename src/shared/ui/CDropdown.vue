<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue"

interface Option {
  id: number | string
  name: string
}

interface Props {
  modelValue: number | string
  options: Option[]
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "Tanlang",
})

const emit = defineEmits<{
  "update:modelValue": [value: number | string]
}>()

const isOpen = ref(false)
const dropdownRef = ref<HTMLDivElement | null>(null)

const selectedOption = computed(() => {
  return props.options.find((option) => option.id === props.modelValue)
})

const displayText = computed(() => {
  return selectedOption.value?.name || props.placeholder
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: Option) => {
  emit("update:modelValue", option.id)
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside)
})
</script>

<template>
  <div ref="dropdownRef" class="custom-dropdown">
    <!-- Selected Option Display -->
    <button
      type="button"
      @click="toggleDropdown"
      class="dropdown-trigger"
      :class="{ active: isOpen }"
    >
      <span :class="{ placeholder: !selectedOption }">{{ displayText }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="dropdown-arrow"
        :class="{ rotated: isOpen }"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    </button>

    <!-- Dropdown Options -->
    <transition name="dropdown">
      <div v-if="isOpen" class="dropdown-menu">
        <button
          v-for="option in options"
          :key="option.id"
          type="button"
          @click="selectOption(option)"
          class="dropdown-option"
          :class="{ selected: option.id === modelValue }"
        >
          {{ option.name }}
        </button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.custom-dropdown {
  position: relative;
  width: 100%;
}

.dropdown-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 1.25rem;
  height: 48.5px;
  background: white;
  border: 1px solid #eaecf0;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 400;
  color: #000;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
}

.dropdown-trigger:hover {
  border-color: #6d28d9;
}

.dropdown-trigger.active {
  border-color: #7c3aed;
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
}

.dropdown-trigger .placeholder {
  color: #9ca3af;
}

.dropdown-arrow {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  z-index: 50;
  max-height: 16rem;
  overflow-y: auto;
}

.dropdown-option {
  width: 100%;
  padding: 1rem 1.25rem;
  text-align: left;
  background: white;
  border: none;
  font-size: 1rem;
  color: #000;
  cursor: pointer;
  transition: background-color 0.15s ease;
  border-bottom: 1px solid #f3f4f6;
}

.dropdown-option:last-child {
  border-bottom: none;
}

.dropdown-option:hover {
  background-color: #f9fafb;
}

.dropdown-option.selected {
  background-color: #ede9fe;
  color: #7c3aed;
  font-weight: 500;
}

/* Dropdown Animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-0.5rem);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-0.5rem);
}

/* Scrollbar Styling */
.dropdown-menu::-webkit-scrollbar {
  width: 0.375rem;
}

.dropdown-menu::-webkit-scrollbar-track {
  background: #f3f4f6;
}

.dropdown-menu::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 0.25rem;
}

.dropdown-menu::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
