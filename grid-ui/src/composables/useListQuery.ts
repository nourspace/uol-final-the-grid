import { useQuery } from '@vue/apollo-composable'
import type { DocumentNode } from 'graphql/language'
import { computed } from 'vue'
import type { ComputedRef } from 'vue'

interface QueryVariables {
  search: string
}

interface ListQueryOptions {
  query: DocumentNode
  queryName: string
  queryVariables: ComputedRef<QueryVariables>
  subscription: DocumentNode
  subscriptionName: string
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
  const items = computed(() => result.value?.[queryName] ?? [])

  // Subscribe to more results and append them to query
  // Todo (Nour): [extra] could subscribe to deleted items as well?
  subscribeToMore(() => ({
    document: subscription,
    variables: {
      ...queryVariables.value,
      now: new Date().toUTCString(),
    },
    updateQuery: (previousResult, newResult) => {
      console.debug({ previousResult, newResult })
      return {
        [queryName]: [
          // Prepend new [queryName] to existing ones
          ...newResult.subscriptionData.data[subscriptionName],
          ...previousResult[queryName],
        ],
      }
    },
  }))

  return { items, loading, error }
}
