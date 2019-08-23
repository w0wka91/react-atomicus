import { useState } from 'react'

function useToggle(initialValue = false) {
  const [value, setValue] = useState<boolean>(initialValue)
  const toggle = () => {
    console.log('test')
    setValue(state => !state)
  }
  return [value, toggle]
}

export { useToggle }
