import React from 'react'
import { css } from 'emotion'
import { colors } from '../../utils/colors'

interface Props {
  children?: React.ReactNode
}

function Weekday({
  children,
  ...rest
}: Props & React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={css`
        display: flex;
        justify-content: center;
        font-weight: 500;
        width: 3.2rem;
        height: 3.2rem;
        color: ${colors.grey200};
      `}
      {...rest}
    >
      {children}
    </div>
  )
}

export { Weekday }
