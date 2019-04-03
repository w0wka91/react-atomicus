import React from 'react'
import { css } from 'emotion'
import MonthSelector from './MonthSelector'
import Header from './Header'
import Day from './Day'

interface Props {
  onSelect?: (date: Date) => void
  locale: string
  selectionMode: SelectionType
  initDate: Date
  minDate: Date
  maxDate: Date
}

export enum SelectionType {
  SINGLE,
  MULTIPLE,
}

function getDaysInMonth(month: number, year: number): Date[] {
  let date = new Date(year, month, 1)
  let days: Array<Date> = []
  while (date.getMonth() === month) {
    days.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }
  return days
}

function Calendar({
  onSelect,
  locale,
  selectionMode,
  initDate,
  minDate,
  maxDate,
  ...rest
}: Props) {
  const [selectedDates, setSelectedDates] = React.useState<number[]>([])
  const [initialDate, setInitialDate] = React.useState(initDate)
  const daysInMonth = getDaysInMonth(
    initialDate.getMonth(),
    initialDate.getFullYear()
  )
  const handleDayClick = (date: Date) => {
    let newDates: number[] = []
    if (selectedDates.includes(date.getTime())) {
      newDates = selectedDates.filter(dateTime => dateTime !== date.getTime())
    } else if (selectionMode === SelectionType.MULTIPLE) {
      newDates = selectedDates.concat(date.getTime())
    } else if (selectionMode === SelectionType.SINGLE) {
      newDates = [date.getTime()]
    }
    setSelectedDates(newDates)
    onSelect && onSelect(date)
  }
  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
      `}
      {...rest}
    >
      <MonthSelector
        locale={locale}
        initial={initialDate}
        onClickPrev={date => setInitialDate(date)}
        onClickNext={date => setInitialDate(date)}
      />
      <div
        className={css`
          padding: 0.8rem;
          display: grid;
          grid-row-gap: 0.32rem;
          justify-items: center;
          align-items: center;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        `}
      >
        <Header />
        {daysInMonth.map((date, index) => {
          return (
            <Day
              className={css`
                grid-column-start: ${index === 0 ? date.getDay() + 1 : 0};
              `}
              key={date.getTime()}
              title={date.toLocaleDateString(locale)}
              onClick={() => handleDayClick(date)}
              selected={selectedDates.includes(date.getTime())}
              disabled={
                date.setHours(0, 0, 0, 0) < minDate.setHours(0, 0, 0, 0) ||
                date.setHours(0, 0, 0, 0) > maxDate.setHours(0, 0, 0, 0)
              }
            >
              {new Date().toDateString() === date.toDateString() ? (
                <b>{date.getDate()}</b>
              ) : (
                date.getDate()
              )}
            </Day>
          )
        })}
      </div>
    </div>
  )
}

Calendar.defaultProps = {
  locale: 'en-US',
  selectionMode: SelectionType.MULTIPLE,
  initDate: new Date(),
  minDate: new Date(1900, 0, 0),
  maxDate: new Date(2099, 0, 0),
}

export default Calendar
