<script setup lang="ts">
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
import { useEnumsStore } from '@/stores/enums'
import { useAuthStore } from '@/stores/auth'
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
let itemsPerPage = 50

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
const editedItemAssets = ref<Asset[]>([])
const selectedItemId = ref<number | undefined>(undefined)
const assetsSearchTerm = ref('')
const selectedItemOwnerId = ref<number | undefined>(undefined)
const { user } = storeToRefs(useAuthStore())
const isItemOwner = computed(() => !!selectedItemOwnerId.value && (selectedItemOwnerId.value == user.value.id))
const dialogTitle = computed(() => (selectedItemId.value ? `Edit Activity: ${selectedItemId.value}` : 'New Activity'))
const dialogDeleteTitle = computed(() => `Are you sure you want to delete this item: ${selectedItemId.value}?`)
const { activityType } = storeToRefs(useEnumsStore())

// Useful for when user clicks away and closes the dialogs
watch(dialog, (value) => value || reset())

const reset = () => {
  console.log('reset')
  dialog.value = false
  dialogDelete.value = false
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem)
    editedItemAssets.value = []
    selectedItemId.value = undefined
    selectedItemOwnerId.value = undefined
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
              <v-select hide-details :items="activityType.map((c) => c.value)" v-model="editedItem.type" label="Type" />
            </v-col>
            <v-col cols="12">
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
      </v-form>
    </MyDialog>

    <!-- Delete Dialog -->
    <DeleteDialog
      v-model="dialogDelete"
      :loading="deleteLoading"
      :title="dialogDeleteTitle"
      @cancel="dialogDelete = false"
      @ok="preDeleteItem"
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
      <!-- Toolbar -->
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
            placeholder="Type activity note, source, asset name, or username"
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

      <!-- Custom rows -->
      <!-- rename to rowItem not to conflict with inner slots -->
      <template v-slot:item="{ item: rowItem }: { item: any }">
        <v-data-table-row :item="rowItem" :key="`item_${rowItem.value}`" @click="updateItemDialog(rowItem.raw)">
          <!-- Custom columns -->
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
        </v-data-table-row>
      </template>
    </v-data-table-server>
  </div>
</template>

<style></style>
