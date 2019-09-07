import { keyframes } from '@emotion/core'

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`

const zoomIn = keyframes`
    from {
      opacity: 0;
      transform: scale3d(0.3, 0.3, 0.3);
    }
  
    50% {
      opacity: 1;
    }
`

const zoomOut = keyframes`
    from {
      opacity: 1;
    }
  
    50% {
      opacity: 0;
      transform: scale3d(0.3, 0.3, 0.3);
    }
  
    to {
      opacity: 0;
    }
`

const slideInUp = keyframes`
    from {
      transform: translate3d(0, 100%, 0);
      visibility: visible;
    }
  
    to {
      transform: translate3d(0, 0, 0);
    }
`

const slideInDown = keyframes`
  from {
    transform: translate3d(0, -100%, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`

const fadeDown = keyframes`
  from {
    opacity: 0;
    visibility: hidden;
    transform: translate3d(0, -5%, 0);
  }

  to {
    opacity: 1;
    visibility: visible;
    transform: translate3d(0, 0, 0);
  }
`

const fadeUp = keyframes`
  from {
    opacity: 1;
    visibility: visible;
  }

  to {
    opacity: 0;
    visibility: hidden;
    transform: translate3d(0, -5%, 0);
  }
`

export { bounce, zoomIn, zoomOut, slideInUp, slideInDown, fadeDown, fadeUp }
