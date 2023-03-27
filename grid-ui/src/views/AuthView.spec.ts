import vuetify from '@/plugins/vuetify'
import router from '@/router'
import AuthView from '@/views/AuthView.vue'
// @ts-ignore not sure why pinia/testing has no type defs
import { createTestingPinia } from "@pinia/testing"
import { render } from '@testing-library/vue'
import { describe, it } from 'vitest'

const mountOptions = { global: { plugins: [createTestingPinia(), router, vuetify] } }

describe('AuthView', () => {
  it('renders Login properly', () => {
    const { getByRole } = render(AuthView, { props: { authType: 'login' }, ...mountOptions })
    getByRole('button', { name: 'Login' })
    getByRole('textbox', { name: 'username' })
  })
  it('renders Register properly', () => {
    const { getByRole } = render(AuthView, { props: { authType: 'register' }, ...mountOptions })
    getByRole('button', { name: 'Register' })
  })
})
