<script setup lang="ts">
import CommentsBox from '@/components/CommentsBox.vue'
import { computed } from 'vue'

export interface Props {
  modelValue: boolean
  title?: string
  loading?: boolean
  comments?: boolean
  deleteAction?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Item',
  loading: false,
  comments: false,
  deleteAction: false,
})

const emit = defineEmits(['update:modelValue', 'ok', 'cancel', 'delete'])

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
// Todo (Nour): [improvement] add form https://vuetifyjs.com/en/components/forms/
// Todo (Nour): [UX] add validation https://vuetifyjs.com/en/components/text-fields/#custom-validation
</script>

<template>
  <v-dialog v-model="value" :max-width="comments ? '80vw' : '60vw'">
    <v-container>
      <v-row>
        <v-col :cols="comments ? 8 : 8" :offset="comments ? 0 : 2">
          <v-card :title="title" :loading="loading">
            <v-card-text>
              <slot></slot>
            </v-card-text>
            <v-card-actions class="ma-2">
              <v-btn v-if="deleteAction" color="error" variant="outlined" @click="emit('delete')"> Delete </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="grey-darken-1" variant="text" @click="emit('cancel')"> Cancel </v-btn>
              <v-btn color="primary-darken-1" variant="outlined" @click="emit('ok')"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col v-if="comments" cols="4">
          <CommentsBox />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <slot name="footer"></slot>
        </v-col>
      </v-row>
    </v-container>
  </v-dialog>
</template>
