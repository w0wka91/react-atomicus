import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Button from './Button'

afterEach(cleanup)

it('should render secondary button', () => {
  const { getByText } = render(<Button hierarchy="secondary">Secondary</Button>)
  expect(getByText('Secondary')).toBeInTheDocument()
})

it('should render tertiary button', () => {
  const { getByText } = render(<Button hierarchy="tertiary">Tertiary</Button>)
  expect(getByText('Tertiary')).toBeInTheDocument()
})

it('should render a fluid button', () => {
  const { getByText } = render(
    <Button hierarchy="tertiary" fluid={true}>
      Fluid
    </Button>
  )
  expect(getByText('Fluid')).toBeInTheDocument()
})

it('should render button with icon', () => {
  const { getByText } = render(
    <Button hierarchy="secondary" intent="danger">
      <Button.Icon name="x" />
      <span>Delete</span>
    </Button>
  )
  expect(getByText('Delete')).toBeInTheDocument()
})

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

it('should be disabled when in loading state', () => {
  const { getByText, rerender } = render(<Button>Loading Button</Button>)
  const loadingBtn = getByText('Loading Button')
  rerender(<Button loading>Loading Button</Button>)
  expect(loadingBtn).toBeDisabled()
})
