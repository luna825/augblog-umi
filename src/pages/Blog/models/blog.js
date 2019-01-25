import { fetchPost, createPost } from '@/services/api';

export default {
  namespace: 'blogView',

  state: {
    blog: {},
    error: null,
  },

  effects: {
    *queryBlog({ payload }, { put, call }) {
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
    *addBlog({ payload }, { put, call }) {
      try {
        const { data } = yield call(createPost, payload);
        console.log(data);
      } catch (e) {
        console.log(e);
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
