<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed } from 'vue'

const query = gql`
  query allTasks {
    tasks {
      id
      title
      status
      desc
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
const tasks = computed(() => result.value?.tasks ?? [])

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
 */

const headers = [
  {
    title: 'ID',
    align: 'start',
    sortable: false,
    key: 'id',
  },
  { title: 'Title', align: 'start', key: 'name' },
  { title: 'desc', align: 'start', key: 'desc' },
  { title: 'status', align: 'start', key: 'status' },
  { title: 'created_by', align: 'end', key: 'created_by' },
  { title: 'created_at', align: 'end', key: 'created_at' },
  { title: 'updated_at', align: 'end', key: 'updated_at' },
]
const itemsPerPage = 50
</script>

<template>
  <div>
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="tasks"
      :loading="loading"
      class="elevation-1">
      <template v-slot:item.created_at="{ item }">
          {{ new Date(item.raw.created_at).toLocaleDateString() }}
      </template>
      <template v-slot:item.updated_at="{ item }">
          {{ new Date(item.raw.updated_at).toLocaleDateString() }}
      </template>
    </v-data-table-server>
  </div>
</template>

<style>

.v-data-table__td {
    text-overflow: clip;
    /*width: 100px !important;*/
}
</style>
