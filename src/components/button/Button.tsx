import React from 'react'
import { css, cx } from 'emotion'
import { colors } from '../../utils/colors'
import Icon from '../icon/Icon'
import Spinner from '../spinner/Spinner'
import { shadows } from '../../utils/shadows'

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
}: Props & React.HTMLProps<HTMLButtonElement>) {
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
      warning: colors.yellow600,
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
          ? colors.yellow700
          : hierarchy === 'secondary'
          ? colors.yellow300
          : 'transparent',
    },
  }
  const btnBorderColor = {
    primary: colors.blue600,
    success: colors.green700,
    danger: colors.red700,
    warning: colors.yellow700,
  }
  const fontColor = {
    primary: colors.blue500,
    success: colors.green500,
    danger: colors.red500,
    warning: colors.yellow500,
  }
  return (
    <button
      className={cx(
        css`
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        border: 1px solid ${
          hierarchy === 'primary' ? btnBorderColor[intent] : 'transparent'
        };
        cursor: pointer;
        border-radius: 3px;
        transition: all 0.2s;
        box-shadow: ${hierarchy === 'primary' && shadows.light};
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
          outline: none;
        }
        &:active:enabled,
        &:target:enabled {
          border-color: ${btnColor.active[intent]};
          outline: transparent;
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

export default Button
