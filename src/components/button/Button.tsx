import React from 'react'
import { css } from 'emotion'
import { darken } from 'polished'
import { colors } from '../../utils/colors';
import { shadows } from '../../utils/shadows';

interface Props {
  size: 'small' | 'medium' | 'large'
  intent: 'none' | 'primary' | 'success' | 'warning' | 'danger'
  fluid?: boolean
  children: React.ReactNode
}

function Button({
  size,
  intent,
  fluid,
  children,
}: Props & React.HTMLProps<HTMLButtonElement>) {
  const sizes = {
    small: css`
      padding: 0.4rem 0.8rem;
      font-size: 1.4rem;
    `,
    medium: css`
      padding: 0.8rem 1.2rem;
      font-size: 1.6rem;
    `,
    large: css`
      padding: 1.2rem 1.6rem;
      font-size: 1.8rem;
    `,
  }
  return (
    <button
      className={css`
        border: none;
        box-shadow: ${shadows.inset};
        cursor: pointer;
        border-radius: 2px;
        transition: all 0.2s;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        &:disabled {
          cursor: default;
          opacity: 0.45;
        }
        background-color: ${colors[intent]};
        &:hover:enabled,
        &:focus:enabled {
          background-color: ${darken(0.05, colors[intent])};
        }
        &:active:enabled,
        &:target:enabled {
          background-color: ${darken(0.1, colors[intent])};
        }
        ${sizes[size]}
        color: ${intent !== 'none' && 'white'};
        width: ${fluid && '100%'};
      `}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  size: 'medium',
  intent: 'none',
}

export default Button
