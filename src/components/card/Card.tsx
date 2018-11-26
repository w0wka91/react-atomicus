import React from 'react'
import { css, cx } from 'emotion'
import { borders } from '../../utils/borders'
import { shadows } from '../../utils/shadows'

interface Props {
  children: React.ReactNode
}
function Card({
  children,
  className,
  ...rest
}: Props & React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cx(
        css`
          border-radius: ${borders.radius};
          border: ${borders.default()};
          min-width: 30rem;
          overflow: hidden;
          box-shadow: ${shadows.light};
        `,
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export default Card
