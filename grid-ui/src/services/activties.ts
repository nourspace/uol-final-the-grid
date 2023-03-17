import { DeleteActivityAssets, InsertActivityAssets } from '@/graph/activities.mutation.gql'
import { useApolloClient } from '@vue/apollo-composable'

// Todo (Nour): [TS] maybe generate types
export interface Activity {
  id?: number
  type?: string
  notes: string
  source: string
  activity_assets?: { asset: Asset }[]
  created_by_object?: { id: number }
}

export interface Asset {
  id: number
  name: string
}

// Todo (Nour): [dx] this is better done as composable to return loading status etc?
export async function setActivityAssets(activityId: number, assets: Asset[]) {
  const { resolveClient } = useApolloClient()
  const client = resolveClient()

  console.debug('setActivityAssets', { activityId, assets })
  // Delete assets
  await client.mutate({ mutation: DeleteActivityAssets, variables: { id: activityId } })

  // Insert activity assets
  const objects = assets.map((asset) => ({ activity_id: activityId, asset_id: asset.id }))
  await client.mutate({ mutation: InsertActivityAssets, variables: { id: activityId, objects } })
}
