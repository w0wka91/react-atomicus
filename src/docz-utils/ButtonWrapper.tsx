import React, { PropsWithChildren } from 'react'
import { css } from 'emotion'

function ButtonWrapper({ children }: PropsWithChildren<{}>) {
  return (
    <div
      className={css`
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
      `}
    >
      {children}
    </div>
  )
}

export default ButtonWrapper
