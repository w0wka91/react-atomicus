import { normalize } from 'polished'

const globalStyle = [
  ...normalize(),
  `
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }
  body {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.6rem;
  }
  `,
]

export default globalStyle