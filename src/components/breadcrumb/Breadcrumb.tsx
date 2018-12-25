import React from 'react'
import { css, cx } from 'emotion'
import { colors } from '../../utils/colors'
import { darken } from 'polished'
import Icon, { Props as IconProps } from '../icon/Icon'

interface Props {
  seperator: string
  children?: React.ReactNode
}

function Breadcrumb({
  seperator,
  children,
  ...rest
}: Props & React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={css`
        display: flex;
        align-items: center;  
        justify-content: center;
        font-size: 1.6rem;
        & > *:not(:last-child) {
          color: ${darken(0.3, colors.default)};
          &::after {
            content: '${seperator}';
            padding: 0 0.8rem;
          }
          a,
          a:visited,
          a:active {
            color: inherit;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.2s;
          }
          a:hover {
            color: ${colors.primary};
          }
        }
        & > *:last-child {
          a {
            text-decoration: none;
            color: inherit;
            cursor: default;
            pointer-events: none;
          }
        }
      `}
      {...rest}
    >
      {children}
    </div>
  )
}

Breadcrumb.Item = ({ children, ...rest }: React.HTMLProps<HTMLDivElement>) => (
  <div
    className={css`
      display: flex;
      align-items: center;
      text-align: center;
      a {
        display: flex;
        align-items: center;
      }
      *:not(:last-child) {
        margin-right: 0.8rem;
      }
    `}
    {...rest}
  >
    {children}
  </div>
)

Breadcrumb.Icon = (props: IconProps) => <Icon size="1.6rem" {...props} />
Breadcrumb.defaultProps = {
  seperator: '/',
}

export default Breadcrumb
