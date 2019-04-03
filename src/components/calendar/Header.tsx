import React from 'react'
import Weekday from './Weekday'

function Header() {
  return (
    <>
      <Weekday title="Sunday">S</Weekday>
      <Weekday title="Monday">M</Weekday>
      <Weekday title="Tuesday">T</Weekday>
      <Weekday title="Wednesday">W</Weekday>
      <Weekday title="Thursday">T</Weekday>
      <Weekday title="Friday">F</Weekday>
      <Weekday title="Saturday">S</Weekday>
    </>
  )
}

export default Header
