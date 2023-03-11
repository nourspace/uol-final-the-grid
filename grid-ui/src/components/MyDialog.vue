<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: boolean
  title: string
  width: string
}>()

const emit = defineEmits(['update:modelValue', 'save', 'cancel'])

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
// Todo: add form https://vuetifyjs.com/en/components/forms/
// Todo: add validation https://vuetifyjs.com/en/components/text-fields/#custom-validation
</script>
<template>
  <v-dialog v-model="value" :max-width="width">
    <v-card :title="title">
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="emit('cancel')"> Cancel</v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="emit('save')"> Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>