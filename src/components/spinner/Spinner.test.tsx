import { cleanup, render } from '@testing-library/react'
import 'jest-dom/extend-expect'
import React from 'react'
import { Spinner } from './Spinner'

afterEach(cleanup)

it('should render', () => {
  const { getByTestId } = render(
    <Spinner data-testid="spinner" color="red" size={2} sizeUnit="rem" />
  )
  expect(getByTestId('spinner')).toBeInTheDocument()
})
