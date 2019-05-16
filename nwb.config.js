module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'MiradorLdnPlugin',
      externals: {
        react: 'React'
      }
    }
  }
}
