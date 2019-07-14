import { css, cx } from 'emotion'
import React from 'react'
import { colors } from '../../utils/colors'
import { Icon, Props as IconProps } from '../icon/Icon'

interface Props {
  seperator: string
  children?: React.ReactNode
}

function Breadcrumb({
  seperator,
  className,
  children,
  ...rest
}: Props & React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cx(
        css`
        display: flex;
        align-items: center;  
        justify-content: center;
        font-size: 1.4rem;
        color: ${colors.green900};
        & > *:not(:last-child) {
          color: ${colors.grey200};
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
            color: ${colors.grey900};
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
      `,
        className
      )}
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

export { Breadcrumb }
