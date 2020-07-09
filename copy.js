const path = require("path");
const webpack = require('webpack')
const createThemeColorReplacerPlugin = require('./config/plugin.config')
const debug = process.env.NODE_ENV !== "production";
const vueConfig = {
  // 基本路径
  publicPath: debug ? "/" : "/",
  // 输出文件目录
  outputDir: "dist",
  // 静态资源目录 (js, css, img, fonts)
  assetsDir: "static",
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  lintOnSave: false,
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    // if prod is on, add externals
  },
  chainWebpack: config => {
    // webpack配置，值位对象时会合并配置，为方法时会改写配置
    if (debug) {
      // 开发环境配置
      config.devtool = "cheap-module-eval-source-map";
    } else {
      // 生产环境配置
    }
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        extensions: [".js", ".vue", ".json", ".scss", ".ts", ".tsx", ".less"],
        alias: {
          vue$: "vue/dist/vue.esm.js",
          "@": path.resolve(__dirname, "./src"),
          "@common": path.resolve(__dirname, "./src/common"),
          "@api": path.resolve("src/api"),
          "@pages": path.resolve("src/pages"),
          "@store": path.resolve("src/store"),
          "@router": path.resolve("src/router"),
          "@components": path.resolve("src/components")
        }
      }
    });
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          "primary-color": "#1890FF",
          "link-color": "#1890FF",
          "border-radius-base": "4px"
        },
        javascriptEnabled: true
      }
    }
  },
  // 服务器端口号
  devServer: {
    port: 8888,
    // host: "0.0.0.0",
    https: false, // https:{type:Boolean}
    open: true //配置自动启动浏览器
  },
  transpileDependencies: []
};
if (process.env.VUE_APP_PREVIEW === 'true') {
  console.log('VUE_APP_PREVIEW', true)
  // add `ThemeColorReplacer` plugin to webpack plugins
  vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
}

module.exports = vueConfig;