import router from 'umi/router';
import { fetch, createPost, editPost } from '@/services/api';

export default {
  namespace: 'article',

  state: {
  },

  effects: {
    *fetch({ payload }, { put, call }) {
      const { data } = yield call(fetch, payload);
      yield put({
        type: 'save',
        payload: data,
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
    *editBlog({ payload }, { put, call }) {
      const { data } = yield call(editPost, payload.submitData, payload.id);
      yield put({
        type: 'save',
        payload: { blog: data },
      });
      router.push(`/posts/${data.id}`);
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
