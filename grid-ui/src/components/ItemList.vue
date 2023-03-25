<script setup lang="ts">
import { chipColor, getInitials } from '@/utils'

export interface Props {
  title: string
  items: string[]
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Items',
  items: () => [],
})
</script>

<template>
  <v-card-title class="bg-white rounded-lg py-2 pl-4 mb-1">{{ title }}</v-card-title>
  <v-sheet ref="container" rounded class="pa-0 mb-4 flex-grow-1 d-flex">
    <v-virtual-scroll ref="scroll" :items="items" :max-height="200" item-height="64">
      <template v-slot:default="{ item }">
        <v-list-item :title="item" class="mb-2 border-b" lines="one">
          <template #prepend>
            <v-avatar size="32" :color="chipColor(item)">{{ getInitials(item) }}</v-avatar>
          </template>
        </v-list-item>
      </template>
    </v-virtual-scroll>
  </v-sheet>
</template>
