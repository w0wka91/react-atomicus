import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { Checkbox } from './Checkbox'

afterEach(cleanup)

it('should be checked after render', () => {
  const { getByLabelText } = render(<Checkbox label="Test" defaultChecked />)
  expect(getByLabelText('Test')).toHaveAttribute('checked')
})

it('should execute the onClick function', () => {
  const func = jest.fn()
  const { getByLabelText } = render(<Checkbox onClick={func} label="Test" />)
  fireEvent.click(getByLabelText('Test'))
  expect(func).toHaveBeenCalledTimes(1)
})

it('should execute the onFocus function', () => {
  const func = jest.fn()
  const { getByLabelText } = render(<Checkbox onFocus={func} label="Test" />)
  fireEvent.focus(getByLabelText('Test'))
  expect(func).toHaveBeenCalledTimes(1)
})

it('should execute the onBlur function', () => {
  const func = jest.fn()
  const { getByLabelText } = render(<Checkbox onBlur={func} label="Test" />)
  fireEvent.blur(getByLabelText('Test'))
  expect(func).toHaveBeenCalledTimes(1)
})
