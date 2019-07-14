import React from 'react'
import { css, cx } from 'emotion'
import { borders } from '../../utils/borders'
import { shadows } from '../../utils/shadows'
import { colors } from '../../utils/colors'

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
          border: 1px solid ${colors.grey100};
          min-width: 38.4rem;
          overflow: hidden;
          box-shadow: ${shadows[2]};
          background: #fff;
        `,
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export { Card }
