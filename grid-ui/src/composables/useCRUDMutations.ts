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
  deleteMutationName?: string // defaults to 'delete_items_by_pk'
}

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
    // Update list query result after deletion
    updateQueries: {
      [listQuery]: (previousResult, { mutationResult }) => {
        const items: TModel[] = previousResult[listQueryName || 'items']
        const deletedItem: TModel = mutationResult.data[deleteMutationName || 'delete_items_by_pk']
        if (!deletedItem || items.length == 0) {
          return previousResult
        }
        console.debug('updating [query] after deletion...', items.length)
        return {
          [listQueryName || 'items']: items.filter((item) => item.id != deletedItem.id),
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

  return { insertItem, insertLoading, updateItem, updateLoading, deleteItem, deleteLoading }
}
