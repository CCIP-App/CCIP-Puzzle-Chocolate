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
        '/Stamp',
        '/Reward',
        '/Bingo',
        '/Fragment'
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true
    }
  }
}
