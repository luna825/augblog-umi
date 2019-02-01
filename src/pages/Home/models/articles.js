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
    *fetch({ url, add }, { put, call }) {
      try {
        const { data } = yield call(fetch, url);
        yield put({
          type: 'save',
          payload: data,
          add,
        });
      } catch (e) {
        // 出现错误，传递空数据
        yield put({
          type: 'save',
          payload: { items: []},
          add: true
        });
      }
    },
  },

  reducers: {
    save(state, { payload, add }) {
      return {
        ...state,
        ...payload,
        items:add ? state.items.concat(payload.items) : payload.items ,
      };
    },
  },
};
