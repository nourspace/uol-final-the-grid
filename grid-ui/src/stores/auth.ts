import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const LOCAL_STORAGE_USER = 'grid.user'
const LOCAL_STORAGE_TOKEN = 'grid.token'
const authEndpoint = import.meta.env.VITE_AUTH_ENDPOINT

export const useAuthStore = defineStore('auth', () => {
  const user = ref()
  const token = ref('')
  const loggedIn = computed(() => !!user.value)

  async function authRequest(authType: string, credentials: any) {
    const url = `${authEndpoint}/auth/${authType}`
    const { data } = await axios.post(url, credentials)
    user.value = data.user
    token.value = data.token
    localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(data.user))
    localStorage.setItem(LOCAL_STORAGE_TOKEN, data.token)
  }

  function logout() {
    localStorage.removeItem(LOCAL_STORAGE_USER)
    localStorage.removeItem(LOCAL_STORAGE_TOKEN)
    location.reload()
  }

  function autoLogin() {
    const maybeUser = localStorage.getItem(LOCAL_STORAGE_USER)
    const maybeToken = localStorage.getItem(LOCAL_STORAGE_TOKEN)
     user.value = JSON.parse(maybeUser?? 'null')
     token.value = maybeToken?? ''
  }

  return { user, token, loggedIn, authRequest, autoLogin, logout }
})
