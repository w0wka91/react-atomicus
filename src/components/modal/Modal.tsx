import React, { createContext, useEffect, useContext } from 'react'
import { css, cx } from 'emotion'
import { shadows } from '../../utils/shadows'
import { borders } from '../../utils/borders'
import { colors } from '../../utils/colors'

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
  const escFunc = (ev: KeyboardEvent) => {
    if (ev.keyCode === 27) onClose()
  }
  useEffect(() => {
    if (open) document.addEventListener('keydown', escFunc, false)
    return () => document.removeEventListener('keydown', escFunc, false)
  }, [open])
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
          transition: all 0.3s;
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
              opacity: ${open ? 1 : 0};
              transform: ${open ? 'scale(1)' : 'scale(.5)'};
              visibility: ${open ? 'visible' : 'hidden'};
              transition: all 0.3s;
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
          justify-content: center;
          border-radius: ${borders.radius};
          align-items: center;
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
          font-size: 2rem;
        `}
      >
        {children}
      </span>
      <a
        className={css`
          cursor: pointer;
          color: #000;
          font-size: 3rem;
          text-decoration: none;
          border-radius: ${borders.radius};
          display: inline-block;
          line-height: 1;
          margin-left: auto;
        `}
        onClick={modalContext.onClose}
        title="close"
      >
        &times;
      </a>
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
