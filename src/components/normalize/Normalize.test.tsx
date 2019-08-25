import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import { Normalize } from './Normalize'

afterEach(cleanup)

it('should render', () => {
  render(<Normalize />)
})
