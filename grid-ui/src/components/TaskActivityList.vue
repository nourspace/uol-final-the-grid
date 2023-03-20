<script setup lang="ts">
import { chipColor, getInitials } from '@/utils'

export interface Props {
  activities: string[]
}

const props = withDefaults(defineProps<Props>(), {
  activities: () => [],
})
</script>

<template>
  <v-card-title class="bg-white rounded-lg py-2 pl-4 mb-1">Activities</v-card-title>
  <v-sheet ref="container" rounded class="pa-0 mb-4 flex-grow-1 d-flex">
    <v-virtual-scroll ref="scroll" :items="props.activities" :max-height="200" item-height="64">
      <template v-slot:default="{ item: activity }">
        <v-list-item :title="activity" class="mb-2 border-b" lines="one">
          <template #prepend>
            <v-avatar size="32" :color="chipColor(activity)">{{ getInitials(activity) }}</v-avatar>
          </template>
        </v-list-item>
      </template>
    </v-virtual-scroll>
  </v-sheet>
</template>