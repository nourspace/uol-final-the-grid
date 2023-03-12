<script setup lang="ts">
import DeleteDialog from '@/components/DeleteDialog.vue'
import MyDialog from '@/components/MyDialog.vue'
import { useListQuery } from '@/composables/useListQuery'
import { DeleteAsset, InsertAsset, UpdateAsset } from '@/graph/assets.mutation.gql'
import { AllAssets } from '@/graph/assets.query.gql'
import { StreamAssets } from '@/graph/assets.subscription.gql'
import { useEnumsStore } from '@/stores/enums'
import { mdiDelete, mdiPencil } from '@mdi/js'
import { useMutation } from '@vue/apollo-composable'
import { storeToRefs } from 'pinia'
import { computed, nextTick, ref, watch } from 'vue'

// Todo (Nour): [TS] maybe generate types
interface Asset {
  id?: number
  name: string
  category: string
  description: string
  url: string
}

// List
const searchTerm = ref('')
const queryVariables = computed(() => ({ search: `%${searchTerm.value}%` }))
const {
  items: assets,
  loading,
  error,
} = useListQuery({
  query: AllAssets,
  queryName: 'assets',
  queryVariables,
  subscription: StreamAssets,
  subscriptionName: 'assets_stream',
})
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
  { title: 'Actions', key: 'actions', sortable: false },
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

const dialog = ref(false)
const dialogDelete = ref(false)
const defaultAsset: Asset = { name: '', category: '', description: '', url: '' }
const editedItem = ref<Asset>(defaultAsset)
const selectedItemId = ref<number | undefined>(undefined)
const dialogTitle = computed(() => (selectedItemId.value ? `Edit Asset: ${selectedItemId.value}` : 'New Asset'))
const dialogDeleteTitle = computed(() => `Are you sure you want to delete this item: ${selectedItemId.value}?`)
const { assetCategory } = storeToRefs(useEnumsStore())

// Useful for when user clicks away and closes the dialogs
watch(dialog, (value) => value || reset())
watch(dialogDelete, (value) => value || reset())

const reset = () => {
  console.log('reset')
  dialog.value = false
  dialogDelete.value = false
  nextTick(() => {
    editedItem.value = Object.assign(defaultAsset)
    selectedItemId.value = undefined
  })
}

// Mutations

// Insert
const {
  mutate: insertItem,
  loading: insertLoading,
  onDone: insertDone,
  onError: insertError,
} = useMutation(InsertAsset, () => ({ variables: { object: editedItem.value } }))
// Update
const {
  mutate: updateItem,
  loading: updateLoading,
  onDone: updateDone,
  onError: updateError,
} = useMutation(UpdateAsset, () => ({ variables: { id: selectedItemId.value, object: editedItem.value } }))
// Delete
const {
  mutate: deleteItem,
  loading: deleteLoading,
  onDone: deleteDone,
  onError: deleteError,
} = useMutation(DeleteAsset, () => ({
  variables: { id: selectedItemId.value },
  updateQueries: {
    AllAssets: (previousResult, { mutationResult }) => {
      const assets: Asset[] = previousResult.assets
      const deletedAsset: Asset = mutationResult.data.delete_assets_by_pk
      if (!deletedAsset || assets.length == 0) {
        return previousResult
      }
      console.debug('updating AllAssets after deletion...', assets.length)
      return {
        assets: assets.filter((asset) => asset.id != deletedAsset.id),
      }
    },
  },
}))

insertDone((result) => {
  console.info('insertDone', result.data)
  reset()
})
updateDone((result) => {
  console.info('updateDone', result.data)
  reset()
})
deleteDone((result) => {
  console.info('deleteDone', result.data)
  // Todo (Nour): [ux] when  result.data.delete_assets_by_pk is null it means user was not able to delete
  reset()
})
insertError((error) => console.log(error))
updateError((error) => console.log(error))
deleteError((error) => console.log(error))

// Dialog functions

const saveItem = () => {
  console.debug('saveItem', { editedItem: editedItem.value })
  // insert or update
  selectedItemId.value ? updateItem() : insertItem()
}
const updateItemDialog = ({ id, name, category, description, url }: Asset) => {
  console.debug('updating...', id)
  editedItem.value = { name, category, description, url }
  selectedItemId.value = id
  dialog.value = true
}
const deleteItemDialog = ({ id }: Asset) => {
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
      :items="assets"
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
            label="Search Assets"
            placeholder="Type asset name, description, or URL"
            class="mx-4"
            style="flex: 3"
          />
          <v-spacer></v-spacer>
          <v-btn color="primary" dark @click="dialog = true">New Asset</v-btn>
          <template #extension v-if="error">
            <v-alert color="error" variant="outlined" class="mx-4" density="comfortable"> {{ error }}</v-alert>
          </template>
        </v-toolbar>
      </template>
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
      <template v-slot:item.actions="{ item }">
        <v-icon size="small" class="me-2" @click="updateItemDialog(item.raw)"> {{ mdiPencil }}</v-icon>
        <v-icon size="small" @click="deleteItemDialog(item.raw)"> {{ mdiDelete }}</v-icon>
      </template>
    </v-data-table-server>
  </div>
</template>

<style></style>
