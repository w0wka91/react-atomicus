import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import Radio from './Radio'

afterEach(cleanup)

it('should render', () => {
  const { getByText } = render(
    <>
      <Radio value="1" name="drone" label="huey" />
      <Radio value="2" name="drone" label="dewey" />
    </>
  )
  expect(getByText('huey')).toBeInTheDocument()
  expect(getByText('dewey')).toBeInTheDocument()
})

it('should execute the passed function', () => {
  const func = jest.fn()
  const { getByLabelText } = render(
    <>
      <Radio onChange={func} value="1" name="drone" label="huey" />
      <Radio onChange={func} value="2" name="drone" label="dewey" />
    </>
  )
  fireEvent.click(getByLabelText('huey'))
  fireEvent.click(getByLabelText('dewey'))
  expect(func).toHaveBeenCalledTimes(2)
})
