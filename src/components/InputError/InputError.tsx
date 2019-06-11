import React from 'react'
import { css } from 'emotion'
import { colors } from '../../utils/colors'

interface Props {
  children: React.ReactNode
}
function InputError({ children }: Props) {
  return (
    <span
      className={css`
        display: inline-block;
        font-size: 1.2rem;
        font-style: italic;
        color: ${colors.red500};
      `}
    >
      {children}
    </span>
  )
}

export default InputError
