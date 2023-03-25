<script setup lang="ts">
import { chipColor, getInitials } from '@/utils'
import { mdiSend } from '@mdi/js'
import { onMounted, ref } from 'vue'

const scroll = ref(null)
const container = ref(null)
const maxHeight = ref(0)

const newComment = ref('')
const comments = ref([
  "Capturing life's best moments!",
  'Find beauty in the ordinary.',
  'Embrace change, grow from it.',
  'Listen more, speak less.',
  'Patience conquers resistance.',
  'Kindness costs nothing.',
  'Action speaks louder.',
  'Chase the light, seize the moment.',
])

function addComment(comment: string) {
  comments.value.push(comment)
  newComment.value = ''
  console.log({ container, maxHeight })
  // Todo (Nour): fix scrolling to last comment
  if (scroll.value) {
    // @ts-ignore
    scroll.value.$el.scrollTop = scroll.value.$el.scrollHeight
  }
}

onMounted(() => {
  // @ts-ignore
  maxHeight.value = container.value.$el.offsetHeight
})
</script>

<template>
  <v-sheet color="white" width="100%" height="100%" rounded elevation="12" class="pa-2 d-flex flex-column justify-end">
      <v-card-title>Comments [mock data]</v-card-title>
    <v-sheet ref="container" class="pa-0 mb-4 flex-grow-1 d-flex">
      <v-virtual-scroll ref="scroll" :items="comments" :max-height="maxHeight" item-height="64">
        <template v-slot:default="{ item: comment }">
          <v-list-item :title="comment" class="mb-2" border rounded="lg" lines="two">
            <template #prepend>
              <v-avatar size="32" :color="chipColor(comment)">{{ getInitials(comment) }}</v-avatar>
            </template>
          </v-list-item>
        </template>
      </v-virtual-scroll>
    </v-sheet>
    <v-text-field
      v-model="newComment"
      label="Add comment"
      hide-details
      class="flex-grow-0"
      placeholder="Say something about this"
      variant="outlined"
      :append-inner-icon="mdiSend"
      @click:append-inner="addComment(newComment)"
      @keyup.enter.prevent="addComment(newComment)"
    ></v-text-field>
  </v-sheet>
</template>

<style scoped></style>
