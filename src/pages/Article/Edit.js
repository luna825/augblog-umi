import React, { PureComponent } from 'react';
import { connect } from 'dva';
import RichEditor from '@/components/RichEditor/RichEditor'
import Pageloading from '@/components/PageLoading'
import { message } from 'antd';
import router from 'umi/router';
import { update } from '@/services/api'

@connect(({article, loading}) => ({
  article,
  loading: loading.models.article
}))
class Edit extends PureComponent {

  onSubmit = async (article) => {
    const { article: oldArticle, dispatch } = this.props;
    const hide = message.loading('正在提交数据...')
    try {
      const response = await update(oldArticle.links.self, article)
      if (response.status === 200) {
        hide()
        message.success('文章编辑成功')
        dispatch({
          type: 'article/save',
          payload: response.data
        })
        router.push(`/posts/${response.data.id}`)
      }
    } catch (e) {
      hide()
      message.error('文章编辑失败')
    }
  }

  render() {
    const { article, loading } = this.props;
    return (
      <>
        {loading ? <Pageloading />:
        <RichEditor article={article} onSubmit={this.onSubmit} />
        }
      </>
    )
  }
}

export default Edit;