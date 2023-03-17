<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import type { AxiosError } from 'axios'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  authType: string
}>()
const title = computed(() => props.authType[0].toUpperCase() + props.authType.slice(1))
const isRegister = computed(() => props.authType == 'register')
const passwordHint = computed(() => (isRegister.value ? 'At least 5 characters' : ''))

const username = ref('')
const password = ref('')
const error = ref<AxiosError<{ error: any[] }> | undefined>(undefined)
const errors = computed(() => {
  const e = error.value?.response?.data?.error ?? error.value?.response?.data ?? error.value
  if (Array.isArray(e) && e.length > 0 && e[0].msg) {
    return e.map((m) => `${m.msg} for ${m.param}`)
  }
  return e
})

const { authRequest } = useAuthStore()
const router = useRouter()

async function submit() {
  try {
    await authRequest(props.authType, { username: username.value, password: password.value })
    error.value = undefined
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
      <v-row class="justify-center align">
        <v-col cols="6">
          <v-form @submit.prevent="submit">
            <v-text-field v-model="username" label="username" color="primary" required />
            <v-text-field v-model="password" label="password" color="primary" type="password" :hint="passwordHint" />
            <v-btn type="submit" color="primary" variant="outlined" class="my-4">{{ title }}</v-btn>
          </v-form>
          <v-alert v-if="errors" variant="outlined" type="error" class="mb-4">
            <ul>
              <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
            </ul>
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
