import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { Datepicker } from './Datepicker'

afterEach(cleanup)

it('should render', () => {
  const { getByLabelText } = render(<Datepicker label="datepicker" />)
  expect(getByLabelText('datepicker')).toBeInTheDocument()
})

it('should set the value after select', () => {
  const formatDate = jest.fn()
  const onChange = jest.fn()
  formatDate.mockReturnValue('placeholder')
  const { getByLabelText, getByTitle } = render(
    <Datepicker
      label="datepicker"
      formatDate={formatDate}
      onChange={onChange}
    />
  )
  fireEvent.click(getByTitle(new Date().toLocaleDateString('en-US')))
  expect((getByLabelText('datepicker') as HTMLInputElement).value).toBe(
    'placeholder'
  )
  expect(formatDate).toBeCalledTimes(1)
  expect(onChange).toBeCalledTimes(1)
})

it('should execute the given function on change', () => {
  const parseDate = jest.fn()
  parseDate.mockReturnValue(new Date())
  const { getByLabelText } = render(
    <Datepicker label="datepicker" parseDate={parseDate} />
  )
  fireEvent.change(getByLabelText('datepicker'), {
    target: { value: '01.01.2010' },
  })
  expect(parseDate).toHaveBeenCalledTimes(1)
  expect(parseDate).toHaveBeenLastCalledWith('01.01.2010')
})
