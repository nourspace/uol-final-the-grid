import vuetify from '@/plugins/vuetify'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import TasksView from '@/views/TasksView.vue'
// @ts-ignore not sure why pinia/testing has no type defs
import { createTestingPinia } from '@pinia/testing'
import { render } from '@testing-library/vue'
import { describe, it, vi } from 'vitest'

const mountOptions = { global: { plugins: [createTestingPinia(), router, vuetify] } }

const getItems = vi.fn()

vi.mock('@/composables/useListQuery', () => ({
  useListQuery: vi.fn(() => ({ items: getItems() })),
}))

describe('TasksView', () => {
  beforeEach(() => {
    const auth = useAuthStore()
    auth.user = { id: 1, username: 'John' }
  })

  it('renders properly when no items', () => {
    getItems.mockReturnValue([])
    const { getByRole } = render(TasksView, mountOptions)
    getByRole('textbox', { name: 'Search Tasks' })
    getByRole('button', { name: 'New Task' })
    getByRole('row', { name: 'ID Status Title Desc By Article Created Updated' })
  })

  it('renders properly with items', () => {
    getItems.mockReturnValue([
      {
        id: 1,
        status: 'backlog',
        title: 'task 1',
        article: { title: "article 1" },
        created_by_object: { username: 'john' },
      },
    ])
    const { getByText } = render(TasksView, mountOptions)
    getByText('backlog')
    getByText('task 1')
    getByText('article 1')
    getByText('john')
  })
})
