import React from 'react'
import { keyframes, css } from 'emotion'

interface Props {
  size: number
  sizeUnit: string
  color?: string
}

const bounceDelay = keyframes`
  0%, 80%, 100% { transform: scale(0) }
  40% { transform: scale(1.0) }
`

function BouncingSpinner({ size, sizeUnit, color }: Props) {
  const baseStyle = css`
    width: ${size + sizeUnit};
    height: ${size + sizeUnit};
    background-color: ${color ? color : 'currentColor'};
    border-radius: 100%;
    display: inline-block;
    animation: ${bounceDelay} 1.4s infinite ease-in-out both;
  `
  return (
    <>
      <div
        className={css`
          ${baseStyle}
          animation-delay: -0.32s;
        `}
      />
      <div
        className={css`
          ${baseStyle}
          animation-delay: -0.16s;
        `}
      />
      <div
        className={css`
          ${baseStyle}
        `}
      />
    </>
  )
}

export default BouncingSpinner
