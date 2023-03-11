import { AllEnums } from '@/graph/enums.query.gql'
import { useQuery } from '@vue/apollo-composable'
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Enum {
  value: string
  comment: string
}

export const useEnumsStore = defineStore('counter', () => {
  const assetCategory = ref<Enum[]>([])
  const activityType = ref<Enum[]>([])
  const taskStatus = ref<Enum[]>([])
  const userRole = ref<Enum[]>([])

  function fetchEnums() {
    console.debug('Fetching enums...')
    const { onResult, onError} = useQuery(AllEnums)
    onResult((queryResult) => {
      console.debug('Got enums...')
      console.log(queryResult.data)
      assetCategory.value = queryResult.data.asset_category
      activityType.value = queryResult.data.activity_type
      taskStatus.value = queryResult.data.activity_type
      userRole.value = queryResult.data.activity_type
    })
    // Todo (Nour): [exception] handle query errors
    onError((error) => {
      console.log(error)
    })
  }

  return { assetCategory, activityType, taskStatus, userRole, fetchEnums }
})
