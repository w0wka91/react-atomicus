import React from 'react'
import { css } from 'emotion'
import { colors } from '../../utils/colors'

interface Props {
  children: React.ReactNode
}
function InputInfo({ children }: Props) {
  return (
    <span
      className={css`
        display: inline-block;
        font-size: 1.2rem;
        color: ${colors.grey600};
      `}
    >
      {children}
    </span>
  )
}

export { InputInfo }
