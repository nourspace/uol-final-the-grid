import CRUDDialog from '@/components/CRUDDialog.vue'
import vuetify from '@/plugins/vuetify'
// @ts-ignore not sure why pinia/testing has no type defs
import { render } from '@testing-library/vue'
import { describe, it } from 'vitest'

const mountOptions = { global: { plugins: [vuetify] } }

describe('CRUDDialog', () => {
  it('renders properly empty', () => {
    const { getByRole } = render(CRUDDialog, {
      ...mountOptions,
      props: { modelValue: true, title: 'My CRUD' },
    })
    getByRole('heading', { name: 'My CRUD' })
    getByRole('button', { name: 'Cancel' })
  })
  it('renders properly with actions', () => {
    const { getByRole } = render(CRUDDialog, {
      ...mountOptions,
      props: { modelValue: true, title: 'My CRUD', enableForm: true, enableSave: true, enableDelete: true },
    })
    getByRole('form', { name: 'My CRUD' })
    getByRole('button', { name: 'Save' })
    getByRole('button', { name: 'Delete' })
  })
})
