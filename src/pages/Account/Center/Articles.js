import React, { PureComponent } from 'react';
import Link from 'umi/link';
import { List, Icon } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import ArticleListContent from '@/components/ArticleListContent';
import styles from './Articles.less';

@connect(({ user, loading }) => ({
  postsInfo: user.postsInfo,
  loading: loading.models.user,
}))
class Center extends PureComponent {
  handleDeleted = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/deleteCurrentuserPost',
      payload: id,
    });
  };

  handleEdit = id => {
    router.push(`/editor?post=${id}`);
  };

  render() {
    const {
      postsInfo: { posts },
      loading,
    } = this.props;
    const IconText = ({ type, text, onHandleAction }) => (
      <span onClick={onHandleAction}>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    return (
      <List
        size="large"
        className={styles.articleList}
        loading={loading}
        rowKey="id"
        itemLayout="vertical"
        dataSource={posts}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
              <IconText type="edit" text="编辑" onHandleAction={() => this.handleEdit(item.id)} />,
              <IconText
                type="delete"
                text="删除"
                onHandleAction={() => this.handleDeleted(item.id)}
              />,
            ]}
          >
            <List.Item.Meta title={<Link to={`/posts/${item.id}`}>{item.title}</Link>} />
            <ArticleListContent data={item} />
          </List.Item>
        )}
      />
    );
  }
}

export default Center;
