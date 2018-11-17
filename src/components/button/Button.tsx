import React from 'react'
import { css } from 'emotion'
import { colors } from '../../colors'
import { darken } from 'polished'

interface Props {
  size: 'small' | 'medium' | 'large'
  intent: 'none' | 'primary' | 'success' | 'warning' | 'danger'
  fluid?: boolean
  children: React.ReactNode
}

function Button({ size, intent, fluid, children }: Props & React.HTMLProps<HTMLButtonElement>) {
  const padding = {
    small: '0.4rem 0.8rem',
    medium: '0.8rem 1.2rem',
    large: '1.2rem 1.6rem',
  }
  return (
    <button
      className={css`
        border: none;
        box-shadow: var(--shadow-light);
        cursor: pointer;
        border-radius: 2px;
        transition: all 0.2s;
        font-weight: inherit;
        font-family: inherit;
        font-size: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
        &:disabled {
          cursor: default;
          opacity: 0.45;
        }
        padding: ${padding[size]};
        background-color: ${colors[intent]};
        &:hover:enabled,
        &:focus:enabled {
          background-color: ${darken(0.1, colors[intent])};
        }
        &:active:enabled,
        &:target:enabled {
          background-color: ${darken(0.2, colors[intent])};
        }
        color: ${intent !== 'none' && 'white'};
        width: ${fluid && '100%'}
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
