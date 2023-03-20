import { AllEnums } from '@/graph/enums.query.gql'
import { useQuery } from '@vue/apollo-composable'
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Enum {
  value: string
  comment: string
}

export const useEnumsStore = defineStore('enums', () => {
  const assetCategory = ref<Enum[]>([])
  const activityType = ref<Enum[]>([])
  const taskStatus = ref<Enum[]>([])
  const userRole = ref<Enum[]>([])
  const articleStatus = ref<Enum[]>([])
  const articleType = ref<Enum[]>([])

  function fetchEnums() {
    console.debug('Fetching enums...')
    const { onResult, onError } = useQuery(AllEnums)
    onResult((queryResult) => {
      console.debug('Got enums...')
      console.log(queryResult.data)
      activityType.value = queryResult.data.activity_type
      assetCategory.value = queryResult.data.asset_category
      taskStatus.value = queryResult.data.task_status
      userRole.value = queryResult.data.user_role
      articleStatus.value = queryResult.data.article_status
      articleType.value = queryResult.data.article_type
    })
    // Todo (Nour): [exception] handle query errors
    onError((error) => {
      console.log(error)
    })
  }

  return { assetCategory, activityType, taskStatus, userRole, articleStatus, articleType, fetchEnums }
})
