import { keyframes } from '@emotion/core'
import { css } from 'emotion'
import React, { useState, useRef, useEffect } from 'react'
import { borders, colors, shadows, Icon } from '../..'
import { Button } from '../button/Button'

interface Props {
  label: string
  title?: string
  icon?: string
  menuItems: MenuItem[]
  onSelect?: (menuItem: MenuItem) => void
}

interface MenuItem {
  key: string
  label: string
  icon?: string
}

const fadeDown = keyframes`
  from {
    opacity: 0;
    visibility: hidden;
    transform: translate3d(0, -5%, 0);
  }

  to {
    opacity: 1;
    visibility: visible;
    transform: translate3d(0, 0, 0);
  }
`

const fadeUp = keyframes`
  from {
    opacity: 1;
    visibility: visible;
  }

  to {
    opacity: 0;
    visibility: hidden;
    transform: translate3d(0, -5%, 0);
  }
`

function Dropdown({ label, title, icon, menuItems, onSelect }: Props) {
  const [collapsed, setCollapsed] = useState(true)
  const [unfoldedOnce, setUnfoldedOnce] = useState(false)
  useEffect(() => {
    if (!collapsed) {
      setUnfoldedOnce(true)
    }
  }, [collapsed])
  const animation = css`
    animation: ${collapsed ? fadeUp : fadeDown};
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
  `
  const parentContainer = useRef<HTMLDivElement>(null)
  return (
    <>
      <div
        ref={parentContainer}
        onMouseOut={evt => {
          if (
            parentContainer &&
            parentContainer.current &&
            !parentContainer.current.contains(evt.relatedTarget as HTMLElement)
          ) {
            setCollapsed(true)
          }
        }}
        className={css`
          display: inline-block;
          position: relative;
        `}
      >
        <Button
          className={css`
            margin-bottom: 0.8rem;
          `}
          onClick={() => setCollapsed(prevState => !prevState)}
          title={title ? title : label}
        >
          <span>{label}</span>
          {icon && <Button.Icon name={icon} />}
        </Button>
        <div
          className={css`
            position: absolute;
            left: 0;
            min-width: 100%;
            white-space: nowrap;
            width: auto;
            background: #fff;
            z-index: 999;
            border-radius: ${borders.radius};
            border: 1px solid ${colors.grey100};
            box-shadow: ${shadows[0]};
            opacity: 0;
            visibility: hidden;
            ${unfoldedOnce && animation}
          `}
        >
          <ul
            className={css`
              list-style: none;
              padding: 0;
              margin: 0;
              color: ${colors.grey700};
            `}
          >
            {menuItems.map(item => (
              <li key={item.key}>
                <button
                  title={item.label}
                  onClick={() => {
                    if (onSelect) {
                      onSelect(item)
                    }
                    setCollapsed(true)
                  }}
                  className={css`
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    padding: 0.8rem 1.2rem;
                    font-size: 1.6rem;
                    border: none;
                    width: 100%;
                    color: ${colors.grey800};
                    background: transparent;
                    &:hover {
                      background: ${colors.blue100};
                    }
                    &:focus {
                      outline: none;
                    }
                  `}
                >
                  {item.icon && (
                    <Icon
                      color={colors.grey700}
                      name={item.icon}
                      className={css`
                        margin-right: 1.2rem;
                      `}
                    />
                  )}
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export { Dropdown }
