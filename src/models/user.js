import { fetchCurrentUser } from '@/services/auth';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *fetchCurrent({ payload }, { call, put }) {
      if (!localStorage.getItem('aug-blog-user-token')) {
        yield put({
          type: 'savaCurrentUser',
        });
        return;
      }
      try {
        const { data } = yield call(fetchCurrentUser, payload);
        reloadAuthorized(data.role.name);
        yield put({
          type: 'saveCurrentUser',
          payload: data,
        });
      } catch (e) {
        localStorage.removeItem('aug-blog-user-token');
        yield put({
          type: 'savaCurrentUser',
        });
      }
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
  },
};
