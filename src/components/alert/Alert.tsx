import React from 'react'
import { css } from 'emotion'
import { colors } from '../../utils/colors'
import { borders } from '../../utils/borders'

interface Props {
  title?: string
  intent: 'primary' | 'success' | 'warning' | 'danger'
  children?: React.ReactNode
}

function Alert({
  title,
  intent,
  children,
  ...rest
}: Props & React.HTMLProps<HTMLDivElement>) {
  const alertColors = {
    primary: {
      border: colors.blue600,
      background: colors.blue200,
      color: colors.blue900,
    },
    success: {
      border: colors.green600,
      background: colors.green200,
      color: colors.green900,
    },
    warning: {
      border: colors.yellow600,
      background: colors.yellow200,
      color: colors.yellow900,
    },
    danger: {
      border: colors.red600,
      background: colors.red200,
      color: colors.red900,
    },
  }
  return (
    <div
      className={css`
        font-size: 1.4rem;
        display: flex;
        flex-direction: column;
        border-radius: ${borders.radius};
        color: ${alertColors[intent].color};
        background-color: ${alertColors[intent].background};
        border-left: 4px solid ${alertColors[intent].border};
        padding: 1.6rem 2.4rem;
      `}
      {...rest}
    >
      <span
        className={css`
          font-size: 1.8rem;
          color: ${alertColors[intent].border};
          font-weight: 600;
        `}
      >
        {title}
      </span>
      {children}
    </div>
  )
}

export default Alert
