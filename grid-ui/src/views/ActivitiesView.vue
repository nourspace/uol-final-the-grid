<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { AllActivities } from '@/graph/activities.query.gql'
import { computed, ref } from 'vue'

const searchTerm = ref('')
const { result, loading, error } = useQuery(
  AllActivities,
  () => ({ search: `%${searchTerm.value}%` }),
  () => ({ debounce: 500, enabled: searchTerm.value == '' || searchTerm.value.length >= 3 }),
)
// extract activities from result, otherwise return default
const activities = computed(() => result.value?.activities ?? [])

const headers = [
  { title: 'ID', align: 'start', sortable: false, key: 'id' },
  { title: 'Type', align: 'start', key: 'type' },
  { title: 'Notes', align: 'start', key: 'notes' },
  { title: 'Source', align: 'start', key: 'source' },
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
      :items="activities"
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
            label="Search Activities"
            placeholder="Search in notes and sources"
            class="mx-4"
            style="flex: 3" />
          <v-spacer></v-spacer>
          <v-btn color="primary" dark class="">New Activity</v-btn>
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
