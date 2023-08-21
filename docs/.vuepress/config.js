module.exports = {
    title: 'UI Development Guide',
    description: 'State Of The Art',
    themeConfig: require('./config/themeConfig/index'),
    // head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
    plugins: {
        // '@vuepress/pwa': {
        //     serviceWorker: true,
        //     updatePopup: true,
        // },
    },
    configureWebpack: {
        resolve: {
            alias: {
                // '@alias': 'path/to/some/dir'
            },
        },
    },
}
