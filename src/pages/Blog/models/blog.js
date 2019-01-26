import router from 'umi/router';
import { fetchPost, createPost } from '@/services/api';

export default {
  namespace: 'blogView',

  state: {
    blog: {},
    error: null,
  },

  effects: {
    *queryBlog({ payload }, { put, call }) {
      const { data } = yield call(fetchPost, payload);
      yield put({
        type: 'save',
        payload: { blog: data },
      });
    },
    *addBlog({ payload }, { put, call }) {
      try {
        const { data } = yield call(createPost, payload);
        yield put({
          type: 'save',
          payload: { blog: data },
        });
        router.push(`/posts/${data.id}`);
      } catch (e) {
        router.push('/login');
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
