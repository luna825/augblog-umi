import { fetchPosts } from '@/services/api';

export default {
  namespace: 'posts',

  state: {
    posts: [],
  },

  effects: {
    *fetch(_, { put, call }) {
      try {
        const { data } = yield call(fetchPosts);
        yield put({
          type: 'save',
          payload: data,
        });
      } catch (e) {
        yield put({
          type: 'save',
          payload: { post: [], error: e.data },
        });
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
