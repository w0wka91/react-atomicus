import React from 'react'
import { css, cx } from 'emotion'
import { colors } from '../../utils/colors'
import { Icon } from '../icon/Icon'
import { Spinner } from '../spinner/Spinner'
import { shadows } from '../../utils/shadows'
import { borders } from '../../utils/borders'

interface Props {
  size: 'small' | 'medium' | 'large'
  intent: 'primary' | 'success' | 'warning' | 'danger'
  hierarchy: 'primary' | 'secondary' | 'tertiary'
  fluid?: boolean
  loading?: boolean
  children: React.ReactNode
}

function Button({
  size,
  intent,
  hierarchy,
  fluid,
  loading,
  children,
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & Props) {
  const btnSize = {
    small: css`
      padding: 0.4rem 0.8rem;
      font-size: 1.2rem;
    `,
    medium: css`
      padding: 0.8rem 1.6rem;
      font-size: 1.6rem;
    `,
    large: css`
      padding: 1.2rem 2.4rem;
      font-size: 1.8rem;
    `,
  }
  const btnColor = {
    primary:
      hierarchy === 'primary'
        ? colors.blue500
        : hierarchy === 'secondary'
        ? colors.blue100
        : 'transparent',
    success:
      hierarchy === 'primary'
        ? colors.green500
        : hierarchy === 'secondary'
        ? colors.green100
        : 'transparent',
    danger:
      hierarchy === 'primary'
        ? colors.red500
        : hierarchy === 'secondary'
        ? colors.red100
        : 'transparent',
    warning:
      hierarchy === 'primary'
        ? colors.yellow500
        : hierarchy === 'secondary'
        ? colors.yellow100
        : 'transparent',
    hover: {
      primary:
        hierarchy === 'primary'
          ? colors.blue600
          : hierarchy === 'secondary'
          ? colors.blue200
          : 'transparent',
      success:
        hierarchy === 'primary'
          ? colors.green600
          : hierarchy === 'secondary'
          ? colors.green200
          : 'transparent',
      danger:
        hierarchy === 'primary'
          ? colors.red600
          : hierarchy === 'secondary'
          ? colors.red200
          : 'transparent',
      warning:
        hierarchy === 'primary'
          ? colors.yellow600
          : hierarchy === 'secondary'
          ? colors.yellow200
          : 'transparent',
    },
    active: {
      primary:
        hierarchy === 'primary'
          ? colors.blue700
          : hierarchy === 'secondary'
          ? colors.blue300
          : 'transparent',
      success:
        hierarchy === 'primary'
          ? colors.green700
          : hierarchy === 'secondary'
          ? colors.blue300
          : 'transparent',
      danger:
        hierarchy === 'primary'
          ? colors.red700
          : hierarchy === 'secondary'
          ? colors.red300
          : 'transparent',
      warning:
        hierarchy === 'primary'
          ? colors.yellow600
          : hierarchy === 'secondary'
          ? colors.yellow200
          : 'transparent',
    },
  }
  const fontColor = {
    primary: colors.blue500,
    success: colors.green500,
    danger: colors.red500,
    warning: colors.yellow600,
  }
  return (
    <button
      className={cx(
        css`
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        border: none;
        cursor: pointer;
        border-radius: ${borders.radius};
        transition: all 0.2s;
        box-shadow: ${hierarchy === 'primary' && shadows[0]};
        &:disabled {
          cursor: default;
          opacity: 0.45;
        }
        background-color: ${btnColor[intent]};
        &:hover:enabled {
          background-color: ${btnColor.hover[intent]};
          text-decoration: ${hierarchy === 'tertiary' && 'underline'};
        }
        &:focus:enabled {
          box-shadow: 0 0 0 1px ${colors.blue200};
        }
        &:active:enabled,
        &:target:enabled {
          transform: scale(0.99);
        }
        *:not(:last-child) {
          margin-right: .4rem;
        }
        ${btnSize[size]}
        color: ${hierarchy === 'primary' ? '#FFFFFF' : fontColor[intent]};
        width: ${fluid && '100%'};
      `,
        className
      )}
      disabled={loading}
      {...rest}
    >
      {loading && (
        <Spinner
          size={1}
          sizeUnit="em"
          className={css`
            margin-right: 0.8rem;
          `}
        />
      )}
      {children}
    </button>
  )
}

interface ButtonIconProps {
  name: string
}

Button.Icon = ({ name }: ButtonIconProps) => (
  <Icon
    size="1em"
    name={name}
    className={css`
      stroke-width: 3px;
    `}
  />
)

Button.defaultProps = {
  size: 'medium',
  intent: 'primary',
  hierarchy: 'primary',
}

export { Button }
