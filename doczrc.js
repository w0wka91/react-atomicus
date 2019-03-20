module.exports = {
  title: 'React Atoms',
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
}
