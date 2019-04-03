module.exports = {
  title: 'react-atomicus',
  typescript: true,
  wrapper: 'src/DoczWrapper.tsx',
  codeSandbox: false,
  themeConfig: {
    colors: {
      primary: 'hsl(210, 60%, 45%)',
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
