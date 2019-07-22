import React from 'react'
import { css, cx } from 'emotion'
import { colors } from '../../utils/colors'
import { Label } from '../label/Label'
import { Icon } from '../icon/Icon'
import { borders } from '../../utils/borders'
import { useId } from '../../hooks/useId'
import { InputError } from '../InputError/InputError'

type HTMLInputProps = Omit<React.HTMLProps<HTMLInputElement>, 'css'>

interface Props extends HTMLInputProps {
  label?: string
  iconLeft?: string
  iconRight?: string
  error?: string
  valid?: boolean
  fluid?: boolean
}

export const inputBaseStyle = (
  error: string | undefined,
  valid: boolean | undefined
) => css`
  display: block;
  font-size: 1.4rem;
  height: 4.2rem;
  padding: 1.2rem 1.6rem;
  border: 1px solid
    ${error ? colors.red500 : valid ? colors.green500 : colors.grey200};
  border-radius: ${borders.radius};
  font-family: inherit;
  color: inherit;
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
  &::placeholder {
    color: ${colors.grey300};
  }
  transition: all 0.2s linear;
`

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      iconLeft,
      iconRight,
      error,
      valid,
      required,
      fluid,
      className,
      ...rest
    }: Props,
    ref
  ) => {
    const id = useId()
    const icon = iconLeft ? iconLeft : iconRight
    const iconPosition = css`
      position: absolute;
      left: ${iconLeft && '1rem'};
      right: ${iconRight && '1rem'};
      top: ${label ? '3.6rem' : '.8rem'};
    `
    const validationIcon = css`
      position: absolute;
      right: 1rem;
      top: ${label ? '3.7rem' : '1.2rem'};
    `
    return (
      <div
        className={css`
          position: relative;
          width: ${fluid && '100%'};
        `}
      >
        {label && (
          <Label htmlFor={`input-${id}`} required={required}>
            {label}
          </Label>
        )}
        <input
          id={`input-${id}`}
          ref={ref}
          className={cx(
            css`
              ${inputBaseStyle(error, valid)};
              padding-left: ${iconLeft && '3.4rem'};
              padding-right: ${iconRight && '3.5rem'};
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
        {error && <InputError>{error}</InputError>}
      </div>
    )
  }
)

export { Input }
