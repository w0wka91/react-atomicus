import * as React from 'react'
import featherSprite from './feather-sprite.svg'
import { cx, css } from 'emotion'

interface Props {
  name: string
  color?: string
  size?: string
  fill?: string
}

function Icon({
  name,
  color,
  size,
  fill,
  className,
}: React.HTMLProps<SVGElement> & Props) {
  return (
    <svg
      className={cx(
        css`
          width: ${size};
          height: ${size};
          stroke: ${color};
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

Icon.defaultProps = {
  size: '1em',
  color: 'currentColor',
}

export default Icon
