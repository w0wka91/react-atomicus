import React, { useEffect, useState } from 'react'
import { css, cx } from 'emotion'
import { shadows } from '../../utils/shadows'
import { colors } from '../../utils/colors'
import { transparentize, darken } from 'polished'
import Label from '../label/Label'
import Icon from '../icon/Icon'
import generateId from '../../utils/generateId'
import ErrorMessage from '../errorMessage/ErrorMessage'

interface Props {
  label?: string
  iconLeft?: string
  iconRight?: string
  error?: string
  fluid?: boolean
}

function Input({
  label,
  iconLeft,
  iconRight,
  error,
  required,
  fluid,
  className,
  ...rest
}: Props & React.HTMLProps<HTMLInputElement>) {
  const [id] = useState(generateId(label))
  const icon = iconLeft ? iconLeft : iconRight
  const iconPosition = css`
    position: absolute;
    left: ${iconLeft && '1rem'};
    right: ${iconRight && '1rem'};
    top: ${label ? '3.1rem' : '.7rem'};
    margin-right: ${icon && '1rem'};
  `
  return (
    <div
      className={css`
        display: flex;
        position: relative;
        flex-direction: column;
        align-items: flex-start;
        width: ${fluid && '100%'};
      `}
    >
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      <input
        id={id}
        className={cx(
          css`
            display: block;
            font-size: 1.4rem;
            padding: 1.1rem 1.5rem;
            padding-left: ${iconLeft && '3.5rem'};
            padding-right: ${iconRight && '3.5rem'};
            border-radius: 3px;
            font-family: inherit;
            width: 100%;
            color: inherit;
            box-shadow: ${shadows.inset};
            border: 1px solid
              ${error ? colors.danger : darken(0.1, colors.default)};
            &:focus {
              outline: none;
              border-color: ${transparentize(0.4, colors.primary)};
            }
            &:disabled {
              background: transparent;
              border-color: ${transparentize(0.9, colors.primary)};
            }
          `,
          className
        )}
        {...rest}
      />
      <div className={iconPosition}>
        {icon && (
          <Icon size="1.6rem" name={icon} color={darken(0.3, colors.default)} />
        )}
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  )
}

export default Input
