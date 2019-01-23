import { fetchPost } from '@/services/api';

export default {
  namespace: 'blog',

  state: {
    blog: {},
  },

  effects: {
    *fetch({ payload }, { put, call }) {
      try {
        const { data } = yield call(fetchPost, payload);
        yield put({
          type: 'save',
          payload: { blog: data },
        });
      } catch (e) {
        yield put({
          type: 'save',
          payload: { error: e.response.data, blog: {} },
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
