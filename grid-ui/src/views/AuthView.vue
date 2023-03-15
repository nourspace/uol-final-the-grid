<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import type { AxiosError } from "axios"
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  authType: string
}>()
const title = computed(() => props.authType[0].toUpperCase() + props.authType.slice(1))

const username = ref('')
const password = ref('')
const error = ref<AxiosError<{error:string}> | null>(null)

const { authRequest } = useAuthStore()
const router = useRouter()

async function submit() {
  try {
    await authRequest(props.authType, { username: username.value, password: password.value })
    error.value = null
    await router.push({ name: 'activities' })
  } catch (e: any) {
    console.log(e)
    error.value = e
  }
}
</script>
<template>
  <div class="authForm">
    <h1>{{ title }}</h1>
    <v-container>
      <v-row class="justify-center">
        <v-col cols="6">
          <v-form @submit.prevent="submit" class="">
            <v-text-field v-model="username" label="username" color="primary" />
            <v-text-field v-model="password" label="password" color="primary" />
            <v-btn type="submit" color="primary" variant="outlined">{{ title }}</v-btn>
          </v-form>
          <v-alert v-if="error" variant="outlined" type="error">
            {{ error?.response?.data?.error || error?.response?.data || error }}
          </v-alert>
          <router-link v-if="authType == 'login'" :to="{ name: 'register' }">
            Don't have an account? Register.
          </router-link>
          <router-link v-if="authType == 'register'" :to="{ name: 'login' }">
            Already have an account? Login.
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .authForm {
    min-height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>