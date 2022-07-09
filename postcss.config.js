module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 320,  // 视窗的宽度
      viewportHeight: 667, // 视窗的高度
      unitPrecision: 5, // 指定'px'转换为视窗单位值的小数位数
      viewportUnit: 'vw', // 指定需要转换成的视窗单位
      selectorBlackList: ['ignore','tab-bar'], // 指定不需要转换的类
      minPixelValue: 1, // 小于或等于'1px'不转换为视窗单位
      mediaQuery: false, // 允许在媒体查询中转换'px'
      exclude: [/TabBar$/] // 忽略某些特定文件，不转换
    }
  }
}

// 1.在JS中使用正则：/正则/
// 2.exclude中存放的元素必须是正则表达式
// 3.按照排除的文件写对应的正则
