import React from 'react'
import { css, cx } from 'emotion'
import { colors } from '../../utils/colors'

interface Props {
  selected: boolean
  disabled: boolean
  title: string
  children: React.ReactNode
  onClick: () => void
}

function Day({
  onClick,
  selected,
  disabled,
  title,
  children,
  className,
  ...rest
}: Props & React.HTMLProps<HTMLAnchorElement>) {
  return (
    <a
      title={title}
      onClick={disabled ? undefined : onClick}
      className={cx(
        css`
          text-decoration: none;
          display: flex;
          user-select: none;
          justify-content: center;
          align-items: center;
          width: 3.2rem;
          height: 3.2rem;
          cursor: ${disabled ? 'default' : 'pointer'};
          background-color: ${selected ? colors.blue400 : '#fff'};
          color: ${selected ? '#fff' : disabled ? colors.grey200 : 'inherit'};
          transition: all 0.2s;
          &:hover {
            background-color: ${selected
              ? colors.blue400
              : disabled
              ? 'inherit'
              : colors.grey100};
          }
          &:active {
            transform: scale(0.9);
          }
        `,
        className
      )}
      {...rest}
    >
      {children}
    </a>
  )
}

Day.defaultProps = {
  selected: false,
  disabled: false,
}

export { Day }
