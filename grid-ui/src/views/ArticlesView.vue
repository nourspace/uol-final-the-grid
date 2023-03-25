<script setup lang="ts">
import CRUDDialog from '@/components/CRUDDialog.vue'
import DataTable from '@/components/DataTable.vue'
import ItemList from '@/components/ItemList.vue'
import { useCRUDMutations } from '@/composables/useCRUDMutations'
import { useListQuery } from '@/composables/useListQuery'
import {
  DeleteArticle as deleteMutation,
  InsertArticle as insertMutation,
  UpdateArticle as updateMutation,
} from '@/graph/articles.mutation.gql'
import { AllArticles } from '@/graph/articles.query.gql'
import { StreamArticles } from '@/graph/articles.subscription.gql'
import type { Article, Task } from '@/services/articles'
import { useAuthStore } from '@/stores/auth'
import { useEnumsStore } from '@/stores/enums'
import { storeToRefs } from 'pinia'
import { computed, nextTick, ref, watch } from 'vue'

// List
const searchTerm = ref('')
const queryVariables = computed(() => ({ search: `%${searchTerm.value}%` }))
const {
  items: articles,
  loading,
  error,
} = useListQuery({ query: AllArticles, queryVariables, subscription: StreamArticles })

const headers = [
  { title: 'ID', align: 'start', key: 'id' },
  { title: 'Type', align: 'start', key: 'type' },
  { title: 'Status', align: 'start', key: 'status' },
  { title: 'Title', align: 'start', key: 'title' },
  { title: 'Summary', align: 'start', key: 'summary' },
  { title: 'URL', align: 'start', key: 'url' },
  { title: 'By', align: 'end', key: 'created_by' },
  { title: 'Created', align: 'end', key: 'created_at' },
  { title: 'Updated', align: 'end', key: 'updated_at' },
]

// Dialogs
const dialog = ref(false)
const defaultItem: Article = { title: '', summary: '', body: '', type: 'blog_post', status: undefined, url: '' }
const editedItem = ref<Article>(Object.assign({}, defaultItem))
const selectedItemId = ref<number | undefined>(undefined)
const isNewItem = computed(() => !selectedItemId.value)
const selectedItemOwnerId = ref<number | undefined>(undefined)
const { user } = storeToRefs(useAuthStore())
const isItemOwner = computed(() => selectedItemOwnerId.value == user.value.id)
const dialogTitle = computed(() => (selectedItemId.value ? `Edit Article: ${selectedItemId.value}` : 'New Article'))
const dialogDeleteTitle = computed(() => `Are you sure you want to delete article: ${selectedItemId.value}?`)
const { articleStatus, articleType } = storeToRefs(useEnumsStore())
const articleTasks = ref<string[]>([])

// Useful for when user clicks away and closes the dialogs
watch(dialog, (value) => value || reset())

const reset = () => {
  console.log('reset')
  dialog.value = false
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem)
    selectedItemId.value = undefined
    selectedItemOwnerId.value = undefined
  })
}

// Mutations
const { insertItem, insertLoading, updateItem, updateLoading, deleteItem, deleteLoading } = useCRUDMutations({
  insertMutation,
  updateMutation,
  deleteMutation,
  editedItem,
  selectedItemId,
  reset,
  listQuery: 'AllArticles',
})

// Dialog functions

const saveItem = () => {
  console.debug('saveItem', { editedItem: editedItem.value })
  // insert or update
  isNewItem.value ? insertItem() : updateItem()
}
const updateItemDialog = ({ id, status, type, title, summary, body, url, tasks, created_by_object }: Article) => {
  console.debug('updating...', id)
  editedItem.value = { status, type, title, summary, body, url }
  selectedItemId.value = id
  selectedItemOwnerId.value = created_by_object?.id
  dialog.value = true
  articleTasks.value = tasks ? tasks.map((t: Task) => t.title): []
}
</script>

<template>
  <div>
    <!-- CRUD Dialog -->
    <CRUDDialog
      v-model="dialog"
      :loading="insertLoading || updateLoading || deleteLoading"
      :delete-loading="deleteLoading"
      :title="dialogTitle"
      :delete-title="dialogDeleteTitle"
      :enable-form="isNewItem || isItemOwner"
      :enable-save="isNewItem || isItemOwner"
      :enable-delete="isItemOwner"
      :comments="!isNewItem"
      @save="saveItem"
      @delete="deleteItem"
      @cancel="reset"
    >
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field hide-details v-model="editedItem.title" label="Title" />
          </v-col>
          <v-col cols="6">
            <v-select
              hide-details
              :items="articleType.map((c) => c.value)"
              v-model="editedItem.type"
              label="Type"
              density="comfortable"
            />
          </v-col>
          <v-col cols="6">
            <v-select
              hide-details
              :items="articleStatus.map((c) => c.value)"
              v-model="editedItem.status"
              label="Status"
              density="comfortable"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field hide-details v-model="editedItem.url" label="URL" density="comfortable" />
          </v-col>
          <v-col cols="12">
            <v-textarea hide-details v-model="editedItem.summary" label="Summary" rows="2" density="comfortable" />
          </v-col>
          <v-col cols="12">
            <v-textarea hide-details v-model="editedItem.body" label="Body" />
          </v-col>
        </v-row>
      </v-container>

      <!-- Tasks list -->
      <template #footer v-if="!isNewItem && articleTasks.length">
        <ItemList title="Tasks" :items="articleTasks" />
      </template>
    </CRUDDialog>

    <!-- DataTable -->
    <DataTable
      :headers="headers"
      :items="articles"
      :loading="loading"
      :error="error"
      v-model:search-term="searchTerm"
      new-label="New Article"
      search-label="Search Articles"
      search-placeholder="Type article title, description, or username"
      @click:row="updateItemDialog"
      @click:new="dialog = true"
    >
      <template #info-tool-tip>
        <p><b>Articles</b>: The final output, such as reports, summaries, blog articles, or research papers</p>
        <p>[WIP] Information on how to add articles and link them to activities.</p>
      </template>
    </DataTable>
  </div>
</template>

<style></style>
