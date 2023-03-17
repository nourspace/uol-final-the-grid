<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const { loggedIn, user } = storeToRefs(useAuthStore())
</script>

<template>
  <v-sheet>
    <v-container>
      <v-row>
        <v-col cols="12" class="text-center">
          <h1 class="text-h2 mb-10">Welcome to The Gird</h1>
          <div v-if="loggedIn">
            <p class="text-h4 mb-2">👋 {{ user.username }}</p>
            <p class="text-h6">
              How's your day going? Let's add some
              <router-link :to="{ name: 'activities' }">Activities</router-link>
            </p>
          </div>
          <div v-else>
            <p class="text-h6">
              Please
              <router-link :to="{ name: 'login' }">Log in</router-link>
              or
              <router-link :to="{ name: 'register' }">Register</router-link>
              to access dashboards
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
