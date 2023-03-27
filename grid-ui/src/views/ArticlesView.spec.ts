import vuetify from '@/plugins/vuetify'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import ArticlesView from '@/views/ArticlesView.vue'
// @ts-ignore not sure why pinia/testing has no type defs
import { createTestingPinia } from '@pinia/testing'
import { render } from '@testing-library/vue'
import { describe, it, vi } from 'vitest'

const mountOptions = { global: { plugins: [createTestingPinia(), router, vuetify] } }

const getItems = vi.fn()

vi.mock('@/composables/useListQuery', () => ({
  useListQuery: vi.fn(() => ({ items: getItems() })),
}))

describe('ArticlesView', () => {
  beforeEach(() => {
    const auth = useAuthStore()
    auth.user = { id: 1, username: 'John' }
  })

  it('renders properly when no items', () => {
    getItems.mockReturnValue([])
    const { getByRole } = render(ArticlesView, mountOptions)
    getByRole('textbox', { name: 'Search Articles' })
    getByRole('button', { name: 'New Article' })
    getByRole('row', { name: 'ID Type Status Title Summary URL By Created Updated' })
  })

  it('renders properly with items', () => {
    getItems.mockReturnValue([
      {
        id: 1,
        type: 'news_report',
        title: 'article 1',
        created_by_object: { username: 'john' },
      },
    ])
    const { getByText } = render(ArticlesView, mountOptions)
    getByText('news_report')
    getByText('article 1')
    getByText('john')
  })
})
