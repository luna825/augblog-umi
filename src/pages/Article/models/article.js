import { fetch } from '@/services/api';

export default {
  namespace: 'article',

  state: {},

  effects: {
    *fetch({ payload }, { put, call }) {
      try{
        const { data } = yield call(fetch, payload);
        yield put({
          type: 'save',
          payload: data,
        });
      }catch (e) {
        yield put({
          type: 'save',
          payload: {}
        })
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
