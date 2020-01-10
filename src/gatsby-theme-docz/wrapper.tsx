import React from 'react'
import { injectGlobal, css } from 'emotion'
import { normalize } from 'polished'

const globalStyle = [
  ...normalize(),
  `
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  html {
    box-sizing: border-boax;
    font-size: 62.5%;
  }
  body {
    font-size: 1.6rem;
  }
  `,
]

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
        font-size: 16px;
      `}
    >
      {children}
    </div>
  )
}

export default DoczWrapper
