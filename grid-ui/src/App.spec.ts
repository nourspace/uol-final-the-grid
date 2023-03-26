import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import router from '@/router'
import { render } from '@testing-library/vue'
import { createPinia } from 'pinia'
import { describe, expect, it } from 'vitest'

const mountOptions = { global: { plugins: [createPinia(), router, vuetify] }, props: {} }

describe('App', () => {
  it('renders properly', () => {
    render(App, mountOptions)
  })
  it('has correct items', () => {
    const { getByRole } = render(App, mountOptions)
    const tablist = getByRole('tablist')
    expect(tablist.children.length).toBe(1)
    getByRole('tab', { name: 'About' })
    getByRole('link', { name: 'Log in' })
  })
})
