import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import { Alert } from './Alert'

afterEach(cleanup)

it('should render', () => {
  const { getByTestId } = render(
    <Alert data-testid="primary-alert" title="alert-title" intent="primary">
      Content
    </Alert>
  )
  expect(getByTestId('primary-alert')).toBeInTheDocument()
})

it('should append the passed className', () => {
  const { getByTestId } = render(
    <Alert
      data-testid="primary-alert"
      className="customized-alert"
      title="alert-title"
      intent="primary"
    >
      Content
    </Alert>
  )
  expect(getByTestId('primary-alert')).toHaveClass('customized-alert')
})
