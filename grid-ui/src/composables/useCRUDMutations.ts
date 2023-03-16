import { useMutation } from '@vue/apollo-composable'
import type { DocumentNode } from 'graphql/language'

interface TModel {
  id: string
}

interface CRUDMutationOptions {
  insertMutation: DocumentNode
  updateMutation: DocumentNode
  deleteMutation: DocumentNode
  editedItem: any
  selectedItemId: any
  reset: any
  listQuery: string
  listQueryName?: string // defaults to 'items'
  deleteMutationName?: string // defaults to 'item'
}

const DEFAULT_LIST_QUERY_NAME = 'items'
const DEFAULT_DELETE_MUTATION_NAME = 'item'

export function useCRUDMutations({
  insertMutation,
  updateMutation,
  deleteMutation,
  editedItem,
  selectedItemId,
  reset,
  listQuery,
  listQueryName,
  deleteMutationName,
}: CRUDMutationOptions) {
  // Insert
  // We assume the list query is using subscription so we don't explicitly update it here
  const {
    mutate: insertItem,
    loading: insertLoading,
    onDone: insertDone,
    onError: insertError,
  } = useMutation(insertMutation, () => ({ variables: { object: editedItem.value } }))
  // Update
  const {
    mutate: updateItem,
    loading: updateLoading,
    onDone: updateDone,
    onError: updateError,
  } = useMutation(updateMutation, () => ({ variables: { id: selectedItemId.value, object: editedItem.value } }))
  // Delete
  const {
    mutate: deleteItem,
    loading: deleteLoading,
    onDone: deleteDone,
    onError: deleteError,
  } = useMutation(deleteMutation, () => ({
    variables: { id: selectedItemId.value },
    // Todo (Nour): [dx] this is going to be deprecated usage of `update` to directly work with cache is encouraged
    // Update list query result after deletion
    updateQueries: {
      [listQuery]: function (previousResult, { mutationResult }) {
        const items: TModel[] = previousResult[listQueryName || DEFAULT_LIST_QUERY_NAME]
        const deletedItem: TModel = mutationResult.data[deleteMutationName || DEFAULT_DELETE_MUTATION_NAME]
        if (!deletedItem || items.length == 0) {
          return previousResult
        }
        console.debug('updating [query] after deletion...', items.length)
        return {
          [listQueryName || DEFAULT_LIST_QUERY_NAME]: items.filter((item) => item.id != deletedItem.id),
        }
      },
    },
  }))

  insertDone((result) => {
    console.info('insertDone', result.data)
    reset()
  })
  updateDone((result) => {
    console.info('updateDone', result.data)
    reset()
  })
  deleteDone((result) => {
    console.info('deleteDone', result.data)
    // Todo (Nour): [ux] when  result.data.delete_items_by_pk is null it means user was not able to delete
    reset()
  })
  insertError((error) => console.log(error))
  updateError((error) => console.log(error))
  deleteError((error) => console.log(error))

  return { insertItem, insertLoading, insertDone, updateItem, updateLoading, updateDone, deleteItem, deleteLoading }
}
