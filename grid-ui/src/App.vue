<script setup lang="ts">
import { useEnumsStore } from '@/stores/enums'
import { onMounted } from 'vue'

const links = [
  { title: 'Assets', name: 'assets' },
  { title: 'Activities', name: 'activities' },
  { title: 'Tasks', name: 'tasks' },
  { title: 'Test', name: 'test' },
  { title: 'About', name: 'about' },
]
const { fetchEnums } = useEnumsStore()

onMounted(async () => {
  console.log('App mounted')
  fetchEnums()
})
</script>

<template>
  <v-app id="inspire">
    <v-app-bar class="px-3" color="white" flat density="default" extended>
      <v-avatar color="red-darken-3" size="64">TheGrid</v-avatar>
      <v-spacer></v-spacer>
      <v-tabs centered color="grey-darken-2">
        <v-tab v-for="link in links" :key="link.name" :to="{ name: link.name }">{{ link.title }}</v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <v-avatar class="hidden-sm-and-down" color="blue-darken-1" size="48">User</v-avatar>
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
