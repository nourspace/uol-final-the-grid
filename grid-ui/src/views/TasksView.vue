<script setup lang="ts">
import DeleteDialog from '@/components/DeleteDialog.vue'
import MyDialog from '@/components/MyDialog.vue'
import { useCRUDMutations } from '@/composables/useCRUDMutations'
import { useListQuery } from '@/composables/useListQuery'
import { AllTasks } from '@/graph/tasks.query.gql'
import { StreamTasks } from '@/graph/tasks.subscription.gql'
import {
  DeleteTask as deleteMutation,
  InsertTask as insertMutation,
  UpdateTask as updateMutation,
} from '@/graph/tasks.mutation.gql'
import { useEnumsStore } from '@/stores/enums'
import { mdiDelete, mdiPencil } from '@mdi/js'
import { storeToRefs } from 'pinia'
import { computed, nextTick, ref, watch } from 'vue'

// Todo (Nour): [TS] maybe generate types
interface Item {
  id?: number
  status?: string
  title: string
  desc: string
}

// List
const searchTerm = ref('')
const queryVariables = computed(() => ({ search: `%${searchTerm.value}%` }))
const { items: tasks, loading, error } = useListQuery({ query: AllTasks, queryVariables, subscription: StreamTasks })
let itemsPerPage = 50

const headers = [
  { title: 'ID', align: 'start', key: 'id' },
  { title: 'Status', align: 'start', key: 'status' },
  { title: 'Title', align: 'start', key: 'title' },
  { title: 'Desc', align: 'start', key: 'desc' },
  { title: 'By', align: 'end', key: 'created_by' },
  { title: 'Created', align: 'end', key: 'created_at' },
  { title: 'Updated', align: 'end', key: 'updated_at' },
  { title: 'Actions', key: 'actions', sortable: false },
]

// Dialogs
// Todo (Nour): [dx] refactor dialogs
const dialog = ref(false)
const dialogDelete = ref(false)
const defaultItem: Item = { title: '', desc: '' }
const editedItem = ref<Item>(defaultItem)
const selectedItemId = ref<number | undefined>(undefined)
const dialogTitle = computed(() => (selectedItemId.value ? `Edit Task: ${selectedItemId.value}` : 'New Task'))
const dialogDeleteTitle = computed(() => `Are you sure you want to delete this item: ${selectedItemId.value}?`)
const { taskStatus } = storeToRefs(useEnumsStore())

// Useful for when user clicks away and closes the dialogs
watch(dialog, (value) => value || reset())
watch(dialogDelete, (value) => value || reset())

const reset = () => {
  console.log('reset')
  dialog.value = false
  dialogDelete.value = false
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem)
    selectedItemId.value = undefined
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

const saveItem = () => {
  console.debug('saveItem', { editedItem: editedItem.value })
  // insert or update
  selectedItemId.value ? updateItem() : insertItem()
}
const updateItemDialog = ({ id, status, title, desc }: Item) => {
  console.debug('updating...', id)
  editedItem.value = { status, title, desc }
  selectedItemId.value = id
  dialog.value = true
}
const deleteItemDialog = ({ id }: Item) => {
  console.debug('deleting...', id)
  selectedItemId.value = id
  dialogDelete.value = true
}
</script>

<template>
  <div>
    <!--Insert / Update Dialog -->
    <MyDialog
      v-model="dialog"
      :loading="insertLoading || updateLoading"
      :title="dialogTitle"
      :comments="!!selectedItemId"
      @cancel="reset"
      @ok="saveItem"
    >
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-select hide-details :items="taskStatus.map((c) => c.value)" v-model="editedItem.status" label="Type" />
          </v-col>
          <v-col cols="12">
            <v-text-field hide-details v-model="editedItem.title" label="Title" />
          </v-col>
          <v-col cols="12">
            <v-textarea hide-details v-model="editedItem.desc" label="Desc" />
          </v-col>
        </v-row>
      </v-container>
    </MyDialog>

    <!-- Delete Dialog -->
    <DeleteDialog
      v-model="dialogDelete"
      :loading="deleteLoading"
      :title="dialogDeleteTitle"
      @cancel="reset"
      @ok="deleteItem"
    >
    </DeleteDialog>

    <!-- DataTable -->
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="tasks"
      :loading="loading"
      density="comfortable"
      fixed-header
      height="70vh"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar height="80" extension-height="80">
          <v-text-field
            clearable
            @click:clear="searchTerm = ''"
            hide-details
            variant="outlined"
            density="comfortable"
            v-model="searchTerm"
            label="Search Tasks"
            placeholder="Type task title or desc"
            class="mx-4"
            style="flex: 3"
          />
          <v-spacer></v-spacer>
          <v-btn color="primary" dark @click="dialog = true">New Task</v-btn>
          <template #extension v-if="error">
            <v-alert color="error" variant="outlined" class="mx-4" density="comfortable"> {{ error }}</v-alert>
          </template>
        </v-toolbar>
      </template>
      <template v-slot:item.created_by="{ item }">
        {{ item.raw.created_by_object.username }}
      </template>
      <template v-slot:item.created_at="{ item }">
        {{ new Date(item.raw.created_at).toLocaleDateString() }}
      </template>
      <template v-slot:item.updated_at="{ item }">
        {{ new Date(item.raw.updated_at).toLocaleDateString() }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon size="small" class="me-2" @click="updateItemDialog(item.raw)"> {{ mdiPencil }}</v-icon>
        <v-icon size="small" @click="deleteItemDialog(item.raw)"> {{ mdiDelete }}</v-icon>
      </template>
    </v-data-table-server>
  </div>
</template>

<style></style>
