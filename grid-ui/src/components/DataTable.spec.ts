import DataTable from '@/components/DataTable.vue'
import vuetify from '@/plugins/vuetify'
// @ts-ignore not sure why pinia/testing has no type defs
import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

const mountOptions = { global: { plugins: [vuetify] } }

describe('DataTable', () => {
  it('renders properly empty', () => {
    const { getByRole, getByPlaceholderText } = render(DataTable, {
      ...mountOptions,
      props: {
        headers: [],
        items: [],
        newLabel: 'New Task',
        searchTerm: '',
        searchPlaceholder: 'Search Tasks',
      },
    })
    getByPlaceholderText('Search Tasks')
    getByRole('button', { name: 'New Task' })
    getByRole('row', { name: 'No data available' })
  })

  it('renders properly with items', () => {
    const { getAllByRole } = render(DataTable, {
      ...mountOptions,
      props: {
        headers: [{ key: 'id' }, { key: 'name' }],
        items: [
          { id: 1, name: 'item 1' },
          { id: 2, name: 'item 2' },
        ],
        newLabel: 'New Task',
        searchTerm: '',
        searchPlaceholder: 'Search Tasks',
      },
    })
    const rows = getAllByRole('row', { name: 'item-row' })
    expect(rows.length).toBe(2)
  })
})
