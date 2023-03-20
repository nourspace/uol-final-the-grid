<script setup lang="ts">
import DataTable from '@/components/DataTable.vue'
import DeleteDialog from '@/components/DeleteDialog.vue'
import MyDialog from '@/components/MyDialog.vue'
import { useAssetsMini } from '@/composables/assets'
import { useCRUDMutations } from '@/composables/useCRUDMutations'
import { useListQuery } from '@/composables/useListQuery'
import {
  DeleteActivity as deleteMutation,
  InsertActivity as insertMutation,
  UpdateActivity as updateMutation,
} from '@/graph/activities.mutation.gql'
import { AllActivities } from '@/graph/activities.query.gql'
import { StreamActivities } from '@/graph/activities.subscription.gql'
import type { Activity, Asset } from '@/services/activties'
import { setActivityAssets } from '@/services/activties'
import { useAuthStore } from '@/stores/auth'
import { useEnumsStore } from '@/stores/enums'
import { chipColor } from '@/utils'
import { storeToRefs } from 'pinia'
import { computed, nextTick, ref, watch } from 'vue'

// List
const searchTerm = ref('')
const queryVariables = computed(() => ({ search: `%${searchTerm.value}%` }))
const {
  items: activities,
  loading,
  error,
} = useListQuery({ query: AllActivities, queryVariables, subscription: StreamActivities })

const headers = [
  { title: 'ID', align: 'start', sortable: false, key: 'id' },
  { title: 'Type', align: 'start', key: 'type' },
  { title: 'Assets', align: 'start', key: 'assets' },
  { title: 'Notes', align: 'start', key: 'notes' },
  { title: 'Source', align: 'start', key: 'source' },
  { title: 'By', align: 'end', key: 'created_by' },
  { title: 'Created', align: 'end', key: 'created_at' },
  { title: 'Updated', align: 'end', key: 'updated_at' },
]

// Dialogs
// Todo (Nour): [dx] refactor dialogs
const dialog = ref(false)
const dialogDelete = ref(false)
const defaultItem: Activity = { type: undefined, notes: '', source: '' }
const editedItem = ref<Activity>(Object.assign({}, defaultItem))
const selectedItemId = ref<number | undefined>(undefined)
const isNewItem = computed(() => !selectedItemId.value)
const selectedItemOwnerId = ref<number | undefined>(undefined)
const { user } = storeToRefs(useAuthStore())
const isItemOwner = computed(() => !!selectedItemOwnerId.value && selectedItemOwnerId.value == user.value.id)
const dialogTitle = computed(() => (selectedItemId.value ? `Edit Activity: ${selectedItemId.value}` : 'New Activity'))
const dialogDeleteTitle = computed(() => `Are you sure you want to delete this item: ${selectedItemId.value}?`)
const { activityType } = storeToRefs(useEnumsStore())

const editedItemAssets = ref<Asset[]>([])
const assetsSearchTerm = ref('')

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
    editedItemAssets.value = []
  })
}

// Mutations
const { insertItem, insertLoading, insertDone, updateItem, updateLoading, updateDone, deleteItem, deleteLoading } =
  useCRUDMutations({
    insertMutation,
    updateMutation,
    deleteMutation,
    editedItem,
    selectedItemId,
    reset,
    listQuery: 'AllActivities',
  })
// Todo (Nour): [performance] maybe we load assets once so we only search locally?
const { assets, loading: assetsSearchLoading } = useAssetsMini(assetsSearchTerm)

insertDone((result) => {
  console.debug('post insert', result)
  if (result.data.item) {
    setActivityAssets(result.data.item.id, editedItemAssets.value)
  }
})
updateDone((result) => {
  console.debug('post update', result)
  if (result.data.item) {
    setActivityAssets(result.data.item.id, editedItemAssets.value)
  }
})

function preDeleteItem() {
  console.debug('pre delete', selectedItemId.value)
  // Todo (Nour): [dx] how to make sure the item can be actually deleted?
  if (selectedItemId.value) {
    setActivityAssets(selectedItemId.value, [])
    deleteItem()
  }
}

// Dialog functions

const saveItem = () => {
  console.debug('saveItem', { editedItem: editedItem.value })
  // insert or update
  selectedItemId.value ? updateItem() : insertItem()
}
const updateItemDialog = ({ id, type, notes, source, activity_assets, created_by_object }: Activity) => {
  console.debug('updating...', id)
  editedItem.value = { type, notes, source }
  editedItemAssets.value = activity_assets ? activity_assets.map(({ asset }) => asset) : []
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
      :enable-form="isNewItem || isItemOwner"
      :enable-save="isNewItem || isItemOwner"
      :enable-delete="isItemOwner"
      :comments="!isNewItem"
      @save="saveItem"
      @delete="deleteItemDialog"
      @cancel="reset"
    >
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-select hide-details :items="activityType.map((c) => c.value)" v-model="editedItem.type" label="Type" />
          </v-col>
          <v-col cols="6">
            <v-autocomplete
              label="Assets"
              v-model="editedItemAssets"
              v-model:search.trim="assetsSearchTerm"
              :loading="assetsSearchLoading"
              :items="assets"
              return-object
              item-value="id"
              item-title="name"
              multiple
              chips
              closable-chips
              clearable
              hide-details
            >
              <!-- Todo (Nour): [performance] re-renders a lot! -->
              <template v-slot:chip="{ props, item }">
                <v-chip v-bind="props" :color="chipColor(item.title)" variant="tonal" />
              </template>
            </v-autocomplete>
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
      @cancel="dialogDelete = false"
      @delete="preDeleteItem"
    >
    </DeleteDialog>

    <!-- DataTable -->
    <DataTable
      :headers="headers"
      :items="activities"
      :loading="loading"
      :error="error"
      v-model:search-term="searchTerm"
      new-label="New Activity"
      search-label="Search Activities"
      search-placeholder="Type activity note, source, asset name, or username"
      @click:row="updateItemDialog"
      @click:new="dialog = true"
    >
      <template v-slot:item.assets="{ item }">
        <v-chip
          v-for="{ asset } in item.raw.activity_assets"
          :key="asset.id"
          size="small"
          class="mr-1 my-1"
          variant="outlined"
          :color="chipColor(asset.name)"
          >{{ asset.name }}
        </v-chip>
      </template>
    </DataTable>
  </div>
</template>

<style></style>