// Configuration for your app
const path = require('path')

module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: [
      'auth',
      'firebase',
      'vueComponents',
      'vuePlugins',
      'i18n',
      'axios',
      'windowRegistrations',
      'boot'
    ],
    css: [
      'index.styl'
    ],
    extras: [
      'fontawesome',
      'material-icons',
      ctx.theme.mat ? 'roboto-font' : null,
      ctx.theme.ios ? 'ionicons' : null,
      // 'mdi',
      // 'fontawesome'
    ],
    supportIE: false,
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|quasar)/
        })
        cfg.resolve.alias = {
          ...cfg.resolve.alias, // This adds the existing aliases
          // Add your own alias like this:
          'styl/variables': path.resolve(__dirname, './src/css/themes/common.variables.styl'),
          '@router': path.resolve(__dirname, './src/router'),
          '@store': path.resolve(__dirname, './src/store'),
          '@modules': path.resolve(__dirname, './src/store/modules'),
          '@components': path.resolve(__dirname, './src/components'),
          '@mixins': path.resolve(__dirname, './src/components/mixins'),
          '@helpers': path.resolve(__dirname, './src/helpers'),
          '@config': path.resolve(__dirname, './src/config'),
        }
      }
    },
    devServer: {
      // https: true,
      // port: 8080,
      open: false // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QBtn',
        'QBtnDropdown',
        'QField',
        'QIcon',
        'QInput',
        'QItem',
        'QItemMain',
        'QItemSide',
        'QItemTile',
        'QLayout',
        'QLayoutDrawer',
        'QLayoutHeader',
        'QList',
        'QListHeader',
        'QModal',
        'QPage',
        'QPageContainer',
        'QRouteTab',
        'QSelect',
        'QSlider',
        'QSpinnerOval',
        'QTab',
        'QTabPane',
        'QTabs',
        'QToggle',
        'QToolbar',
        'QToolbarTitle',
        'QWindowResizeObservable',
      ],
      directives: [
        'Ripple', 'TouchSwipe', 'CloseOverlay'
      ],
      // Quasar plugins
      plugins: [
        'Notify'
      ],
      iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
    },
    // animations: 'all' --- includes all animations
    animations: [
      'flipOutX'
    ],
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack (cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
