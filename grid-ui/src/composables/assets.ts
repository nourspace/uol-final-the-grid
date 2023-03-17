import { AllAssetsMini } from '@/graph/assets.query.gql'
import { useQuery } from '@vue/apollo-composable'
import type { Ref } from 'vue'
import { computed } from 'vue'

export function useAssetsMini(search: Ref<string>) {
  const { result, loading, error } = useQuery(
    AllAssetsMini,
    () => ({ search: `%${search.value}%` }),
    () => ({ debounce: 500 }),
  )
  const assets = computed(() => result.value?.items ?? [])
  return { assets, loading, error }
}
