import vuetify from '@/plugins/vuetify'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '@/views/HomeView.vue'
// @ts-ignore not sure why pinia/testing has no type defs
import { createTestingPinia } from '@pinia/testing'
import { render } from '@testing-library/vue'
import { describe, it } from 'vitest'

const mountOptions = { global: { plugins: [createTestingPinia(), router, vuetify] } }

describe('HomeView', () => {
  it('renders properly for non logged in', () => {
    const { getByRole } = render(HomeView, mountOptions)
    getByRole('heading', { name: 'Welcome to The Grid' })
    getByRole('link', { name: 'Log in' })
    getByRole('link', { name: 'Register' })
  })
  it('renders properly for logged in users', () => {
    const auth = useAuthStore()
    auth.user = { username: 'John' }
    const { getByRole, getByText } = render(HomeView, { props: { authType: 'register' }, ...mountOptions })
    getByRole('link', { name: 'Activities' })
    getByText('👋 John')
  })
})
