import React from 'react'
import { injectGlobal, css } from 'emotion'
import globalStyle from './utils/globalStyle'

injectGlobal(globalStyle)

interface Props {
  children: React.ReactNode
}

function DoczWrapper({ children }: Props) {
  return (
    <div
      className={css`
        @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,600');
        font-family: 'Open Sans';
        font-size: 1.4rem;
      `}
    >
      {children}
    </div>
  )
}

export default DoczWrapper
