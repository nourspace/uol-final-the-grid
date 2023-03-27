import CommentsBox from '@/components/CommentsBox.vue'
import vuetify from '@/plugins/vuetify'
// @ts-ignore not sure why pinia/testing has no type defs
import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

const mountOptions = { global: { plugins: [vuetify] } }

describe('CommentsBox', () => {
  it('renders properly', () => {
    const { getByRole } = render(CommentsBox, mountOptions)
    getByRole('textbox', { name: 'Add comment' })
    const list = getByRole('list', { name: 'items' })
    const items = list.childNodes[0].childNodes
    // Fixme (Nour): this is wrong, they should be 8
    expect(items.length).toBe(10)
  })
})
