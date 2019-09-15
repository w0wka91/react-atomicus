import { css, cx } from 'emotion'
import React, { createContext, useContext, useEffect } from 'react'
import { zoomIn, zoomOut } from '../../utils/animations'
import { borders } from '../../utils/borders'
import { colors } from '../../utils/colors'
import { shadows } from '../../utils/shadows'

interface Props {
  open: boolean
  onClose: () => void
  children?: React.ReactNode
}

const ModalContext = createContext({
  onClose: () => {},
})

function Modal({
  open,
  onClose,
  children,
  className,
  ...rest
}: Props & React.HTMLProps<HTMLDivElement>) {
  useEffect(() => {
    const escFunc = (ev: KeyboardEvent) => {
      if (ev.keyCode === 27) onClose()
    }
    if (open) document.addEventListener('keydown', escFunc, false)
    return () => document.removeEventListener('keydown', escFunc, false)
  }, [open, onClose])
  const animation = css`
    animation: ${open ? zoomIn : zoomOut};
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
  `
  return (
    <ModalContext.Provider value={{ onClose }}>
      <div
        onClick={onClose}
        className={css`
          position: fixed;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          z-index: 2000;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: ${open ? '1' : '0'};
          visibility: ${open ? 'visible' : 'hidden'};
        `}
      >
        <div
          onClick={e => e.stopPropagation()}
          className={cx(
            css`
              max-height: 95vh;
              max-width: 70vw;
              background-color: #fff;
              display: flex;
              flex-direction: column;
              min-width: 32rem;
              border-radius: ${borders.radius};
              box-shadow: ${shadows[4]};
              opacity: 1;
              z-index: 3000;
              ${animation}
            `,
            className
          )}
          {...rest}
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  )
}

Modal.Header = ({
  children,
  className,
  ...rest
}: React.HTMLProps<HTMLDivElement>) => {
  const modalContext = useContext(ModalContext)
  return (
    <div
      className={cx(
        css`
          display: flex;
          justify-content: baseline;
          border-radius: ${borders.radius};
          align-items: baseline;
          padding: 1.8rem;
          flex-shrink: 0;
          width: 100%;
          background: ${colors.grey100};
        `,
        className
      )}
      {...rest}
    >
      <span
        className={css`
          font-size: 1.8rem;
          font-weight: 600;
        `}
      >
        {children}
      </span>
      <button
        className={css`
          cursor: pointer;
          color: #000;
          font-size: 3rem;
          text-decoration: none;
          border-radius: ${borders.radius};
          display: inline-block;
          line-height: 1;
          margin-left: auto;
          border: none;
          background: transparent;
          &:focus {
            outline: none;
            border-color: ${colors.blue300};
          }
        `}
        onClick={() => {
          modalContext.onClose()
        }}
        title="close"
      >
        &times;
      </button>
    </div>
  )
}

Modal.Content = ({
  children,
  className,
  ...rest
}: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div
      className={cx(
        css`
          padding: 1.8rem;
          overflow: auto;
        `,
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

Modal.Footer = ({
  children,
  className,
  ...rest
}: React.HTMLProps<HTMLDivElement>) => (
  <div
    className={cx(
      css`
        display: flex;
        justify-content: flex-end;
        padding: 1.8rem;
        width: 100%;
        border-top: 1px solid ${colors.grey100};
      `,
      className
    )}
    {...rest}
  >
    {children}
  </div>
)

Modal.defaultProps = {
  open: false,
}

export { Modal }
