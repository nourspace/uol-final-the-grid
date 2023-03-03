import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createPinia } from 'pinia'
import { createApp, h, provide } from 'vue'

import App from './App.vue'

import './assets/main.css'

import router from './router'

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/v1/graphql',
  headers: {
    'x-hasura-admin-secret': 'myadminsecretkey',
  },
})
const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

app.use(createPinia())
app.use(router)

app.mount('#app')
