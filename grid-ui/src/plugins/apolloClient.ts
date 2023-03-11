import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { provideApolloClient } from "@vue/apollo-composable"

// GraphQL
const token = import.meta.env.VITE_USER_TOKEN
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_HASURA_GRAPHQL_ENDPOINT,
  headers: {
    // User token
    Authorization: `Bearer ${token}`,
    // Use admin secret if env is set
    ...(import.meta.env.VITE_HASURA_GRAPHQL_ADMIN_SECRET && {
      'x-hasura-admin-secret': import.meta.env.VITE_HASURA_GRAPHQL_ADMIN_SECRET,
    }),
  },
})

const cache = new InMemoryCache()

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

provideApolloClient(apolloClient)

export default apolloClient
