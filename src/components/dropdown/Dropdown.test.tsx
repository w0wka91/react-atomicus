import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
} from '@testing-library/react'
import { Dropdown } from './Dropdown'

afterEach(cleanup)

it('should render a basic dropdown', () => {
  const { getByTitle } = render(
    <Dropdown label="Perform action" title="action" menuItems={[]} />
  )
  expect(getByTitle('action')).toBeInTheDocument()
})

it('should use the label as the title', () => {
  const { getByTitle } = render(
    <Dropdown label="Perform action" icon="arrow-down" menuItems={[]} />
  )
  expect(getByTitle('Perform action')).toBeInTheDocument()
})

it('should render dropdown with icon', () => {
  const { getByTitle } = render(
    <Dropdown
      label="Perform action"
      title="action"
      icon="arrow-down"
      menuItems={[]}
    />
  )
  expect(getByTitle('action')).toBeVisible()
})

it('should execute the given function', () => {
  const func = jest.fn()
  const { getByTitle } = render(
    <Dropdown
      label="Perform action"
      icon="arrow-down"
      onSelect={func}
      menuItems={[
        { key: '1', label: 'test_1' },
        { key: '2', label: 'test_2' },
        { key: '3', label: 'test_3' },
      ]}
    />
  )
  expect(getByTitle('test_1')).not.toBeVisible()
  fireEvent.click(getByTitle('Perform action'))
  fireEvent.click(getByTitle('test_1'))
  expect(func).toHaveBeenCalledTimes(1)
  expect(func).toHaveBeenCalledWith({ key: '1', label: 'test_1' })
})
