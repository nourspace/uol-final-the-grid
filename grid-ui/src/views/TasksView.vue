<script setup lang="ts">
import CRUDDialog from '@/components/CRUDDialog.vue'
import DataTable from '@/components/DataTable.vue'
import ItemList from '@/components/ItemList.vue'
import { useCRUDMutations } from '@/composables/useCRUDMutations'
import { useListQuery } from '@/composables/useListQuery'
import {
  DeleteTask as deleteMutation,
  InsertTask as insertMutation,
  UpdateTask as updateMutation,
} from '@/graph/tasks.mutation.gql'
import { AllTasks } from '@/graph/tasks.query.gql'
import { StreamTasks } from '@/graph/tasks.subscription.gql'
import { insertArticle } from '@/services/articles'
import { useAuthStore } from '@/stores/auth'
import { useEnumsStore } from '@/stores/enums'
import { storeToRefs } from 'pinia'
import { computed, nextTick, ref, watch } from 'vue'

// Todo (Nour): [TS] maybe generate types
interface Item {
  id?: number
  status?: string
  title: string
  desc: string
  article_id?: number
  created_by_object?: { id: number }
}

// List
const searchTerm = ref('')
const queryVariables = computed(() => ({ search: `%${searchTerm.value}%` }))
const { items: tasks, loading, error } = useListQuery({ query: AllTasks, queryVariables, subscription: StreamTasks })

const headers = [
  { title: 'ID', align: 'start', key: 'id' },
  { title: 'Status', align: 'start', key: 'status' },
  { title: 'Title', align: 'start', key: 'title' },
  { title: 'Desc', align: 'start', key: 'desc' },
  { title: 'By', align: 'end', key: 'created_by' },
  { title: 'Article', align: 'end', key: 'article' },
  { title: 'Created', align: 'end', key: 'created_at' },
  { title: 'Updated', align: 'end', key: 'updated_at' },
]

// Dialogs
const dialog = ref(false)
const defaultItem: Item = { title: '', status: undefined, desc: '', article_id: undefined }
const editedItem = ref<Item>(Object.assign({}, defaultItem))
const createNewArticle = ref(false)
const newArticleType = ref('blog_post')
const selectedItemId = ref<number | undefined>(undefined)
const isNewItem = computed(() => !selectedItemId.value)
const selectedItemOwnerId = ref<number | undefined>(undefined)
const { user } = storeToRefs(useAuthStore())
const isItemOwner = computed(() => selectedItemOwnerId.value == user.value.id)
const dialogTitle = computed(() => (selectedItemId.value ? `Edit Task: ${selectedItemId.value}` : 'New Task'))
const dialogDeleteTitle = computed(() => `Are you sure you want to delete task: ${selectedItemId.value}?`)
const { taskStatus, articleType } = storeToRefs(useEnumsStore())

// Useful for when user clicks away and closes the dialogs
watch(dialog, (value) => value || reset())

const reset = () => {
  console.log('reset')
  dialog.value = false
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem)
    selectedItemId.value = undefined
    selectedItemOwnerId.value = undefined
    createNewArticle.value = false
    newArticleType.value = 'blog_post'
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
  listQuery: 'AllTasks',
})

// Dialog functions

const preInsertItem = async () => {
  loading.value = true
  if (createNewArticle.value) {
    try {
      const article = await insertArticle({
        status: 'in_progress',
        type: 'blog_post',
        title: `Task: ${editedItem.value.title}`,
      })
      editedItem.value.article_id = article.id
    } catch (e) {
      console.log(e)
    }
  }
  insertItem()
}
const saveItem = () => {
  console.debug('saveItem', { editedItem: editedItem.value })
  // insert or update
  isNewItem.value ? preInsertItem() : updateItem()
}
const updateItemDialog = ({ id, status, title, desc, article_id, created_by_object }: Item) => {
  console.debug('updating...', id)
  editedItem.value = { status, title, desc, article_id }
  selectedItemId.value = id
  selectedItemOwnerId.value = created_by_object?.id
  dialog.value = true
}

const activities = ref([
  'Listened to a podcast on Gold and its impact on Analyze Political Impact on Commodities.',
  'Interviewed an expert on Research Crypto Mining in Top Countries and its relation to AI.',
  "Researched Study AI's Impact on Environment using Gold.",
  'Read the news about Gold and its impact on Research Crypto Mining in Top Countries.',
  'Watched a video on Ethereum and its impact on Analyze Ethereum PoS Switch.',
  'Researched Create Healthcare ETF using AI.',
])
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
          <v-col cols="8">
            <v-text-field hide-details v-model="editedItem.title" label="Title" />
          </v-col>
          <v-col cols="4">
            <v-select hide-details :items="taskStatus.map((c) => c.value)" v-model="editedItem.status" label="Status" />
          </v-col>
          <!-- Add articles section -->
          <v-col cols="8" v-if="!isNewItem">
            <v-text-field hide-details v-model="editedItem.article_id" label="Article ID" />
          </v-col>
          <v-col cols="8" v-if="isNewItem">
            <v-checkbox hide-details v-model="createNewArticle" label="Create new Article?" />
          </v-col>
          <v-col cols="4" v-if="isNewItem && createNewArticle">
            <v-select
              hide-details
              :items="articleType.map((c) => c.value)"
              v-model="newArticleType"
              label="Article type"
            />
          </v-col>
          <v-col cols="12">
            <v-textarea hide-details v-model="editedItem.desc" label="Desc" />
          </v-col>
        </v-row>
      </v-container>

      <!-- Activities list -->
      <template #footer v-if="!isNewItem">
        <ItemList title="Activities [mock data]" :items="activities" />
      </template>
    </CRUDDialog>

    <!-- DataTable -->
    <DataTable
      :headers="headers"
      :items="tasks"
      :loading="loading"
      :error="error"
      v-model:search-term="searchTerm"
      new-label="New Task"
      search-label="Search Tasks"
      search-placeholder="Type task title, description, or username"
      @click:row="updateItemDialog"
      @click:new="dialog = true"
    >
      <template #info-tool-tip>
        <p><b>Tasks</b>: Progress tracking for article and research paper development</p>
        <p>[WIP] Information on how to add tasks and link them to activities.</p>
      </template>
      <template #item.article="{ item }">
        {{ item.raw.article && item.raw.article.title }}
      </template>
    </DataTable>
  </div>
</template>

<style></style>
