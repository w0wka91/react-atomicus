import * as React from 'react'
import featherSprite from './feather-sprite.svg'
import { cx, css } from 'emotion'

interface Props {
  name: string
  color?: string
  size?: number
  fill?: string
}

function Icon({
  name,
  color,
  size,
  fill,
  className,
}: Props & React.HTMLProps<SVGElement>) {
  return (
    <svg
      className={cx(
        css`
          width: ${size ? size : '1em'};
          height: ${size ? size : '1em'};
          stroke: ${color ? color : 'currentColor'};
          stroke-width: 2px;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: ${fill ? fill : 'none'};
        `,
        className
      )}
    >
      <use xlinkHref={`${featherSprite}#${name}`} />
    </svg>
  )
}

export default Icon
