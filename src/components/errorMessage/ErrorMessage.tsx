import React from 'react'
import { css } from 'emotion'
import { colors } from '../../utils/colors'

interface Props {
  children: React.ReactNode
}

function ErrorMessage({ children }: Props) {
  return (
    <span
      className={css`
        display: inline-block;
        font-size: 1.2rem;
        margin-top: 0.1rem;
        color: ${colors.red700};
      `}
    >
      {children}
    </span>
  )
}

export default ErrorMessage
