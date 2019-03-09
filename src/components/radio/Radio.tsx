import React, { useState } from 'react'
import generateId from '../../utils/generateId'
import { css } from 'emotion'
import { colors } from '../../utils/colors'

interface Props {
  label: string
}

function Radio({ label, ...rest }: Props & React.HTMLProps<HTMLInputElement>) {
  const [id] = useState(generateId(label))

  return (
    <>
      <input
        type="radio"
        className={css`
          display: none;

          &:checked + label > span::after {
            opacity: 1;
          }
        `}
        id={id}
        {...rest}
      />
      <label
        htmlFor={id}
        className={css`
          display: flex;
          align-items: center;
          font-size: inherit;
          cursor: pointer;
          position: relative;
          padding-left: 2.4rem;
        `}
      >
        <span
          className={css`
            height: 1.6rem;
            width: 1.6rem;
            border: 2px solid ${colors.blue500};
            border-radius: 50%;
            display: inline-block;
            position: absolute;
            left: 0;

            &::after {
              content: '';
              display: block;
              height: 0.8rem;
              width: 0.8rem;
              border-radius: 50%;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background-color: ${colors.blue500};
              opacity: 0;
              transition: opacity 0.2s;
            }
          `}
        />
        <span>{label}</span>
      </label>
    </>
  )
}

export default Radio
