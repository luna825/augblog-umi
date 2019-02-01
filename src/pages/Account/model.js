import { message } from 'antd';
import { fetch, remove } from '@/services/api'
import removeArr from 'lodash/remove'

export default {
  namespace: 'account',
  
  state: {
    articles: {
      next: null,
      items:[]
    }
  },

  effects: {
    *fetchArticles({ url, add,}, { put, call}) {
      try{
        const { data } = yield call(fetch, url)
        yield put({
          type: 'saveArticles',
          payload: data,
          add,
        })
      }catch(e) {
        // 出现错误，传递空数据
        yield put({
          type: 'save',
          payload: { items: [] },
          add: true
        });
      }
    },
    *removeArticle({url, id}, {put, call}) {
      const hide = message.loading('正在删除...');
      try{
        yield call(remove, url)
        yield put({
          type: 'deleteArticle',
          payload: id,
        })
        hide()
      }catch(e) {
        hide()
        message.error('删除失败, 请稍后再试...')
      }
    },
  },

  reducers: {
    saveArticles(state, { payload, add }) {
      const { articles } = state;

      return {
        ...state,
        articles: {
          ...articles,
          ...payload,
          items: add ? state.items.concat(payload.items) : payload.items,
        }
      };
    },
    deleteArticle(state, { payload }){
      const { articles } = state;
      removeArr(articles.items, article => article.id === payload);
      return {
        ...state,
        articles: {
          ...articles
        }
      }
    }
  },
}