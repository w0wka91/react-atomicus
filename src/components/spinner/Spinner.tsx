import React from 'react'
import { keyframes, css, cx } from 'emotion'

interface Props {
  size: number
  sizeUnit: string
  color?: string
}

const ballClipRotate = keyframes`
    0% { transform: rotate(0deg); }
    50% { transform: rotate(180deg); }
    100% { transform: rotate(360deg); }
`

function Spinner({
  size,
  sizeUnit,
  color,
  className,
  ...rest
}: Props & React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cx(
        css`
          display: block;
          font-size: ${size + sizeUnit};
          color: ${color ? color : 'currentColor'};
          width: ${size + sizeUnit};
          height: ${size + sizeUnit};
        `,
        className
      )}
      {...rest}
    >
      <div
        className={css`
          display: inline-block;
          float: none;
          border: 0 solid currentColor;
          width: ${size + sizeUnit};
          height: ${size + sizeUnit};
          background: transparent;
          border-width: 2px;
          border-bottom-color: transparent;
          border-radius: 100%;
          animation: ${ballClipRotate} 0.75s linear infinite;
        `}
      />
    </div>
  )
}

export default Spinner
