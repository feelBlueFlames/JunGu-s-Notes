module.exports = {
  title: '君顾笔记',
  description: '君顾的博客',
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  serviceWorker: true, // 是否开启 PWA
  base: '/', // 部署到github相关的配置
  markdown: {
    lineNumbers: true // 代码块是否显示行号
  },
  themeConfig: {
    sidebar: require('./sidebar'),
    nav: require('./nav'),
    dateFormat: 'YYYY-MM-DD',
    sidebarDepth: 2, 
    footer: {
      contact: [
        {
          type: 'github',
          link: 'https://github.com/vuejs/vuepress'
        },
        {
          type: 'twitter',
          link: 'https://github.com/vuejs/vuepress'
        }
      ]
    }
  },
  // sidebar: 'auto', // 侧边栏配置
  // sidebarDepth: 2,
  configureWebpack: {
    resolve: {
      alias: {
        '@': 'path/to/some/dir'
      }
    }
  },
  // theme: '@vuepress/blog',
  // plugins: ['autobar']
}
