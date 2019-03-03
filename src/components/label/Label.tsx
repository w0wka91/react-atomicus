import React, { LabelHTMLAttributes } from 'react'
import { css } from 'emotion'
import { colors } from '../../utils/colors'

interface Props {
  required?: boolean
  children: React.ReactNode
}

function Label({
  required,
  children,
  ...rest
}: Props & React.HTMLProps<HTMLLabelElement>) {
  return (
    <label
      className={css`
        display: inline-block;
        margin-left: 0.4rem;
        font-size: 1.4rem;
        font-weight: 600;
        margin-bottom: 0.1rem;
        color: ${colors.grey400};
      `}
      {...rest}
    >
      {children}
    </label>
  )
}

export default Label
