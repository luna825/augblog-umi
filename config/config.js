// ref: https://umijs.org/config/
import { primaryColor } from '../src/defaultSettings';

export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          hmr: true,
        },
        targets: {
          ie: 11,
        },
        locale: {
          enable: true, // default false
          default: 'zh-CN', // default zh-CN
          baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
        },
        dynamicImport: {
          loadingComponent: './components/PageLoading/index',
        },
      },
    ],
    [
      'umi-plugin-pro-block',
      {
        moveMock: false,
        moveService: false,
        modifyRequest: true,
        autoAddMenu: true,
      },
    ],
  ],
  targets: {
    ie: 11,
  },

  /**
   * 路由相关配置
   */
  routes: [
    {
      path: '/login',
      component: '../layouts/UserLayout',
      routes: [{ path: '/login', component: './Login/Login' }],
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        { path: '/', redirect: '/home' },
        // dashboard
        {
          path: '/home',
          name: 'home',
          icon: 'home',
          component: './Home/Home',
        },
        {
          path: '/account/center',
          name: 'center',
          component: './Account/Center/Center',
          authority: ['Administrator', 'User'],
          icon: 'user',
          routes: [
            {
              path: '/account/center',
              redirect: '/account/center/articles',
            },
            {
              path: '/account/center/articles',
              authority: ['Administrator', 'User'],
              component: './Account/Center/Articles',
            },
          ],
        },
        {
          path: '/posts/:id',
          component: './Article/ArticleWrapper',
          routes: [
            {
              path:'/posts/:id',
              component: './Article/Article'
            },
            {
              path: '/posts/:id/edit',
              component: './Article/Edit'
            }
          ]
        },
        {
          path: '/editor',
          authority: ['Administrator'],
          component: './Editor/Editor',
        },
        {
          path: '/exception',
          routes: [
            // exception
            {
              path: '/exception/403',
              component: './Exception/403',
            },
            {
              path: '/exception/404',
              component: './Exception/404',
            },
            {
              path: '/exception/500',
              component: './Exception/500',
            },
          ],
        },
        {
          path: '/welcome',
          name: 'welcome',
          icon: 'smile',
          authority: ['test'],
          component: './Welcome',
        },
        {
          component: '404',
        },
      ],
    },
  ],
  disableRedirectHoist: true,

  /**
   * webpack 相关配置
   */
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },
  proxy: {
    "/api/v1": {
      "target": "http://localhost:5000/api/v1",
      "changeOrigin": true,
      "pathRewrite": { "^/api/v1": "" }
    }
  },
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  externals: {
    '@antv/data-set': 'DataSet',
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
};
