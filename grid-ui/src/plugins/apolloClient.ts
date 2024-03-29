import { useAuthStore } from '@/stores/auth'
import { ApolloClient, createHttpLink, InMemoryCache, split } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { provideApolloClient } from '@vue/apollo-composable'
import { logErrorMessages } from '@vue/apollo-util'
import { createClient } from 'graphql-ws'

// GraphQL

function getHeaders() {
  const { token } = useAuthStore()
  // Allow admin to set token manually from env
  const adminToken = import.meta.env.VITE_HASURA_GRAPHQL_ADMIN_SECRET
  return {
    // User token
    ...(token && { Authorization: `Bearer ${token}` }),
    // Use admin secret if env is set
    ...(adminToken && { 'X-Hasura-Admin-Secret': adminToken }),
  }
}

// https://www.apollographql.com/docs/react/networking/authentication/
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // return the headers to the context so httpLink can read them
  console.debug('http connection...')
  return {
    headers: { ...headers, ...getHeaders() },
  }
})

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_HASURA_GRAPHQL_ENDPOINT,
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_HASURA_GRAPHQL_WS_ENDPOINT,
    // Todo (Nour): [core] get user token from store
    connectionParams: () => {
      console.debug('ws connection...')
      return { headers: getHeaders() }
    },
  }),
)

// The split function takes three parameters:
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  authLink.concat(httpLink),
)

// Handle errors
const errorLink = onError((error) => {
  if (process.env.NODE_ENV !== 'production') {
    logErrorMessages(error)
  }
  const { logout } = useAuthStore()
  // Log user out should any of the errors is about invalid JWT
  if (error?.graphQLErrors?.some((e) => e.extensions.code == 'invalid-jwt')) {
    console.debug('Invalid token logging out')
    logout()
  }
})

// Avoid merge warnings
// We should use the original query name, not the alias
// https://dera.hashnode.dev/fix-cache-data-may-be-lost-when-replacing-the-getallposts-field-of-a-query-object-in-apollo-client
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        assets: { merge: (existing, incoming) => incoming },
        activities: { merge: (existing, incoming) => incoming },
        tasks: { merge: (existing, incoming) => incoming },
      },
    },
  },
})

export const apolloClient = new ApolloClient({
  link: errorLink.concat(splitLink),
  cache,
})

provideApolloClient(apolloClient)

export default apolloClient
