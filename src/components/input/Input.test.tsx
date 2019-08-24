import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { Input } from './Input'

afterEach(cleanup)

it('should represent the passed value', () => {
  const func = jest.fn()
  const { getByLabelText } = render(
    <Input info="test" label="Username" value="w0wka91" onChange={func} />
  )
  expect((getByLabelText('Username') as HTMLInputElement).value).toBe('w0wka91')
})

it('should execute the onchange handler', () => {
  const func = jest.fn()
  const { getByLabelText } = render(<Input label="Username" onChange={func} />)
  fireEvent.change(getByLabelText('Username'), {
    target: { value: 'peter' },
  })
  expect(func).toBeCalledTimes(1)
})

it('should render an input field with an icon', () => {
  const { getByLabelText } = render(
    <>
      <Input label="Username" placeholder="w0wka91" iconLeft="user" />
      <Input label="E-Mail" placeholder="w0wka91" iconRight="at-sign" />
    </>
  )
  expect(getByLabelText('Username')).toBeInTheDocument()
  expect(getByLabelText('E-Mail')).toBeInTheDocument()
})

it('should render an fluid input field', () => {
  const { getByLabelText } = render(
    <Input
      label="E-Mail"
      placeholder="w0wka91"
      iconRight="at-sign"
      fluid={true}
    />
  )
  expect(getByLabelText('E-Mail')).toBeInTheDocument()
})

it('should render an invalid input field', () => {
  const { getByLabelText } = render(
    <Input label="Username" error="The username is required" />
  )
  expect(getByLabelText('Username')).toBeInTheDocument()
})

it('should render a valid input field', () => {
  const { getByLabelText } = render(<Input label="Username" valid={true} />)
  expect(getByLabelText('Username')).toBeInTheDocument()
})

it('should append the passed className', () => {
  const { getByPlaceholderText } = render(
    <Input placeholder="Username" className="user-input" />
  )
  expect(getByPlaceholderText('Username')).toHaveClass('user-input')
})
