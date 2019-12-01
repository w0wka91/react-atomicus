import React, { useState } from 'react'
import { css } from 'emotion'
import { colors } from '../../utils/colors'
import { useId } from '../../hooks/useId'

interface Props {
  label?: string
}

function Toggle({
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
        id={`toggle-${id}`}
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
        htmlFor={`toggle-${id}`}
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
            position: relative;
            width: 4.8rem;
            height: 2.4rem;
            margin-right: ${label && '1.2rem'};
            border-radius: 256px;
            border: 1px solid ${checked ? colors.blue500 : colors.grey400};
            box-shadow: ${focus && `0 0 0 2px ${colors.blue300}`};
            background: ${disabled && colors.grey100};
          `}
        >
          <div
            className={css`
              position: absolute;
              top: 50%;
              transform: translateY(-50%) ${checked && 'translateX(150%)'};
              border-radius: 100%;
              width: 1.6rem;
              height: 1.6rem;
              background: ${checked ? colors.blue500 : colors.grey300};
              margin: 0 3px;
              transition: all 0.2s linear;
            `}
          />
        </div>
        {label}
      </label>
    </div>
  )
}

export { Toggle }
