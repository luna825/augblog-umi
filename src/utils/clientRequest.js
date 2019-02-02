import axios from 'axios';
import router from 'umi/router';
import { Message } from 'antd';
// const codeMessage = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。',
// };

axios.defaults.timeout = 3000;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  config => {
    const newConfig = { ...config };
    // 从本地存储中取得 jwt 的验证 token
    const token = localStorage.getItem('aug-blog-user-token');
    if (token) {
      newConfig.headers.Authorization = `Bearer ${token}`;
    }
    return newConfig;
  },
  err => Promise.reject(err)
);

axios.interceptors.response.use(
  response => {
    const { data, status } = response;
    if (status >= 200 && status < 300) {
      if (data.error_code === 1) {
        Message.success('数据删除成功');
      }
      return response;
    }
    return Promise.reject(response);
  },
  error => Promise.reject(error)
);

export default function request(url, opt) {
  return axios(url, opt).catch(error => {
    // 请求配置发生的错误
    if (!error.response) {
      // eslint-disable-next-line no-console
      return console.log('Error', error.message);
    }

    // 响应时的状态码处理
    const { status } = error.response;
    if (status === 401) {
      // @HACK
      /* eslint-disable no-underscore-dangle */
      window.g_app._store.dispatch({
        type: 'login/logout',
      });
    }
    // environment should not be used
    if (status === 403) {
      router.push('/exception/403');
    }
    if (status <= 504 && status >= 500) {
      router.push('/exception/500');
    }
    if (status >= 404 && status < 422) {
      router.push('/exception/404');
    }
    return Promise.reject(error.response);
  });
}
