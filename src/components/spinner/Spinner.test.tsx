import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import Spinner from './Spinner'

afterEach(cleanup)

it('should render', () => {
  const { getByTestId } = render(
    <Spinner data-testid="spinner" color="red" size={2} sizeUnit="rem" />
  )
  expect(getByTestId('spinner')).toBeInTheDocument()
})
