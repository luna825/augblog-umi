import { routerRedux } from 'dva/router';
import { getPageQuery } from '@/utils/utils';
import { login } from '@/services/auth';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'auth',

  state: {
    isLogin: false,
  },

  effects: {
    *login({ payload }, { call, put }) {
      try {
        const response = yield call(login, payload);
        yield localStorage.setItem('aug-blog-user-token', response.data.token);
        yield put({
          type: 'user/fetchCurrent',
          payload: response.data.token,
        });
        yield put({
          type: 'changeLoginStatus',
          isLogin: true,
        });
        if (response.status === 201) {
          const urlParams = new URL(window.location.href);
          const params = getPageQuery();
          let { redirect } = params;
          if (redirect) {
            const redirectUrlParams = new URL(redirect);
            if (redirectUrlParams.origin === urlParams.origin) {
              redirect = redirect.substr(urlParams.origin.length);
              if (redirect.match(/^\/.*#/)) {
                redirect = redirect.substr(redirect.indexOf('#') + 1);
              }
            } else {
              window.location.href = redirect;
              return;
            }
          }
          yield put(routerRedux.replace(redirect || '/'));
        }
      } catch (e) {
        yield put({
          type: 'changeLoginStatus',
          isLogin: false,
          error: e.response.data,
        });
      }
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        isLogin: false,
      });
      yield put({
        type: 'user/saveCurrentUser',
      });
      reloadAuthorized('guest');
      localStorage.removeItem('aug-blog-user-token');
    },
  },

  reducers: {
    changeLoginStatus(state, action) {
      return {
        ...state,
        ...action,
      };
    },
  },
};
