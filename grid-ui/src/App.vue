<script setup lang="ts">
import { AllActivities } from '@/graph/activities.query.gql'
import { useQuery } from '@vue/apollo-composable'
import { computed, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

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
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
      <div style="height: 300px">
        <input v-model="searchTerm" />
        <p v-if="loading">Loading...</p>
        <p v-else-if="error">Something went wrong: {{ error }}</p>
        <template v-else-if="activities">
          <div>
            <p v-for="a in activities" :key="a.id">{{ a.id }}: {{ a.notes }}</p>
          </div>
        </template>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>