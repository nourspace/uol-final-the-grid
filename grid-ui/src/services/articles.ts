import { InsertArticle } from '@/graph/articles.mutation.gql'
import { useApolloClient } from '@vue/apollo-composable'

// Todo (Nour): [TS] maybe generate types
export interface Article {
  id?: number
  status?: string
  type: string
  title: string
  summary?: string
  body?: string
  url?: string
  tasks?: Task[]
  created_by_object?: { id: number }
}
export interface Task {
  id: string
  title: string
}

// Todo (Nour): [dx] this is better done as composable to return loading status etc?
export async function insertArticle(article: Article) {
  const { resolveClient } = useApolloClient()
  const client = resolveClient()

  console.debug('insertArticle', { article })
  const res = await client.mutate({ mutation: InsertArticle, variables: { object: article } })
  return res.data.item
}
