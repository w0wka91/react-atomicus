import React from 'react'
import { injectGlobal } from 'emotion'
import globalStyle from './utils/globalStyle'

injectGlobal(globalStyle)

interface Props {
  children: React.ReactNode
}

function DoczWrapper({ children }: Props) {
  return <div>{children}</div>
}

export default DoczWrapper;