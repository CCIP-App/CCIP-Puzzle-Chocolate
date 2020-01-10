const path = require('path');

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
  },
  chainWebpack: (config) => {
    config
      .plugin('copy')
      .tap(args => {
        args[0].push({
          from: path.join(__dirname, 'node_modules/qr-scanner/qr-scanner-worker.min.js'),
          toType: 'dir',
          to: path.join(__dirname, './dist/js')
        })
        return args
      })
  },
}
