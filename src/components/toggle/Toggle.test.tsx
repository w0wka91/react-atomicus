import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { Toggle } from './Toggle'

afterEach(cleanup)

it('should be checked after render', () => {
  const { getByLabelText } = render(<Toggle label="Test" defaultChecked />)
  expect(getByLabelText('Test')).toHaveAttribute('checked')
})

it('should execute the passed function', () => {
  const func = jest.fn()
  const { getByLabelText } = render(<Toggle onClick={func} label="Test" />)
  fireEvent.focus(getByLabelText('Test'))
  fireEvent.click(getByLabelText('Test'))
  expect(func).toHaveBeenCalledTimes(1)
})
