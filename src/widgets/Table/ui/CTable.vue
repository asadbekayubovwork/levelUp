<template>
  <div class="relative border border-secondary-20 rounded-xl">
    <table class="w-full">
      <thead class="text-xs text-secondary-60">
        <tr class="border-b border-secondary-20 text-left">
          <th scope="col" class="py-3 w-14"></th>
          <th v-for="head in tableHead" :key="head.id" scope="col" class="py-3">
            {{ head.name }}
          </th>
        </tr>
      </thead>
      <tbody class="text-secondary-100">
        <tr
          v-for="item in data"
          :key="item.id"
          class="bg-white border-b border-gray-200"
        >
          <td scope="row" class="text-center py-4 font-medium">1</td>
          <td
            v-for="head in tableHead"
            :key="head.id"
            scope="row"
            class="py-4 font-medium"
          >
            <slot :name="head.id" :item="item">
              {{ item[head.id] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

interface Props {
  data: any[]
  tableHead: {
    id: string
    name: string
  }[]
}

defineProps<Props>()

const currentPage = ref(1)
const pageSize = ref(10)
const totalItems = ref(250)

const handleCurrentChange = (page: number) => {
  currentPage.value = page
}

const handleSizeChange = (size: number) => {
  pageSize.value = size
}
</script>
