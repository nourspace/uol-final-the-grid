import { useQuery } from '@vue/apollo-composable'
import type { DocumentNode } from 'graphql/language'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'

interface QueryVariables {
  search: string
}

interface ListQueryOptions {
  query: DocumentNode
  queryName?: string // defaults to 'items'
  queryVariables: ComputedRef<QueryVariables>
  subscription: DocumentNode
  subscriptionName?: string // defaults to 'stream'
}

export function useListQuery({ query, queryName, queryVariables, subscription, subscriptionName }: ListQueryOptions) {
  // const queryVariables = computed(() => ({ search: `%${searchTerm.value}%` }))
  const { result, loading, error, subscribeToMore } = useQuery(
    query,
    () => queryVariables.value,
    () => ({
      debounce: 500,
      enabled: queryVariables.value.search == '%%' || queryVariables.value.search.length >= 5,
    }),
  )

  // extract from result, otherwise return default
  const items = computed(() => result.value?.[queryName || 'items'] ?? [])

  // Subscribe to more results and append them to query
  // Todo (Nour): [extra] could subscribe to deleted items as well?
  // Todo (Nour): [extra] could subscribe to updated items as well?
  subscribeToMore(() => ({
    document: subscription,
    variables: {
      ...queryVariables.value,
      now: new Date().toUTCString(),
    },
    updateQuery: (previousResult, newResult) => {
      console.debug({ previousResult, newResult })
      return {
        [queryName || 'items']: [
          // Prepend new [queryName] to existing ones
          ...newResult.subscriptionData.data[subscriptionName || 'stream'],
          ...previousResult[queryName || 'items'],
        ],
      }
    },
  }))

  return { items, loading, error }
}
