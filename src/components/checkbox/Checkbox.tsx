import React, { useState } from 'react'
import { css } from 'emotion'
import { colors } from '../../utils/colors'
import { borders } from '../../utils/borders'
import { useId } from '../../hooks/useId'
import { Icon } from '../icon/Icon'

interface Props {
  label?: string
}

function Checkbox({
  label,
  value,
  checked,
  disabled,
  onBlur,
  onFocus,
  ...rest
}: Props & React.HTMLProps<HTMLInputElement>) {
  const id = useId()
  const [focus, setFocus] = useState(false)
  return (
    <div
      className={css`
        position: relative;
      `}
    >
      <input
        {...rest}
        type="checkbox"
        id={`checkbox-${id}`}
        checked={checked}
        disabled={disabled}
        className={css`
          position: absolute;
          opacity: 0;

          &:disabled + label {
            cursor: auto;
          }
        `}
        onFocus={evt => {
          setFocus(true)
          if (onFocus) onFocus(evt)
        }}
        onBlur={evt => {
          setFocus(false)
          if (onBlur) onBlur(evt)
        }}
      />
      <label
        htmlFor={`checkbox-${id}`}
        className={css`
          cursor: pointer;
          display: flex;
          flex-direction: row;
          align-items: center;
          color: inherit;
          font-family: inherit;
        `}
      >
        <div
          className={css`
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-right: ${label && '1.2rem'};
            border-radius: ${borders.radius};
            width: 2rem;
            height: 2rem;
            border: 1px solid ${focus ? colors.blue300 : colors.grey300};
            box-shadow: ${focus && `0 0 0 2px ${colors.blue200}`};
            background: ${checked && colors.blue500};
            background: ${disabled && colors.grey100};
            transition: all 0.2s linear;
          `}
        >
          {checked && <Icon size="1.2rem" name="check" color="white" />}
        </div>
        {label}
      </label>
    </div>
  )
}

export { Checkbox }
