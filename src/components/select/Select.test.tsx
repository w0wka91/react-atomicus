import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Select from './Select'

afterEach(cleanup)

const options = [
  { label: 'Wonder Woman', value: 'wonder-woman' },
  { label: 'Thanos', value: 'thanos' },
  { label: 'Iron Man', value: 'iron-man' },
  { label: 'Captain America', value: 'captain-america' },
]

it('should represent the passed value', () => {
  const { getByLabelText } = render(
    <Select label="Superheroes" value="Wonder Woman" options={options} fluid />
  )
  expect((getByLabelText('Superheroes') as HTMLInputElement).value).toBe(
    'Wonder Woman'
  )
})

it('should be selectable by click', async () => {
  const func = jest.fn()
  const { getByLabelText, getByTitle, rerender } = render(
    <Select label="Superheroes" options={options} onChange={func} />
  )

  fireEvent.click(getByTitle('show options'))
  fireEvent.click(getByTitle('Thanos'))
  expect(func).toHaveBeenCalledWith('thanos')
  expect(getByLabelText('Superheroes')).toHaveValue('Thanos')
})

it('should be selectable with the keyboard', async () => {
  const func = jest.fn()
  const { getByLabelText, getByTitle, rerender } = render(
    <Select label="Superheroes" options={options} onChange={func} />
  )

  fireEvent.keyDown(getByLabelText('Superheroes'), { keyCode: 40 })
  fireEvent.keyDown(getByLabelText('Superheroes'), { keyCode: 40 })
  fireEvent.keyDown(getByLabelText('Superheroes'), { keyCode: 40 })
  fireEvent.keyDown(getByLabelText('Superheroes'), { keyCode: 13 })
  expect(getByLabelText('Superheroes')).toHaveFocus()
  expect(func).toHaveBeenCalledWith('iron-man')
  expect(getByLabelText('Superheroes')).toHaveValue('Iron Man')
})

it('should filter the options', async () => {
  const func = jest.fn()
  const { getByLabelText, getByTitle, rerender } = render(
    <Select label="Superheroes" options={options} onChange={func} />
  )

  fireEvent.change(getByLabelText('Superheroes'), {
    target: { value: 'Ir' },
  })
  fireEvent.keyDown(getByLabelText('Superheroes'), { keyCode: 40 })
  fireEvent.keyDown(getByLabelText('Superheroes'), { keyCode: 13 })
  expect(func).toHaveBeenCalledWith('iron-man')
})

it('should delete the current value on escape', async () => {
  const func = jest.fn()
  const { getByLabelText } = render(
    <Select
      label="Superheroes"
      value="Iron Man"
      options={options}
      onChange={func}
    />
  )

  expect(getByLabelText('Superheroes')).toHaveValue('Iron Man')
  fireEvent.keyDown(getByLabelText('Superheroes'), { keyCode: 27 })
  expect(getByLabelText('Superheroes')).toHaveValue('')
})

it('should not propogate the keydown event', async () => {
  const func = jest.fn()
  const { getByLabelText, container } = render(
    <Select
      label="Superheroes"
      value="Iron Man"
      options={options}
      onChange={func}
    />
  )
  container.addEventListener('keydown', func, false)
  fireEvent.keyDown(getByLabelText('Superheroes'), { keyCode: 27 })
  expect(func).toBeCalledTimes(0)
})
