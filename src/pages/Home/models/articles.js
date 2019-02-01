import { fetch } from '@/services/api';

export default {
  namespace: 'articles',

  state: {
    links: {
      next: null,
    },
    items: [],
  },

  effects: {
    *fetch({ payload }, { put, call }) {
      try {
        const { data } = yield call(fetch, payload);
        yield put({
          type: 'save',
          payload: data,
        });
      } catch (e) {
        // 出现错误，传递空数据
        yield put({
          type: 'save',
          payload: {},
        });
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
        items: state.items.concat(payload.items),
      };
    },
  },
};
