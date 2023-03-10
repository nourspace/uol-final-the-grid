<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed } from 'vue'

const query = gql`
  query allAssets {
    assets {
      id
      name
      description
      url
      created_by
      created_at
      updated_at
    }
  }
`
const { result, loading, error } = useQuery(
  query,
  // () => ({ search: `%${searchTerm.value}%` }),
  // () => ({ debounce: 500, enabled: searchTerm.value.length >= 3 }),
)
console.log({ result })
// extract activities from result, otherwise return default
const assets = computed(() => result.value?.assets ?? [])

/**
 * Todo
 * - search
 * - create new
 * - update
 * - delete
 * - sort
 * - paginate
 * - nested relations (created_by.name)
 * - [x] format dates
 * - [x] col width
 */

const headers = [
  { title: 'ID', align: 'start', key: 'id', sortable: false },
  { title: 'Name', align: 'start', key: 'name' },
  { title: 'Desc', align: 'start', key: 'description' },
  { title: 'URL', align: 'start', key: 'url' },
  { title: 'By', align: 'end', key: 'created_by' },
  { title: 'Created', align: 'end', key: 'created_at' },
  { title: 'Updated', align: 'end', key: 'updated_at' },
]
const itemsPerPage = 50
</script>

<template>
  <div>
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="assets"
      :loading="loading"
      class="elevation-1">
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

<style scoped></style>
