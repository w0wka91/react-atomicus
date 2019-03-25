import React, { useState } from 'react'
import { css, cx } from 'emotion'
import { colors } from '../../utils/colors'
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
  valid?: boolean
  fluid?: boolean
}

function Input({
  label,
  iconLeft,
  iconRight,
  error,
  valid,
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
  const validationIcon = css`
    position: absolute;
    right: 1rem;
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
            border-radius: ${borders.radius};
            font-family: inherit;
            color: inherit;
            border: 1px solid
              ${error
                ? colors.red500
                : valid
                ? colors.green500
                : colors.grey300};
            width: 100%;
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
      {icon && !error && !valid ? (
        <div className={iconPosition}>
          <Icon size="1.6rem" name={icon} color={colors.grey500} />
        </div>
      ) : null}
      {error || valid ? (
        <div className={validationIcon}>
          {error && (
            <Icon size="1.6rem" name="alert-circle" color={colors.red500} />
          )}
          {valid && (
            <Icon size="1.6rem" name="check-circle" color={colors.green500} />
          )}
        </div>
      ) : null}
      {error && (
        <span
          className={css`
            display: inline-block;
            font-size: 1.2rem;
            font-style: italic;
            color: ${colors.red500};
          `}
        >
          {error}
        </span>
      )}
    </div>
  )
}

export default Input
