import React, { PureComponent } from 'react';
import RichEditor from '@/components/RichEditor/RichEditor'
import { message } from 'antd';
import router from 'umi/router';
import { add } from '@/services/api'

export default class Editor extends PureComponent {
  onSubmit = async (article) => {
    const hide = message.loading('正在提交数据...')
    try {
      const response = await add('/api/v1/posts', article)
      if (response.status === 201) {
        hide()
        message.success('文章发布成功')
        router.push(`/posts/${response.data.id}`)
      }
    } catch (e) {
      hide()
      message.error('文章发布失败')
    }
  }

  render(){
    return (
      <RichEditor onSubmit={this.onSubmit} />
    )
  }
}
