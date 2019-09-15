import { css } from 'emotion'
import React, { useEffect, useRef, useState } from 'react'
import { fadeDown, fadeUp } from '../../utils/animations'
import { borders } from '../../utils/borders'
import { colors } from '../../utils/colors'
import { shadows } from '../../utils/shadows'
import { Calendar } from '../calendar/Calendar'
import { Input } from '../input/Input'
import Dayjs from 'dayjs'

interface Props {
  label?: string
  formatDate?: (date: Date) => string
  parseDate?: (date: string) => Date | undefined
  onChange?: (date: Date) => void
}

const Datepicker: React.FC<Props> = ({
  label,
  formatDate,
  parseDate,
  onChange,
}) => {
  const [collapsed, setCollapsed] = useState(true)
  const [unfoldedOnce, setUnfoldedOnce] = useState(false)
  const [madeSelection, setMadeSelection] = useState(false)
  const [selectedDates, setSelectedDates] = useState<Date[]>([])

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
  const inputRef = useRef<HTMLInputElement>(null)
  const timer = useRef<number>()

  return (
    <>
      <div
        className={css`
          display: inline-block;
          position: relative;
        `}
      >
        <Input
          label={label}
          className={css`
            margin-bottom: 0.8rem;
          `}
          onClick={() => setCollapsed(false)}
          onFocus={() => setCollapsed(false)}
          onBlur={() => {
            timer.current = window.setTimeout(() => setCollapsed(true), 5)
          }}
          onKeyDown={evt => {
            switch (evt.keyCode) {
              case 27:
                setCollapsed(true)
                break
              default:
                setCollapsed(false)
                break
            }
          }}
          onChange={evt => {
            const date = parseDate
              ? parseDate(evt.currentTarget.value)
              : Dayjs(evt.currentTarget.value).toDate()
            if (date) {
              setSelectedDates([date])
              onChange && onChange(date)
            }
          }}
          autoComplete="off"
          ref={inputRef}
        />
        <div
          onMouseDown={evt => evt.preventDefault()}
          onClick={() => {
            if (inputRef && inputRef.current && !madeSelection) {
              inputRef.current.focus()
              clearTimeout(timer.current)
              setMadeSelection(false)
            }
          }}
          className={css`
            position: absolute;
            left: 0;
            min-width: 100%;
            white-space: nowrap;
            width: auto;
            background: #fff;
            z-index: 9999;
            border-radius: ${borders.radius};
            border: 1px solid ${colors.grey100};
            box-shadow: ${shadows[0]};
            opacity: 0;
            visibility: hidden;
            ${unfoldedOnce && animation}
          `}
        >
          <Calendar
            selectedDates={selectedDates}
            onSelect={(date: Date) => {
              if (inputRef && inputRef.current) {
                inputRef.current.value = formatDate
                  ? formatDate(date)
                  : Dayjs(date).format()
              }
              setCollapsed(true)
              setMadeSelection(true)
              onChange && onChange(date)
              setSelectedDates([date])
            }}
          />
        </div>
      </div>
    </>
  )
}

export { Datepicker }
