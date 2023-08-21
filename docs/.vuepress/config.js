module.exports = {
    title: 'UI Development Guide',
    description: 'State Of The Art',
    themeConfig: require('./config/themeConfig/index'),
    // head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
    head: [
        ['link', { rel: 'icon', src: '/favicon.ico' }],
        ['script', { src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5451440010209476' }],
        // ['meta', { name: 'theme-color', content: '#6e2383' }],
    ],
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
