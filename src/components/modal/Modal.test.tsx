import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent, flushEffects } from 'react-testing-library'
import Modal from './Modal'

afterEach(cleanup)

it('should be visible', () => {
  const { getByTestId } = render(
    <Modal open={true} onClose={jest.fn()} data-testid="modal">
      <Modal.Header>Header</Modal.Header>
      <Modal.Content>Modal</Modal.Content>
    </Modal>
  )
  expect(getByTestId('modal')).toBeVisible()
})

it('should be hidden', () => {
  const { getByTestId } = render(
    <Modal open={false} onClose={jest.fn()} data-testid="modal">
      <Modal.Header>Header</Modal.Header>
      <Modal.Content>Modal</Modal.Content>
    </Modal>
  )
  expect(getByTestId('modal')).not.toBeVisible()
})

it('should be hidden when clicking the backdrop', () => {
  let open = true
  const toggle = jest.fn(() => (open = !open))
  const { getByTestId, rerender } = render(
    <Modal open={open} onClose={toggle} data-testid="modal">
      <Modal.Header>Header</Modal.Header>
      <Modal.Content>Modal</Modal.Content>
    </Modal>
  )
  const modal = getByTestId('modal')
  expect(modal).toBeVisible()
  fireEvent.click(modal.parentElement ? modal.parentElement : modal)
  expect(toggle).toBeCalledTimes(1)
  rerender(
    <Modal open={open} onClose={toggle} data-testid="modal">
      <Modal.Header>Header</Modal.Header>
      <Modal.Content>Modal</Modal.Content>
    </Modal>
  )
  expect(modal).not.toBeVisible()
})

it('should be hidden when clicking the close button', () => {
  let open = true
  const toggle = jest.fn(() => (open = !open))
  const { getByTestId, rerender, getByTitle } = render(
    <Modal open={open} onClose={toggle} data-testid="modal">
      <Modal.Header>Header</Modal.Header>
      <Modal.Content>Modal</Modal.Content>
    </Modal>
  )
  const modal = getByTestId('modal')
  expect(modal).toBeVisible()
  fireEvent.click(getByTitle('close'))
  expect(toggle).toBeCalledTimes(1)
  rerender(
    <Modal open={open} onClose={toggle} data-testid="modal">
      <Modal.Header>Header</Modal.Header>
      <Modal.Content>Modal</Modal.Content>
    </Modal>
  )
  expect(modal).not.toBeVisible()
})

it('should be hidden on esc keydown', () => {
  let open = true
  const toggle = jest.fn(() => (open = !open))
  const { getByTestId, rerender } = render(
    <Modal open={open} onClose={toggle} data-testid="modal">
      <Modal.Header>Header</Modal.Header>
      <Modal.Content>Modal</Modal.Content>
    </Modal>
  )
  const modal = getByTestId('modal')
  expect(modal).toBeVisible()
  flushEffects()
  fireEvent.keyDown(modal, { keyCode: 27, which: 27 })
  expect(toggle).toBeCalledTimes(1)
  rerender(
    <Modal open={open} onClose={toggle} data-testid="modal">
      <Modal.Header>Header</Modal.Header>
      <Modal.Content>Modal</Modal.Content>
    </Modal>
  )
  expect(modal).not.toBeVisible()
})

it('should append the passed className', () => {
  const { getByTestId } = render(
    <Modal
      open={true}
      onClose={() => {}}
      data-testid="modal"
      className="custom-modal"
    >
      <Modal.Header data-testid="modal-header" className="custom-modalHeader">
        Header
      </Modal.Header>
      <Modal.Content
        data-testid="modal-content"
        className="custom-modalContent"
      >
        Modal
      </Modal.Content>
      <Modal.Footer data-testid="modal-footer" className="custom-modalFooter">
        Footer
      </Modal.Footer>
    </Modal>
  )
  expect(getByTestId('modal')).toHaveClass('custom-modal')
  expect(getByTestId('modal-header')).toHaveClass('custom-modalHeader')
  expect(getByTestId('modal-content')).toHaveClass('custom-modalContent')
  expect(getByTestId('modal-footer')).toHaveClass('custom-modalFooter')
})
