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
        margin-left: 0.4rem;
        color: ${colors.red300};
      `}
    >
      {children}
    </span>
  )
}

export default ErrorMessage
