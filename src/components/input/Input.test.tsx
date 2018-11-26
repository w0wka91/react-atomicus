import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import Input from './Input'

afterEach(cleanup)

it('should represent the passed value', () => {
  const func = jest.fn()
  const { getByLabelText } = render(
    <Input label="Username" value="w0wka91" onChange={func} />
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

it('should append the passed className', () => {
  const { getByPlaceholderText } = render(
    <Input placeholder="Username" className="user-input" />
  )
  expect(getByPlaceholderText('Username')).toHaveClass('user-input')
})
