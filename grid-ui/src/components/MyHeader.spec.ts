import { describe, expect, it, test } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { mount } from '@vue/test-utils'

import MyHeader from './MyHeader.vue'

// Vue Test Utils
describe('MyHeader', () => {
  it('renders properly', () => {
    const wrapper = mount(MyHeader, { props: {} })
    expect(wrapper.text()).toContain('click')
  })
})

// Testing Library
test('it should work', async () => {
  const { getByTestId, getByRole } = render(MyHeader, { props: {} })
  const counter = getByTestId('counter')
  const button = getByRole('button', { name: 'click' })

  // Jest-dom matchers
  expect(button).toBeEnabled()
  expect(counter.textContent).toBe('0')
  await fireEvent.click(button) // Dispatch a click event to our increment button.
  expect(counter.textContent).toBe('1')
  await fireEvent.click(button) // Dispatch a click event to our increment button.
  await fireEvent.click(button) // Dispatch a click event to our increment button.
  expect(counter.textContent).toBe('3')
  expect(button).toBeDisabled()
})
