module.exports = {
    /* 在此定义的配置会与 webpack 公共配置合并 */
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            },
        },
    }
}