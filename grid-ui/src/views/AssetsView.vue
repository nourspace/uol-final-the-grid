<script setup lang="ts">
import MyDialog from '@/components/MyDialog.vue'
import { useEnumsStore } from '@/stores/enums'
import { useQuery, useMutation } from '@vue/apollo-composable'
import { AllAssets } from '@/graph/assets.query.gql'
import { InsertAsset, UpdateAsset, DeleteAsset } from '@/graph/assets.mutation.gql'
import { storeToRefs } from 'pinia'
import { computed, nextTick, ref } from 'vue'
import { mdiPencil, mdiDelete } from '@mdi/js'

const searchTerm = ref('')
const { result, loading, error } = useQuery(
  AllAssets,
  () => ({ search: `%${searchTerm.value}%` }),
  () => ({ debounce: 500, enabled: searchTerm.value == '' || searchTerm.value.length >= 3 }),
)
// extract activities from result, otherwise return default
const assets = computed(() => result.value?.assets ?? [])

const {
  mutate: insertAsset,
  loading: insertAssetLoading,
  onDone: insertAssetDone,
  onError: insertAssetError,
} = useMutation(InsertAsset)
const {
  mutate: updateAsset,
  loading: updateAssetLoading,
  onDone: updateAssetDone,
  onError: updateAssetError,
} = useMutation(UpdateAsset)
const {
  mutate: deleteAsset,
  loading: deleteAssetLoading,
  onDone: deleteAssetDone,
  onError: deleteAssetError,
} = useMutation(DeleteAsset)
// Todo (Nour): [ux] pass loading to dialog

insertAssetDone((result) => {
  console.log(result.data)
  dialog.value = false
})
insertAssetError((error) => {
  console.log(error)
})
updateAssetDone((result) => {
  console.log(result.data)
  dialog.value = false
})
updateAssetError((error) => {
  console.log(error)
})
deleteAssetDone((result) => {
  console.log(result.data)
  dialog.value = false
})
deleteAssetError((error) => {
  console.log(error)
})

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
const itemsPerPage = 50

/**
 * Todo
 * - update cache after insert / delete
 * - nested relations (created_by.name)
 * - sort
 * - paginate
 * - [x] update
 * - [x] delete
 * - [x] create new
 * - [x] search
 * - [x] format dates
 * - [x] col width
 */
const dialog = ref(false)
const dialogDelete = ref(false)
const selectedAssetId = ref(0)
const editedItem = ref({})
const dialogTitle = computed(() => (selectedAssetId.value ? `Edit Asset: ${selectedAssetId.value}` : 'New Asset'))

const { assetCategory } = storeToRefs(useEnumsStore())

const toggle = () => {
  dialog.value = !dialog.value
  console.log('toggle')
}
const save = () => {
  console.log('save')
  console.log({ editedItem: editedItem.value })
  // insert or update
  if (selectedAssetId.value) {
    updateAsset({ id: selectedAssetId.value, asset: editedItem.value })
  } else {
    insertAsset({ asset: editedItem.value })
  }
}
const cancel = () => {
  console.log('cancel')
  dialog.value = false
}

// Todo (Nour): [types] improve or use generated TS
const updateItem = ({ id, name, category, description, url }) => {
  console.log('editing...', id)
  editedItem.value = { name, category, description, url }
  selectedAssetId.value = id
  dialog.value = true
}
const deleteItem = (asset: object) => {
  console.log('deleting...', { asset })
  editedItem.value = Object.assign({}, asset)
  selectedAssetId.value = asset.id
  dialogDelete.value = true
}
const deleteItemConfirm = () => {
  deleteAsset({ id: selectedAssetId.value })
  closeDelete()
}
const closeDelete = () => {
  dialogDelete.value = false
  nextTick(() => {
    editedItem.value = Object.assign({})
    selectedAssetId.value = 0
  })
}
</script>

<template>
  <div>
    <!--Insert / Update Dialog -->
    <MyDialog :title="dialogTitle" v-model="dialog" @save="save" @cancel="cancel" width="600">
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
              label="Category" />
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

    <!--Delete Dialog -->
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="assets"
      :loading="loading"
      density="comfortable"
      fixed-header
      height="70vh"
      class="elevation-1">
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
            style="flex: 3" />
          <v-spacer></v-spacer>
          <v-btn color="primary" dark @click="toggle">New Asset</v-btn>
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
      <template v-slot:item.created_at="{ item }">
        {{ new Date(item.raw.created_at).toLocaleDateString() }}
      </template>
      <template v-slot:item.updated_at="{ item }">
        {{ new Date(item.raw.updated_at).toLocaleDateString() }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon size="small" class="me-2" @click="updateItem(item.raw)"> {{ mdiPencil }}</v-icon>
        <v-icon size="small" @click="deleteItem(item.raw)"> {{ mdiDelete }}</v-icon>
      </template>
    </v-data-table-server>
  </div>
</template>

<style></style>
