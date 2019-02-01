import { fetchCurrentUser } from '@/services/auth';
import { fetchPostsOfUser, deletePost } from '@/services/api';
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
    *fetchCurrentuserPosts({ payload }, { call, put }) {
      const { data } = yield call(fetchPostsOfUser, payload);
      yield put({
        type: 'savaCurrentUserPosts',
        payload: data,
      });
    },
    *deleteCurrentuserPost({ payload }, { call, put }) {
      yield call(deletePost, payload);
      yield put({
        type: 'removeCurrentUserPost',
        payload,
      });
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
