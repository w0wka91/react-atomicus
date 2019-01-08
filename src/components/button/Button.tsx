import React from 'react'
import { css, cx } from 'emotion'
import { darken, transparentize } from 'polished'
import { colors } from '../../utils/colors'
import { borders } from '../../utils/borders'
import Icon from '../icon/Icon'
import Spinner from '../spinner/Spinner'

interface Props {
  size: 'small' | 'medium' | 'large'
  intent?: 'primary' | 'success' | 'warning' | 'danger'
  fluid?: boolean
  minimal?: boolean
  loading?: boolean
  children: React.ReactNode
}

function Button({
  size,
  intent,
  fluid,
  minimal,
  loading,
  children,
  className,
  ...rest
}: Props & React.HTMLProps<HTMLButtonElement>) {
  const intentColor = intent ? colors[intent] : colors.default
  const sizes = {
    small: css`
      padding: 0.4rem 0.8rem;
      min-height: 3rem;
      font-size: 1.2rem;
    `,
    medium: css`
      padding: 0.8rem 1.2rem;
      min-height: 4rem;
      font-size: 1.4rem;
    `,
    large: css`
      padding: 1.2rem 1.6rem;
      min-height: 5rem;
      font-size: 1.6rem;
    `,
  }
  const minimalStyle = css`
    color: inherit;
    background-color: transparent;
    &:hover:enabled,
    &:focus:enabled {
      border-color: ${transparentize(0.1, intentColor)};
      background-color: transparent;
    }
    &:active:enabled,
    &:target:enabled {
      border-color: ${intentColor};
      background-color: transparent;
    }
  `
  return (
    <button
      className={cx(
        css`
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        border: ${borders.default(intentColor)};
        cursor: pointer;
        border-radius: ${borders.radius};
        transition: all 0.2s;
        font-weight: 600;
        color: ${darken(0.6, colors.default)};
        &:disabled {
          cursor: default;
          opacity: 0.45;
        }
        background-color: ${intentColor};
        &:hover:enabled,
        &:focus:enabled {
          background-color: ${darken(0.035, intentColor)};
          outline: none;
        }
        &:active:enabled,
        &:target:enabled {
          background-color: ${darken(0.07, intentColor)};
          outline: none;
        }
        *:not(:last-child) {
          margin-right: .5rem;
        }
        ${sizes[size]}
        color: ${intent && 'white'};
        width: ${fluid && '100%'};
        ${minimal && minimalStyle}
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
            margin-right: 1rem;
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
}

export default Button
