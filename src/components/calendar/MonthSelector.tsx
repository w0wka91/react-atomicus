import React from 'react'
import { css } from 'emotion'
import Dayjs from 'dayjs'
import { colors } from '../../utils/colors'

interface Props {
  locale: string
  initial: Date
  onClickPrev: (date: Date) => void
  onClickNext: (date: Date) => void
  render?: (date: Date) => React.ReactNode
}

const arrowBase = css`
  border: solid ${colors.grey200};
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  &:hover {
    border-color: ${colors.grey900};
  }
  transition: all 0.2s;
  cursor: pointer;
`

function MonthSelector({ locale, initial, onClickPrev, onClickNext }: Props) {
  return (
    <div
      className={css`
        padding: 1.28rem 1.92rem;
        margin-bottom: 0.64rem;
        border-bottom: ${`1px solid ${colors.grey200}`};
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <a
        title="Previous month"
        onClick={() =>
          onClickPrev(
            Dayjs(initial)
              .subtract(1, 'month')
              .toDate()
          )
        }
        className={css`
          ${arrowBase}
          transform: rotate(135deg);
        `}
      />
      <span
        className={css`
          flex-grow: 1;
          text-align: center;
        `}
      >
        {`${initial.toLocaleString(locale, {
          month: 'long',
        })} ${initial.getFullYear()}`}
      </span>
      <a
        title="Next month"
        onClick={() =>
          onClickNext(
            Dayjs(initial)
              .add(1, 'month')
              .toDate()
          )
        }
        className={css`
          ${arrowBase}
          transform: rotate(-45deg);
        `}
      />
    </div>
  )
}

MonthSelector.defaultProps = {
  locale: 'en-en',
}
export { MonthSelector }
