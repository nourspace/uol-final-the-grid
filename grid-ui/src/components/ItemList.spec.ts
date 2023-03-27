import ItemList from '@/components/ItemList.vue'
import vuetify from '@/plugins/vuetify'
// @ts-ignore not sure why pinia/testing has no type defs
import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

const mountOptions = { global: { plugins: [vuetify] } }

describe('ItemList', () => {
  it('renders properly with items', () => {
    const { getByRole, getAllByRole } = render(ItemList, {
      ...mountOptions,
      props: { title: 'My Items', items: ['one', 'two'] },
    })
    getByRole('heading', { name: 'My Items' })
    const items = getAllByRole('listitem')
    expect(items.length).toBe(2)
  })
})
