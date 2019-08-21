module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'zh-TW',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    },
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/',
        '/stamp',
        '/reward',
        '/bingo',
        '/fragment'
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true
    }
  }
}
