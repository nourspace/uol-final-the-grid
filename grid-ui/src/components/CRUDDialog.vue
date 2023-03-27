<script setup lang="ts">
import CommentsBox from '@/components/CommentsBox.vue'
import DeleteDialog from '@/components/DeleteDialog.vue'
import { computed, ref, watch } from 'vue'

export interface Props {
  modelValue: boolean
  title?: string
  deleteTitle?: string
  loading?: boolean
  deleteLoading?: boolean
  enableForm?: boolean
  enableSave?: boolean
  enableDelete?: boolean
  comments?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Item',
  deleteTitle: 'Delete Item?',
  loading: false,
  deleteLoading: false,
  enableForm: false,
  enableSave: false,
  enableDelete: false,
  comments: false,
})

const emit = defineEmits(['update:modelValue', 'save', 'delete', 'cancel'])

const form = ref<any>(null)
const dialogDelete = ref(false)

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

watch(value, (value) => value || (dialogDelete.value = false))

async function submitForm() {
  const { valid } = form.value && (await form.value.validate())
  valid && emit('save')
}

// Todo (Nour): [improvement] add form https://vuetifyjs.com/en/components/forms/
// Todo (Nour): [UX] add validation https://vuetifyjs.com/en/components/text-fields/#custom-validation
</script>

<template>
  <!-- Delete Dialog -->
  <DeleteDialog
    v-model="dialogDelete"
    :loading="deleteLoading"
    :title="deleteTitle"
    @cancel="dialogDelete = false"
    @delete="emit('delete')"
  >
  </DeleteDialog>

  <v-dialog v-model="value" :max-width="comments ? '80vw' : '60vw'">
    <v-container>
      <v-row>
        <v-col :cols="comments ? 8 : 8" :offset="comments ? 0 : 2">
          <v-form ref="form" role="form" :aria-label="title" :disabled="!enableForm" @submit.prevent="submitForm">
            <v-card :loading="loading">
              <v-card-title role="heading" class="text-h4">{{ title }}</v-card-title>
              <v-card-text>
                <slot></slot>
              </v-card-text>
              <v-card-actions class="ma-2 mt-n4">
                <v-btn v-if="enableDelete" color="error" variant="outlined" @click="dialogDelete = true"> Delete</v-btn>
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
