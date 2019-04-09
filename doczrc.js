module.exports = {
  title: 'react-atomicus',
  typescript: true,
  wrapper: 'src/DoczWrapper.tsx',
  codeSandbox: false,
  themeConfig: {
    colors: {
      primary: 'hsl(210, 60%, 45%)',
    },
    logo: {
      src:
        'https://raw.githubusercontent.com/w0wka91/react-atomicus/master/react-atomicus-logo.svg?sanitize=true',
      width: 25,
    },
    styles: {
      playground: {
        display: 'flex',
        alignItems: 'center',
        '> *:not(:last-child)': {
          marginRight: '1rem',
        },
      },
    },
  },
  modifyBundlerConfig: bundlerConfig => {
    bundlerConfig.optimization.nodeEnv = 'production'
    bundlerConfig.optimization.minimize = false
    return bundlerConfig
  },
}
