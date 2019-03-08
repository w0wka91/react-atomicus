import React, { useEffect, useState } from 'react'
import { css, cx } from 'emotion'
import { shadows, insetShadows } from '../../utils/shadows'
import { colors } from '../../utils/colors'
import { transparentize, darken } from 'polished'
import Label from '../label/Label'
import Icon from '../icon/Icon'
import generateId from '../../utils/generateId'
import ErrorMessage from '../errorMessage/ErrorMessage'
import { borders } from '../../utils/borders'

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
            padding: 1.2rem 1.6rem;
            padding-left: ${iconLeft && '3.4rem'};
            padding-right: ${iconRight && '3.5rem'};
            border-radius: 3px;
            font-family: inherit;
            color: inherit;
            border: 1px solid ${colors.grey300};
            width: 100%;
            box-shadow: ${error && '0 0 0 1px ' + colors.red300};
            &:hover,
            &:focus {
              outline: none;
              border-color: ${colors.blue300};
            }
            &:focus {
              box-shadow: 0 0 0 2px ${colors.blue200};
            }
            &:disabled {
              background: transparent;
              border-color: ${colors.grey100};
            }
            transition: all 0.2s linear;
          `,
          className
        )}
        {...rest}
      />
      <div className={iconPosition}>
        {icon && <Icon size="1.6rem" name={icon} color={colors.grey500} />}
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  )
}

export default Input
