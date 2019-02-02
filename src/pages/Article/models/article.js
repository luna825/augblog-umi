import { fetch } from '@/services/api';

export default {
  namespace: 'article',

  state: {},

  effects: {
    *fetch({ payload }, { put, call }) {
      const { data } = yield call(fetch, payload);
      yield put({
        type: 'save',
        payload: data,
      });
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
