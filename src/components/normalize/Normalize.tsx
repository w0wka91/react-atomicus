import React from 'react'
import { Global, css } from '@emotion/core'

function Normalize() {
  return (
    <Global
      styles={css`
        *,
        *::after,
        *::before {
          margin: 0;
          padding: 0;
          box-sizing: inherit;
        }

        html {
          font-size: 62.5%;
        }

        body {
          font-size: 1.6rem;
          box-sizing: border-box;
        }
      `}
    />
  )
}

export default Normalize
