import React, { useEffect } from 'react'
import { css } from 'emotion'
import { MonthSelector } from './MonthSelector'
import { Header } from './Header'
import { Day } from './Day'
import Dayjs from 'dayjs'

interface Props {
  onSelect?: (date: Date, day: Dayjs.Dayjs) => void
  locale: string
  initDate: Date
  minDate: Date
  maxDate: Date
  selectedDates: Date[]
}

function getDaysInMonth(month: number, year: number): Dayjs.Dayjs[] {
  let date = Dayjs()
    .month(month)
    .year(year)
    .date(1)
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0)
  let days: Dayjs.Dayjs[] = []
  while (date.month() === month) {
    days.push(date)
    date = date.add(1, 'day')
  }
  return days
}

function Calendar({
  onSelect,
  locale,
  initDate,
  minDate,
  maxDate,
  selectedDates,
  ...rest
}: Props) {
  const [initialDate, setInitialDate] = React.useState(initDate)
  const daysInMonth = getDaysInMonth(
    initialDate.getMonth(),
    initialDate.getFullYear()
  )
  useEffect(() => {
    if (selectedDates && selectedDates.length > 0) {
      setInitialDate(selectedDates[selectedDates.length - 1])
    }
  }, [selectedDates])
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
        {daysInMonth.map((dayjs, index) => {
          return (
            <Day
              className={css`
                grid-column-start: ${index === 0 ? dayjs.date() : 0};
              `}
              key={dayjs.unix()}
              title={dayjs.toDate().toLocaleDateString(locale)}
              onClick={() => onSelect && onSelect(dayjs.toDate(), dayjs)}
              selected={
                selectedDates
                  .map(d => Dayjs(d))
                  .find(d => d.isSame(dayjs, 'day')) !== undefined
              }
              disabled={
                dayjs.isBefore(Dayjs(minDate)) || dayjs.isAfter(Dayjs(maxDate))
              }
            >
              {dayjs.isSame(Dayjs(), 'day') ? (
                <b>{dayjs.date()}</b>
              ) : (
                dayjs.date()
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
  initDate: new Date(),
  minDate: new Date(1900, 0, 0),
  maxDate: new Date(2099, 0, 0),
  selectedDates: [],
}

export { Calendar }
