<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useEnumsStore } from '@/stores/enums'
import { storeToRefs } from 'pinia'
import { computed, onMounted, watch } from 'vue'

const { fetchEnums } = useEnumsStore()
const auth = useAuthStore()
const { loggedIn, user } = storeToRefs(auth)
const links = computed(() => [
  ...(loggedIn.value
    ? [
        { title: 'Assets', name: 'assets' },
        { title: 'Activities', name: 'activities' },
        { title: 'Tasks', name: 'tasks' },
      ]
    : []),
  { title: 'Test', name: 'test' },
  { title: 'About', name: 'about' },
])

// Todo (Nour): [dx] refactor fetching enums
onMounted(() => {
  // fetch on landing
  loggedIn.value && fetchEnums()
})
watch(loggedIn, () => {
  // fetch after login
  loggedIn.value && fetchEnums()
})

// Todo (Nour): How to have auth views outside the app?
</script>

<template>
  <v-app id="inspire">
    <v-app-bar class="px-3" color="white" flat density="default" extended>
      <router-link to="/">
        <v-avatar color="red-darken-3" size="64">TheGrid</v-avatar>
      </router-link>
      <v-spacer></v-spacer>
      <v-tabs centered color="primary" :hide-slider="true">
        <v-tab v-for="link in links" :key="link.name" :to="{ name: link.name }">{{ link.title }}</v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <template v-if="loggedIn">
        <v-btn variant="text" @click="auth.logout"> Logout</v-btn>
        <v-avatar class="hidden-sm-and-down" color="blue-darken-1" size="48">
          {{ user.username }}
        </v-avatar>
      </template>
      <v-btn v-else variant="tonal" color="primary" :to="{ name: 'login' }"> Login</v-btn>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" sm="12">
            <v-sheet min-height="80vh" rounded="lg">
              <RouterView />
            </v-sheet>
          </v-col>
          <!--          <v-col cols="12" sm="2">-->
          <!--            <v-sheet rounded="lg" min-height="268">-->
          <!--              &lt;!&ndash;  &ndash;&gt;-->
          <!--            </v-sheet>-->
          <!--          </v-col>-->
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>
