<script setup lang="ts">
import DeleteDialog from '@/components/DeleteDialog.vue'
import MyDialog from '@/components/MyDialog.vue'
import { useCRUDMutations } from '@/composables/useCRUDMutations'
import { useListQuery } from '@/composables/useListQuery'
import { AllActivities } from '@/graph/activities.query.gql'
import { StreamActivities } from '@/graph/activities.subscription.gql'
import {
  DeleteActivity as deleteMutation,
  InsertActivity as insertMutation,
  UpdateActivity as updateMutation,
} from '@/graph/activities.mutation.gql'
import { useEnumsStore } from '@/stores/enums'
import { mdiDelete, mdiPencil } from '@mdi/js'
import { storeToRefs } from 'pinia'
import { computed, nextTick, ref, watch } from 'vue'

// Todo (Nour): [TS] maybe generate types
interface Item {
  id?: number
  type: string
  notes: string
  source: string
}

// List
const searchTerm = ref('')
const queryVariables = computed(() => ({ search: `%${searchTerm.value}%` }))
const {
  items: activities,
  loading,
  error,
} = useListQuery({ query: AllActivities, queryVariables, subscription: StreamActivities })
let itemsPerPage = 50

const headers = [
  { title: 'ID', align: 'start', sortable: false, key: 'id' },
  { title: 'Type', align: 'start', key: 'type' },
  { title: 'Notes', align: 'start', key: 'notes' },
  { title: 'Source', align: 'start', key: 'source' },
  { title: 'By', align: 'end', key: 'created_by' },
  { title: 'Created', align: 'end', key: 'created_at' },
  { title: 'Updated', align: 'end', key: 'updated_at' },
  { title: 'Actions', key: 'actions', sortable: false },
]

// Dialogs
// Todo (Nour): [dx] refactor dialogs
const dialog = ref(false)
const dialogDelete = ref(false)
const defaultItem: Item = { type: '', notes: '', source: '' }
const editedItem = ref<Item>(defaultItem)
const selectedItemId = ref<number | undefined>(undefined)
const dialogTitle = computed(() => (selectedItemId.value ? `Edit Activity: ${selectedItemId.value}` : 'New Activity'))
const dialogDeleteTitle = computed(() => `Are you sure you want to delete this item: ${selectedItemId.value}?`)
const { activityType } = storeToRefs(useEnumsStore())

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
  listQuery: 'AllActivities',
})

// Dialog functions

const saveItem = () => {
  console.debug('saveItem', { editedItem: editedItem.value })
  // insert or update
  selectedItemId.value ? updateItem() : insertItem()
}
const updateItemDialog = ({ id, type, notes, source }: Item) => {
  console.debug('updating...', id)
  editedItem.value = { type, notes, source }
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
      @cancel="reset"
      @ok="saveItem"
    >
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-select
              hide-details
              :items="activityType.map((c) => c.value)"
              v-model="editedItem.type"
              label="Type"
            />
          </v-col>
          <v-col cols="12">
            <v-textarea hide-details v-model="editedItem.notes" label="Notes" />
          </v-col>
          <v-col cols="12">
            <v-text-field hide-details v-model="editedItem.source" label="Source" />
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
      :items="activities"
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
            label="Search Activities"
            placeholder="Search in notes and sources"
            class="mx-4"
            style="flex: 3"
          />
          <v-spacer></v-spacer>
          <v-btn color="primary" dark @click="dialog = true">New Activity</v-btn>
          <template #extension v-if="error">
            <v-alert color="error" variant="outlined" class="mx-4" density="comfortable"> {{ error }}</v-alert>
          </template>
        </v-toolbar>
      </template>
      <template v-slot:item.source="{ item }">
        <div class="v-data-table__td__source">
          <a :href="item.raw.source" target="_blank">{{ item.raw.source }}</a>
        </div>
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
