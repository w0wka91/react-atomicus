import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { Calendar } from './Calendar'

afterEach(cleanup)

it('should render', () => {
  const { getByTestId, getByTitle } = render(
    <Calendar data-testid="calendar" />
  )
  expect(getByTestId('calendar')).toBeInTheDocument()
  expect(getByTitle('Next month')).toBeInTheDocument()
  expect(getByTitle('Previous month')).toBeInTheDocument()
})

it('should render the appropriate month', () => {
  const initialDate = new Date(1990, 10)
  const dateInMonth = new Date(1990, 10, 2)
  const { getByTitle } = render(
    <Calendar locale="en-US" initDate={initialDate} />
  )
  expect(
    getByTitle(dateInMonth.toLocaleDateString('en-US'))
  ).toBeInTheDocument()
})

it('should switch the next month', () => {
  const initialDate = new Date(1990, 10)
  const dateInNextMonth = new Date(1990, 11, 12)

  const { getByTitle } = render(
    <Calendar locale="en-US" initDate={initialDate} />
  )
  fireEvent.click(getByTitle('Next month'))
  expect(
    getByTitle(dateInNextMonth.toLocaleDateString('en-US'))
  ).toBeInTheDocument()
})

it('should switch the previous month', () => {
  const initialDate = new Date(1990, 10)
  const dateInPrevMonth = new Date(1990, 9, 12)

  const { getByTitle } = render(
    <Calendar locale="en-US" initDate={initialDate} />
  )
  fireEvent.click(getByTitle('Previous month'))
  expect(
    getByTitle(dateInPrevMonth.toLocaleDateString('en-US'))
  ).toBeInTheDocument()
})

it('should execute passed function on select', () => {
  const initialDate = new Date(1990, 10)
  const dateInMonth = new Date(1990, 10, 2)
  const onSelect = jest.fn()
  const { getByTitle } = render(
    <Calendar locale="en-US" initDate={initialDate} onSelect={onSelect} />
  )
  fireEvent.click(getByTitle(dateInMonth.toLocaleDateString('en-US')))
  fireEvent.click(getByTitle(dateInMonth.toLocaleDateString('en-US')))
  expect(onSelect).toHaveBeenCalledTimes(2)
  expect(onSelect).toBeCalledWith(dateInMonth)
})

it('shouldnt execute the passed function if date selection is before/after the defined min/max date', () => {
  const initialDate = new Date(1990, 10)
  const minDate = new Date(1990, 10, 10)
  const maxDate = new Date(1990, 10, 20)
  const onSelect = jest.fn()
  const { getByTitle } = render(
    <Calendar
      locale="en-US"
      initDate={initialDate}
      minDate={minDate}
      maxDate={maxDate}
      onSelect={onSelect}
    />
  )
  fireEvent.click(getByTitle(new Date(1990, 10, 2).toLocaleDateString('en-US')))
  fireEvent.click(
    getByTitle(new Date(1990, 10, 22).toLocaleDateString('en-US'))
  )
  expect(onSelect).not.toBeCalled()
})
