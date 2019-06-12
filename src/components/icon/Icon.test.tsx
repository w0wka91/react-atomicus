import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Icon from './Icon'

afterEach(cleanup)

it('should render', () => {
  const { getByTestId } = render(
    <Icon data-testid="icon" name="at-sign" color="red" fill="yellow" />
  )
  expect(getByTestId('icon')).toBeInTheDocument()
})
