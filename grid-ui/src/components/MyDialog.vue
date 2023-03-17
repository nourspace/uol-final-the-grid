<script setup lang="ts">
import CommentsBox from '@/components/CommentsBox.vue'
import { computed, ref } from 'vue'

export interface Props {
  modelValue: boolean
  title?: string
  loading?: boolean
  enableForm?: boolean
  enableSave?: boolean
  enableDelete?: boolean
  comments?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Item',
  loading: false,
  enableForm: false,
  enableSave: false,
  enableDelete: false,
  comments: false,
})

const emit = defineEmits(['update:modelValue', 'save', 'delete', 'cancel'])

const form = ref<any>(null)
const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

async function submitForm() {
  const { valid } = form.value && await form.value.validate()
  valid && emit('save')
}

// Todo (Nour): [improvement] add form https://vuetifyjs.com/en/components/forms/
// Todo (Nour): [UX] add validation https://vuetifyjs.com/en/components/text-fields/#custom-validation
</script>

<template>
  <v-dialog v-model="value" :max-width="comments ? '80vw' : '60vw'">
    <v-container>
      <v-row>
        <v-col :cols="comments ? 8 : 8" :offset="comments ? 0 : 2">
          <v-form ref="form" :disabled="!enableForm" @submit.prevent="submitForm">
            <v-card :title="title" :loading="loading">
              <v-card-text>
                <slot></slot>
              </v-card-text>
              <v-card-actions class="ma-2">
                <v-btn v-if="enableDelete" color="error" variant="outlined" @click="emit('delete')"> Delete</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="grey-darken-1" variant="text" @click="emit('cancel')"> Cancel</v-btn>
                <v-btn v-if="enableSave" color="primary-darken-1" variant="outlined" type="submit"> Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
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
