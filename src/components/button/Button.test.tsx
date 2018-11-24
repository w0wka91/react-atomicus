import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import Button from './Button'

afterEach(cleanup)

it('should execute the passed function', () => {
  const func = jest.fn()
  const { getByText } = render(<Button onClick={func}>Load Greeting</Button>)
  fireEvent.click(getByText('Load Greeting'))
  expect(func).toHaveBeenCalledTimes(1)
})

it('should append the passed className', () => {
  const { getByText } = render(
    <Button className="customizedButton">Hello</Button>
  )
  expect(getByText('Hello')).toHaveClass('customizedButton')
})
