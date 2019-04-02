import { useState, useEffect } from 'react'

let id = 0
const genId = () => ++id

export const useId = () => {
  const [id, setId] = useState<number | null>(null)
  useEffect(() => setId(genId()), [])
  return id
}
