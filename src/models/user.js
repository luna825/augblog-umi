import { fetchCurrentUser } from '@/services/auth';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      if (!localStorage.getItem('aug-blog-user-token')) {
        yield put({
          type: 'savaCurrentUser',
        });
        return;
      }
      try {
        const { data } = yield call(fetchCurrentUser);
        reloadAuthorized(data.role);
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
