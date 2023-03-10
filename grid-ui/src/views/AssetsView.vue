<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { AllAssets } from '@/graph/assets.query.gql'
import { computed, ref } from 'vue'

const searchTerm = ref('')
const { result, loading, error } = useQuery(
  AllAssets,
  () => ({ search: `%${searchTerm.value}%` }),
  () => ({ debounce: 500, enabled: searchTerm.value == '' || searchTerm.value.length >= 3 }),
)
// extract activities from result, otherwise return default
const assets = computed(() => result.value?.assets ?? [])

const headers = [
  { title: 'ID', align: 'start', key: 'id' },
  { title: 'Name', align: 'start', key: 'name' },
  { title: 'Desc', align: 'start', key: 'description' },
  { title: 'URL', align: 'start', key: 'url' },
  { title: 'By', align: 'end', key: 'created_by' },
  { title: 'Created', align: 'end', key: 'created_at' },
  { title: 'Updated', align: 'end', key: 'updated_at' },
]
const itemsPerPage = 50

/**
 * Todo
 * - create new
 * - update
 * - delete
 * - sort
 * - paginate
 * - nested relations (created_by.name)
 * - [x] search
 * - [x] format dates
 * - [x] col width
 */
</script>

<template>
  <div>
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
          <v-btn color="primary" dark class="">New Asset</v-btn>
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
    </v-data-table-server>
  </div>
</template>

<style></style>
