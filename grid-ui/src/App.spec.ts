import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import router from '@/router'
// @ts-ignore not sure why pinia/testing has no type defs
import { createTestingPinia } from "@pinia/testing"
import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

const mountOptions = { global: { plugins: [createTestingPinia(), router, vuetify] }, props: {} }

describe('App', () => {
  it('renders properly', () => {
    render(App, mountOptions)
  })
  it('has correct tabs and login button', () => {
    const { getByRole } = render(App, mountOptions)
    const tablist = getByRole('tablist')
    expect(tablist.children.length).toBe(1)
    getByRole('tab', { name: 'About' })
    getByRole('link', { name: 'Log in' })
  })
})
