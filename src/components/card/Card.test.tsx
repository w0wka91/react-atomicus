import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import Card from './Card'

afterEach(cleanup)

it('should append the passed className', () => {
  const { getByTestId } = render(
    <Card data-testid="card" className="custom-card">
      Hello
    </Card>
  )
  expect(getByTestId('card')).toHaveClass('custom-card')
})
