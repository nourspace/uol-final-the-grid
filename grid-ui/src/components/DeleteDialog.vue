<script setup lang="ts">
import { computed } from 'vue'

export interface Props {
  modelValue: boolean
  title?: string
  width?: string
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Are you sure you want to delete this item?',
  width: '600px',
  loading: false
})

const emit = defineEmits(['update:modelValue', 'delete', 'cancel'])

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
// Todo (Nour): [refactor] this and MyDialog are identical
</script>

<template>
  <v-dialog role="dialog" v-model="value" :max-width="width">
    <v-card :loading="loading">
      <v-card-title role="heading" class="text-h5">{{ title }}</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey-darken-1" variant="text" @click="emit('cancel')"> Cancel </v-btn>
        <v-btn color="error" variant="outlined" @click="emit('delete')"> Delete </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
