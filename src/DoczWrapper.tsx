import React from 'react'
import { injectGlobal, css } from 'emotion'
import globalStyle from './utils/globalStyle'
import { fontSizes } from './utils/fontSizes'

injectGlobal(globalStyle)

interface Props {
  children: React.ReactNode
}

function DoczWrapper({ children }: Props) {
  return (
    <div
      className={css`
        @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600');
        font-family: 'Open Sans';
        font-size: ${fontSizes[3]};
      `}
    >
      {children}
    </div>
  )
}

export { DoczWrapper }
