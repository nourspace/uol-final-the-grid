import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

// GraphQL
const httpLink = createHttpLink({
  uri: 'http://localhost:8080/v1/graphql',
  headers: {
    'x-hasura-admin-secret': 'myadminsecretkey',
  },
})

const cache = new InMemoryCache()

export default new ApolloClient({
  link: httpLink,
  cache,
})
