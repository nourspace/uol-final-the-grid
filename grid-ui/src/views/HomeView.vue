<script setup lang="ts">
import { AllActivities } from '@/graph/activities.query.gql'
import { useQuery } from '@vue/apollo-composable'
import { computed, ref } from 'vue'

const searchTerm = ref('')
const { result, loading, error } = useQuery(
  AllActivities,
  () => ({ search: `%${searchTerm.value}%` }),
  () => ({ debounce: 500, enabled: searchTerm.value.length >= 3 }),
)
console.log({ result })
// extract activities from result, otherwise return default
const activities = computed(() => result.value?.activities ?? [])
</script>

<template>
  <main>
    <v-sheet width="300" class="mx-auto">
      <v-form>
        <v-text-field v-model="searchTerm" :loading="true" clearable label="Search" prepend-icon="mdi-vuetify">
          <template v-slot:loader>
            <v-progress-linear :active="loading" color="info" absolute height="7" indeterminate></v-progress-linear>
          </template>
        </v-text-field>
        <VBtn type="submit" variant="elevated" append-icon="mdi-heart" color="primary">Hey</VBtn>
      </v-form>
      <p v-if="loading">Loading...</p>
      <p v-else-if="error">Something went wrong: {{ error }}</p>
      <template v-else-if="activities">
        <div>
          <p v-for="a in activities" :key="a.id">{{ a.id }}: {{ a.notes }}</p>
        </div>
      </template>
    </v-sheet>
  </main>
</template>
