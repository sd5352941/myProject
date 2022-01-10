modules.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import @/styles/variables.scss;`
      }
    }
  }
}
