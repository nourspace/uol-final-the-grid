import { useAuthStore } from "@/stores/auth"
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createPinia } from 'pinia'
import { createApp, h, provide } from 'vue'

import apolloClient from '@/plugins/apolloClient'
import vuetify from '@/plugins/vuetify'
import router from '@/router'

import '@/assets/main.scss'
import App from '@/App.vue'

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
  created() {
    const { autoLogin } = useAuthStore()
    autoLogin()
  },
})

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
