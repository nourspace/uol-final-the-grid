<script setup lang="ts">
import DeleteDialog from '@/components/DeleteDialog.vue'
import MyDialog from '@/components/MyDialog.vue'
import { useCRUDMutations } from '@/composables/useCRUDMutations'
import { useListQuery } from '@/composables/useListQuery'
import { AllAssets } from '@/graph/assets.query.gql'
import { StreamAssets } from '@/graph/assets.subscription.gql'
import {
  DeleteAsset as deleteMutation,
  InsertAsset as insertMutation,
  UpdateAsset as updateMutation,
} from '@/graph/assets.mutation.gql'
import { useEnumsStore } from '@/stores/enums'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { computed, nextTick, ref, watch } from 'vue'

// Todo (Nour): [TS] maybe generate types
interface Item {
  id?: number
  name: string
  category: string
  description: string
  url: string
  created_by_object?: { id: number }
}

// List
const searchTerm = ref('')
const queryVariables = computed(() => ({ search: `%${searchTerm.value}%` }))
const { items: assets, loading, error } = useListQuery({ query: AllAssets, queryVariables, subscription: StreamAssets })
let itemsPerPage = 50

const headers = [
  { title: 'ID', align: 'start', key: 'id' },
  { title: 'Name', align: 'start', key: 'name' },
  { title: 'Category', align: 'start', key: 'category' },
  { title: 'Desc', align: 'start', key: 'description' },
  { title: 'URL', align: 'start', key: 'url' },
  { title: 'By', align: 'end', key: 'created_by' },
  // { title: 'Created', align: 'end', key: 'created_at' },
  { title: 'Updated', align: 'end', key: 'updated_at' },
]

/**
 * Todo
 * - sort
 * - paginate
 * - [x] nested relations (created_by.name)
 * - [x] update cache after insert / delete
 * - [x] update
 * - [x] delete
 * - [x] create new
 * - [x] search
 * - [x] format dates
 * - [x] col width
 */

// Dialogs
// Todo (Nour): [dx] refactor dialogs
const dialog = ref(false)
const dialogDelete = ref(false)
const defaultItem: Item = { name: '', category: '', description: '', url: '' }
const editedItem = ref<Item>(Object.assign({}, defaultItem))
const selectedItemId = ref<number | undefined>(undefined)
const selectedItemOwnerId = ref<number | undefined>(undefined)
const { user } = storeToRefs(useAuthStore())
const isItemOwner = computed(() => !!selectedItemOwnerId.value && (selectedItemOwnerId.value == user.value.id))
const dialogTitle = computed(() => (selectedItemId.value ? `Edit Asset: ${selectedItemId.value}` : 'New Asset'))
const dialogDeleteTitle = computed(() => `Are you sure you want to delete this item: ${selectedItemId.value}?`)
const { assetCategory } = storeToRefs(useEnumsStore())

// Useful for when user clicks away and closes the dialogs
watch(dialog, (value) => value || reset())

const reset = () => {
  console.log('reset')
  dialog.value = false
  dialogDelete.value = false
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
  listQuery: 'AllAssets',
})

// Dialog functions

const saveItem = () => {
  console.debug('saveItem', { editedItem: editedItem.value })
  // insert or update
  selectedItemId.value ? updateItem() : insertItem()
}
const updateItemDialog = ({ id, name, category, description, url, created_by_object }: Item) => {
  console.debug('updating...', id)
  editedItem.value = { name, category, description, url }
  selectedItemId.value = id
  selectedItemOwnerId.value = created_by_object?.id
  dialog.value = true
}
const deleteItemDialog = () => {
  console.debug('deleting...', selectedItemId)
  dialogDelete.value = true
}
</script>

<template>
  <div>
    <!--Insert / Update Dialog -->
    <MyDialog
      v-model="dialog"
      :loading="insertLoading || updateLoading || deleteLoading"
      :title="dialogTitle"
      :comments="!!selectedItemId"
      :enable-actions="!selectedItemId || isItemOwner"
      @cancel="reset"
      @ok="saveItem"
      @delete="deleteItemDialog"
    >
      <v-form :disabled="!!selectedItemId && !isItemOwner">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field hide-details v-model="editedItem.name" label="Name" />
            </v-col>
            <v-col cols="12">
              <v-select
                hide-details
                :items="assetCategory.map((c) => c.value)"
                v-model="editedItem.category"
                label="Category"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field hide-details v-model="editedItem.description" label="Description" />
            </v-col>
            <v-col cols="12">
              <v-text-field hide-details v-model="editedItem.url" label="URL" />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </MyDialog>

    <!-- Delete Dialog -->
    <DeleteDialog
      v-model="dialogDelete"
      :loading="deleteLoading"
      :title="dialogDeleteTitle"
      @cancel="dialogDelete = false"
      @ok="deleteItem"
    >
    </DeleteDialog>

    <!-- DataTable -->
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="assets"
      :loading="loading"
      density="comfortable"
      fixed-header
      height="70vh"
      class="elevation-1"
    >
      <!-- Toolbar -->
      <template v-slot:top>
        <v-toolbar height="80" extension-height="80">
          <!-- Search field -->
          <v-text-field
            clearable
            @click:clear="searchTerm = ''"
            hide-details
            variant="outlined"
            density="comfortable"
            v-model="searchTerm"
            label="Search Assets"
            placeholder="Type asset name, description, URL, or username"
            class="mx-4"
            style="flex: 3"
          />
          <v-spacer></v-spacer>
          <!-- Create new -->
          <v-btn color="primary" dark @click="dialog = true">New Asset</v-btn>
          <template #extension v-if="error">
            <v-alert color="error" variant="outlined" class="mx-4" density="comfortable"> {{ error }}</v-alert>
          </template>
        </v-toolbar>
      </template>

      <!-- Custom rows -->
      <!-- rename to rowItem not to conflict with inner slots -->
      <template v-slot:item="{ item: rowItem }: { item: any }">
        <v-data-table-row :item="rowItem" :key="`item_${rowItem.value}`" @click="updateItemDialog(rowItem.raw)">
          <!-- Custom columns -->
          <!-- must use props here as slots are not arable to TS -->
          <template v-slot:item.url="{ item }">
            <div class="v-data-table__td__url">
              <a :href="item.raw.url" target="_blank">{{ item.raw.url }}</a>
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
        </v-data-table-row>
      </template>
    </v-data-table-server>
  </div>
</template>

<style></style>
