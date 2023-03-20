<script setup lang="ts">
import CRUDDialog from '@/components/CRUDDialog.vue'
import DataTable from '@/components/DataTable.vue'
import { useCRUDMutations } from '@/composables/useCRUDMutations'
import { useListQuery } from '@/composables/useListQuery'
import {
  DeleteAsset as deleteMutation,
  InsertAsset as insertMutation,
  UpdateAsset as updateMutation,
} from '@/graph/assets.mutation.gql'
import { AllAssets } from '@/graph/assets.query.gql'
import { StreamAssets } from '@/graph/assets.subscription.gql'
import { useAuthStore } from '@/stores/auth'
import { useEnumsStore } from '@/stores/enums'
import { requiredRule } from '@/utils'
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

// Dialogs
const dialog = ref(false)
const defaultItem: Item = { name: '', category: '', description: '', url: '' }
const editedItem = ref<Item>(Object.assign({}, defaultItem))
const selectedItemId = ref<number | undefined>(undefined)
const isNewItem = computed(() => !selectedItemId.value)
const selectedItemOwnerId = ref<number | undefined>(undefined)
const { user } = storeToRefs(useAuthStore())
const isItemOwner = computed(() => selectedItemOwnerId.value == user.value.id)
const dialogTitle = computed(() => (selectedItemId.value ? `Edit Asset: ${selectedItemId.value}` : 'New Asset'))
const dialogDeleteTitle = computed(() => `Are you sure you want to delete asset: ${selectedItemId.value}?`)
const { assetCategory } = storeToRefs(useEnumsStore())

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
  listQuery: 'AllAssets',
})

// Dialog functions

const saveItem = () => {
  console.debug('saveItem', { editedItem: editedItem.value })
  // insert or update
  isNewItem.value ? insertItem() : updateItem()
}
const updateItemDialog = ({ id, name, category, description, url, created_by_object }: Item) => {
  console.debug('updating...', id)
  editedItem.value = { name, category, description, url }
  selectedItemId.value = id
  selectedItemOwnerId.value = created_by_object?.id
  dialog.value = true
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
          <v-col cols="6">
            <v-text-field v-model="editedItem.name" label="Name" :rules="[requiredRule]" />
          </v-col>
          <v-col cols="6">
            <v-select
              :items="assetCategory.map((c) => c.value)"
              v-model="editedItem.category"
              label="Category"
              :rules="[requiredRule]"
            />
          </v-col>
          <v-col cols="12">
            <v-textarea hide-details v-model="editedItem.description" label="Description" />
          </v-col>
          <v-col cols="12">
            <v-text-field hide-details v-model="editedItem.url" label="URL" />
          </v-col>
        </v-row>
      </v-container>
    </CRUDDialog>

    <!-- DataTable -->
    <DataTable
      :headers="headers"
      :items="assets"
      :loading="loading"
      :error="error"
      v-model:search-term="searchTerm"
      new-label="New Asset"
      search-label="Search Assets"
      search-placeholder="Type asset name, description, URL, or username"
      @click:row="updateItemDialog"
      @click:new="dialog = true"
    >
    </DataTable>
  </div>
</template>

<style></style>