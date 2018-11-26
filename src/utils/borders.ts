import { darken } from 'polished'
import { colors } from './colors'

export const borders = {
  default: (color = colors.default) => `1px solid ${darken(0.1, color)}`,
  radius: '2px',
}
