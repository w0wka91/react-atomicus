module.exports = {
  title: 'React Atoms',
  typescript: true,
  wrapper: 'src/DoczWrapper.tsx',
  themeConfig: {
    styles: {
      playground: {
        display: 'flex',
        alignItems: 'center',
        '*:not(:last-child)': {
          marginRight: '1rem'
        }
      }
    }
  }
}
