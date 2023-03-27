import vuetify from '@/plugins/vuetify'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import AssetsView from '@/views/AssetsView.vue'
// @ts-ignore not sure why pinia/testing has no type defs
import { createTestingPinia } from '@pinia/testing'
import { render } from '@testing-library/vue'
import { describe, it, vi } from 'vitest'

const mountOptions = { global: { plugins: [createTestingPinia(), router, vuetify] } }

const getItems = vi.fn()

vi.mock('@/composables/useListQuery', () => ({
  useListQuery: vi.fn(() => ({ items: getItems() })),
}))

describe('AssetsView', () => {
  beforeEach(() => {
    const auth = useAuthStore()
    auth.user = { id: 1, username: 'John' }
  })

  it('renders properly when no items', () => {
    getItems.mockReturnValue([])
    const { getByRole } = render(AssetsView, mountOptions)
    getByRole('textbox', { name: 'Search Topics' })
    getByRole('button', { name: 'New Topic' })
    getByRole('row', { name: 'ID Name Category Desc URL By Updated' })
  })

  it('renders properly with items', () => {
    getItems.mockReturnValue([
      {
        id: 1,
        name: 'item 1',
        category: 'cat 1',
        desc: 'desc',
        created_by_object: { username: 'john' },
      },
    ])
    const { getByText } = render(AssetsView, mountOptions)
    getByText('item 1')
    getByText('john')
  })
})
