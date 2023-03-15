<script setup lang="ts">
import { computed } from 'vue'

export interface Props {
  modelValue: boolean
  title?: string
  width?: string
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Item',
  width: '600px',
  loading: false
})

const emit = defineEmits(['update:modelValue', 'ok', 'cancel'])

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
// Todo (Nour): [improvement] add form https://vuetifyjs.com/en/components/forms/
// Todo (Nour): [UX] add validation https://vuetifyjs.com/en/components/text-fields/#custom-validation
</script>

<template>
  <v-dialog v-model="value" :max-width="width">
    <v-card :title="title" :loading="loading">
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="emit('cancel')"> Cancel</v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="emit('ok')"> Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
