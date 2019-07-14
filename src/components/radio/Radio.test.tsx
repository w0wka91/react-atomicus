import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { Radio } from './Radio'

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
  let radioInput: HTMLInputElement
  const func = jest.fn(evt => (radioInput = evt.target))
  const { getByLabelText } = render(
    <>
      <Radio onChange={func} value="1" name="drone" label="huey" />
      <Radio onChange={func} value="2" name="drone" label="dewey" />
    </>
  )
  fireEvent.click(getByLabelText('dewey'))
  expect(radioInput.name).toBe('drone')
  expect(radioInput.value).toBe('2')
})
