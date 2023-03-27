import vuetify from '@/plugins/vuetify'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import ActivitiesView from '@/views/ActivitiesView.vue'
// @ts-ignore not sure why pinia/testing has no type defs
import { createTestingPinia } from '@pinia/testing'
import { render } from '@testing-library/vue'
import { describe, it, vi } from 'vitest'

const mountOptions = { global: { plugins: [createTestingPinia(), router, vuetify] } }

const getItems = vi.fn()

vi.mock('@/composables/useListQuery', () => ({
  useListQuery: vi.fn(() => ({ items: getItems() })),
}))
vi.mock('@/composables/assets', () => ({
  useAssetsMini: vi.fn(() => [{ id: 1, name: 'asset 1' }]),
}))

describe('ActivitiesView', () => {
  beforeEach(() => {
    const auth = useAuthStore()
    auth.user = { id: 1, username: 'John' }
  })

  it('renders properly when no items', () => {
    getItems.mockReturnValue([])
    const { getByRole } = render(ActivitiesView, mountOptions)
    getByRole('textbox', { name: 'Search Activities' })
    getByRole('button', { name: 'New Activity' })
    getByRole('row', { name: 'ID Type Topics Notes Source By Created Updated' })
  })

  it('renders properly with items', () => {
    getItems.mockReturnValue([
      {
        id: 1,
        notes: 'notes 1',
        source: 'source 1',
        created_by_object: { username: 'john' },
      },
    ])
    const { getByText } = render(ActivitiesView, mountOptions)
    getByText('notes 1')
    getByText('source 1')
    getByText('john')
  })
})
