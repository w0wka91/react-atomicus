import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import Checkbox from './Checkbox'

afterEach(cleanup)

it('should be checked after render', () => {
  const { getByLabelText } = render(<Checkbox label="Test" defaultChecked />)
  expect(getByLabelText('Test')).toHaveAttribute('checked')
})

it('should execute the passed function', () => {
  const func = jest.fn()
  const { getByLabelText } = render(<Checkbox onClick={func} label="Test" />)
  fireEvent.click(getByLabelText('Test'))
  expect(func).toHaveBeenCalledTimes(1)
})
