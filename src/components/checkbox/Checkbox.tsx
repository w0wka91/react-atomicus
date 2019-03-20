import React, { useState } from 'react'
import generateId from '../../utils/generateId'
import { css } from 'emotion'
import { colors } from '../../utils/colors'
import { insetShadows } from '../../utils/shadows'
import { borders } from '../../utils/borders'

interface Props {
  label: string
}

function Checkbox({
  label,
  ...rest
}: Props & React.HTMLProps<HTMLInputElement>) {
  const [id] = useState(generateId(label))
  return (
    <div
      className={css`
        position: relative;
      `}
    >
      <input
        type="checkbox"
        id={id}
        className={css`
          position: absolute;
          opacity: 0;

          &:disabled + label {
            cursor: auto;
          }

          &:disabled + label::before {
            box-shadow: none;
            background: ${colors.grey100};
          }

          &:checked + label:after {
            content: '';
            position: absolute;
            display: inline-block;
            width: 0.4rem;
            height: 1rem;
            left: 0.8rem;
            top: 1rem;
            border: solid #ffffff;
            border-width: 0 1px 1px 0;
            transform: rotate(45deg);
          }

          &:checked + label:before {
            background: ${colors.blue500};
          }
        `}
        {...rest}
      />
      <label
        htmlFor={id}
        className={css`
          cursor: pointer;
          color: inherit;
          font-family: inherit;

          &::before {
            content: '';
            margin-right: 1.2rem;
            vertical-align: middle;
            border-radius: ${borders.radius};
            display: inline-block;
            width: 2rem;
            height: 2rem;
            border: 1px solid ${colors.grey300};
            transition: all 0.2s linear;
          }
        `}
      >
        <span
          className={css`
            position: absolute;
            top: 0.1rem;
          `}
        >
          {label}
        </span>
      </label>
    </div>
  )
}

export default Checkbox
