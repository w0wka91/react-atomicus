import React, {
  useRef,
  useEffect,
  createContext,
  useContext,
  useReducer,
} from 'react'
import { css } from 'emotion'
import Icon from '../icon/Icon'
import { colors } from '../../utils/colors'
import { borders } from '../..'
import { inputBaseStyle } from '../input/Input'
import Label from '../label/Label'
import { useId } from '../../hooks/useId'
import InputError from '../InputError/InputError'

interface ContextProps {
  dispatch: Dispatch
}

const SelectContext = createContext<ContextProps | undefined>(undefined)

interface Option {
  value: string
  label: string
}

interface SelectProps {
  onChange?: (value: string) => void
  options: Option[]
  label?: string
  error?: string
  value?: string
  required?: boolean
  valid?: boolean
  fluid?: boolean
  onBlur?: (evt: React.FocusEvent) => void
  onFocus?: (evt: React.FocusEvent) => void
}

type Action =
  | { type: 'value-change'; inputValue: string }
  | { type: 'selection-change'; selectedKey: string; inputValue: string }
  | { type: 'unfold' }
  | { type: 'focus' }
  | { type: 'mouse-over' }
  | { type: 'mouse-leave' }
  | { type: 'highlight-option'; index: number }
  | { type: 'collapse' }
type Dispatch = (action: Action) => void
type State = {
  inputValue: string
  selectedKey: string | undefined
  highlightedOption: number
  collapsed: boolean
  focused: boolean
  hovered: boolean
}

function selectReducer(state: State, action: Action) {
  switch (action.type) {
    case 'value-change':
      return {
        ...state,
        focused: true,
        inputValue: action.inputValue,
        collapsed: false,
      }
    case 'selection-change':
      return {
        ...state,
        inputValue: action.inputValue,
        selectedKey: action.selectedKey,
        collapsed: true,
        focused: true,
      }
    case 'focus':
      return { ...state, focused: true }
    case 'mouse-over':
      return { ...state, hovered: true }
    case 'mouse-leave':
      return { ...state, hovered: false }
    case 'highlight-option':
      return { ...state, collapsed: false, highlightedOption: action.index }
    case 'collapse':
      return { ...state, focused: false, collapsed: true, highlightedOption: 0 }
    case 'unfold':
      return { ...state, collapsed: false, focused: true }
    default:
      return { ...state }
  }
}

function Select({
  options,
  onChange,
  label,
  value,
  required,
  error,
  valid,
  fluid,
  onFocus,
  onBlur,
}: SelectProps) {
  const [state, dispatch] = useReducer(selectReducer, {
    inputValue: value ? value : '',
    selectedKey: undefined,
    highlightedOption: 0,
    collapsed: true,
    focused: false,
    hovered: false,
  })
  const inputRef = useRef<HTMLInputElement>(null)
  const id = useId()
  const filteredOptions = options.filter(o =>
    o.label.toLocaleLowerCase().includes(state.inputValue.toLocaleLowerCase())
  )
  useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent) => {
      evt.stopPropagation()
      switch (evt.keyCode) {
        case 40:
          dispatch({
            type: 'highlight-option',
            index:
              state.collapsed ||
              filteredOptions.length - 1 === state.highlightedOption
                ? 0
                : state.highlightedOption + 1,
          })
          break
        case 38:
          dispatch({
            type: 'highlight-option',
            index:
              state.highlightedOption === 0
                ? filteredOptions.length - 1
                : state.highlightedOption - 1,
          })
          break
        case 27:
          if (!state.collapsed) {
            dispatch({
              type: 'collapse',
            })
          } else {
            dispatch({
              type: 'value-change',
              inputValue: '',
            })
          }
          break
        case 13:
          if (!state.collapsed) {
            dispatch({
              type: 'selection-change',
              inputValue: filteredOptions[state.highlightedOption].label,
              selectedKey: filteredOptions[state.highlightedOption].value,
            })
          }
          break
      }
    }
    if (inputRef.current)
      inputRef.current.addEventListener('keydown', handleKeyDown, false)
    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('keydown', handleKeyDown, false)
      }
    }
  }, [state.highlightedOption, state.collapsed])
  useEffect(() => {
    if (!state.collapsed && inputRef.current && state.focused)
      inputRef.current.focus()
  }, [state.collapsed])
  useEffect(() => {
    if (inputRef.current && state.selectedKey) {
      if (onChange) onChange(state.selectedKey)
      inputRef.current.focus()
    }
  }, [state.selectedKey])
  return (
    <div
      className={css`
        width: ${fluid ? '100%' : '25.6rem'};
      `}
    >
      <div
        className={css`
          position: relative;
        `}
      >
        {label && (
          <Label htmlFor={`input-${id}`} required={required}>
            {label}
          </Label>
        )}
        <div
          className={css`
            display: flex;
            border: none;
            ${state.focused && `box-shadow: 0 0 0 2px ${colors.blue200}`};
            border-radius: ${borders.radius};
            transition: all 0.2s linear;
          `}
        >
          <input
            className={css`
              ${inputBaseStyle(error, valid)};
              flex: 1;
              border-top-right-radius: 0px;
              border-bottom-right-radius: 0px;
              border: 1px solid
                ${state.focused || state.hovered
                  ? colors.blue300
                  : error
                  ? colors.red500
                  : valid
                  ? colors.green500
                  : colors.grey200};
              border-right: none;
            `}
            id={`input-${id}`}
            ref={inputRef}
            onFocus={evt => {
              dispatch({ type: 'focus' })
              if (onFocus) onFocus(evt)
            }}
            onMouseOver={() => dispatch({ type: 'mouse-over' })}
            onMouseLeave={() => dispatch({ type: 'mouse-leave' })}
            onBlur={evt => {
              dispatch({ type: 'collapse' })
              if (onBlur) onBlur(evt)
            }}
            onChange={evt =>
              dispatch({
                type: 'value-change',
                inputValue: evt.currentTarget.value,
              })
            }
            value={state.inputValue}
          />
          <button
            title="show options"
            onClick={() => dispatch({ type: 'unfold' })}
            onMouseOver={() => dispatch({ type: 'mouse-over' })}
            onMouseLeave={() => dispatch({ type: 'mouse-leave' })}
            className={css`
              padding: 0.8rem;
              border-radius: 3px;
              border-top-left-radius: 0px;
              border-bottom-left-radius: 0px;
              background: ${colors.grey100};
              border: 1px solid
                ${state.focused || state.hovered
                  ? colors.blue300
                  : error
                  ? colors.red500
                  : valid
                  ? colors.green500
                  : colors.grey200};
              border-left-color: ${colors.grey200};
              cursor: pointer;
              transition: all 0.2s linear;
              &:focus,
              &:active {
                outline: none;
              }
            `}
          >
            <Icon size="1.6rem" name="arrow-down" color={colors.grey600} />
          </button>
        </div>
        <div
          className={css`
            visibility: ${state.collapsed ? 'hidden' : 'auto'};
            position: absolute;
            z-index: 999;
            left: 0;
            right: 0;
            top: 100%;
            opacity: ${state.collapsed ? 0 : 1};
            border-radius: 3px;
            transform: ${state.collapsed
              ? 'translateY(-1.2rem)'
              : 'translateY(.2rem)'};
            overflow: ${state.collapsed ? 'hidden' : 'auto'};
            transition: all 0.3s;
            background: #fff;
            border: 1px solid ${colors.grey100};
          `}
        >
          <SelectContext.Provider value={{ dispatch }}>
            {filteredOptions.map((opt, idx) => (
              <Option
                key={idx}
                onMouseOver={() =>
                  dispatch({ type: 'highlight-option', index: idx })
                }
                value={opt.value}
                highlighted={idx === state.highlightedOption}
              >
                {opt.label}
              </Option>
            ))}
          </SelectContext.Provider>
        </div>
      </div>
      {error && <InputError>{error}</InputError>}
    </div>
  )
}

interface SelectOptionProps {
  value: string
  children: string
  highlighted?: boolean
  onMouseOver: () => void
}

function Option({
  value,
  children,
  highlighted,
  onMouseOver,
}: SelectOptionProps) {
  const context = useContext(SelectContext)
  if (context === undefined) {
    throw new Error('useContext must be used within a SelectContext.Provider')
  }

  return (
    <a
      onMouseOver={onMouseOver}
      onClick={e =>
        context.dispatch({
          type: 'selection-change',
          inputValue: children,
          selectedKey: value,
        })
      }
      className={css`
        display: block;
        align-items: center;
        padding: 0.8rem 1.2rem;
        font-size: 1.4rem;
        ${highlighted &&
          css`
            cursor: pointer;
            background: ${colors.blue100};
          `}
      `}
      title={children}
    >
      {<span>{children}</span>}
    </a>
  )
}

export default Select
