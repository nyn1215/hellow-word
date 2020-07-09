const path = require('path')
const webpack = require('webpack')
const createThemeColorReplacerPlugin = require('./config/plugin.config')

function resolve(dir) {
    return path.join(__dirname, dir)
}

/**
 * check production or preview(pro.loacg.com only)
 * @returns {boolean}
 */
function isProd() {
    return process.env.NODE_ENV === 'production'
}

// const assetsCDN = {
//   css: [],
//   // https://unpkg.com/browse/vue@2.6.10/
//   js: [
//     '//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
//     '//cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
//     '//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
//     '//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js'
//   ]
// }

// webpack build externals
// const prodExternals = {
//   vue: 'Vue',
//   'vue-router': 'VueRouter',
//   vuex: 'Vuex',
//   axios: 'axios'
// }

// vue.config.js
const vueConfig = {
    // 基本路径
    publicPath: isProd() ? "./" : "/",
    // 输出文件目录
    outputDir: "propertyplatform-develop",
    // 静态资源目录 (js, css, img, fonts)
    // assetsDir: "static",
    configureWebpack: {
        // webpack plugins
        plugins: [
            // Ignore all locale files of moment.js
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        ],
        // if prod is on, add externals
        // externals: isProd() ? prodExternals : {}
    },

    chainWebpack: (config) => {
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('vue$', "vue/dist/vue.esm.js")
            .set('@api', resolve('src/api'))


        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        svgRule
            .oneOf('inline')
            .resourceQuery(/inline/)
            .use('vue-svg-icon-loader')
            .loader('vue-svg-icon-loader')
            .end()
            .end()
            .oneOf('external')
            .use('file-loader')
            .loader('file-loader')
            .options({
                name: 'assets/[name].[hash:8].[ext]'
            })

        // if prod is on
        // assets require on cdn
        // if (isProd()) {
        //   config.plugin('html').tap(args => {
        //     args[0].cdn = assetsCDN
        //     return args
        //   })
        // }
    },

    css: {
        loaderOptions: {
            less: {
                modifyVars: {

                    // less vars，customize ant design theme

                    // 'primary-color': '#F5222D',
                    // 'link-color': '#F5222D',
                    // 'border-radius-base': '4px'
                },
                // do not remove this line
                javascriptEnabled: true
            }
        }
    },

    devServer: {
        // development server port 8000
        host: "0.0.0.0",
        port: 8090,
        https: false, // https:{type:Boolean}
        open: true //配置自动启动浏览器
            // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
            // proxy: {
            //   '/api': {
            //     target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro',
            //     ws: false,
            //     changeOrigin: true
            //   }
            // }
    },

    // disable source map in production
    productionSourceMap: false,
    // lintOnSave: undefined,
    // babel-loader no-ignore node_modules/*
    transpileDependencies: []
}

// preview.pro.loacg.com only do not use in your production;

if (process.env.VUE_APP_PREVIEW === 'true') {
    console.log('VUE_APP_PREVIEW', true)
        // add `ThemeColorReplacer` plugin to webpack plugins
    vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
}

module.exports = vueConfig