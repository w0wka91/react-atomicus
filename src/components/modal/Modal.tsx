import React, { createContext, useEffect, useContext } from 'react'
import { css } from 'emotion'
import { shadows } from '../../utils/shadows'
import { borders } from '../../utils/borders'
import { colors } from '../../utils/colors'

interface Props {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

const ModalContext = createContext({
  onClose: () => {},
})

function Modal({ open, onClose, children }: Props) {
  useEffect(
    () => {
      if (open) document.addEventListener('keydown', onClose)
      return () => document.removeEventListener('keydown', onClose)
    },
    [open]
  )
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
          className={css`
            background-color: #fff;
            display: flex;
            flex-direction: column;
            min-width: 30rem;
            border-radius: ${borders.radius};
            box-shadow: ${shadows.light};
            overflow: hidden;
            opacity: 1;
            z-index: 3000;
            opacity: ${open ? 1 : 0};
            transform: ${open ? 'scale(1)' : 'scale(.5)'};
            visibility: ${open ? 'visible' : 'hidden'};
            transition: all 0.3s;
          `}
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  )
}

Modal.Header = ({ children }: Pick<Props, 'children'>) => {
  const modalContext = useContext(ModalContext)
  return (
    <div
      className={css`
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2rem;
        width: 100%;
        background: ${colors.default};
      `}
    >
      <span
        className={css`
          font-weight: 600;
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
          display: inline-block;
          line-height: 1;
          margin-left: auto;
        `}
        onClick={modalContext.onClose}
      >
        &times;
      </a>
    </div>
  )
}

Modal.Content = ({ children }: Pick<Props, 'children'>) => (
  <div
    className={css`
      padding: 2rem;
    `}
  >
    {children}
  </div>
)

Modal.defaultProps = {
  open: false,
}
export default Modal
