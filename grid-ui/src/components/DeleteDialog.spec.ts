import DeleteDialog from '@/components/DeleteDialog.vue'
import vuetify from '@/plugins/vuetify'
// @ts-ignore not sure why pinia/testing has no type defs
import { render } from '@testing-library/vue'
import { describe, it } from 'vitest'

const mountOptions = { global: { plugins: [vuetify] } }

describe('DeleteDialog', () => {
  it('renders properly with actions', () => {
    const { getByRole } = render(DeleteDialog, {
      ...mountOptions,
      props: { modelValue: true, title: 'My Delete', enableForm: true, enableSave: true, enableDelete: true },
    })
    getByRole('heading', { name: 'My Delete' })
    getByRole('button', { name: 'Cancel' })
    getByRole('button', { name: 'Delete' })
  })
})
