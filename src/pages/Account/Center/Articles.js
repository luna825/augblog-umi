import React, { PureComponent } from 'react';
import Link from 'umi/link';
import { List, Icon } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import ArticleListContent from '@/components/ArticleListContent';
import styles from './Articles.less';

@connect(({ user, loading, account }) => ({
  currentUser: user.currentUser,
  articles: account.articles,
  loading: loading.models.account,
}))
class Center extends PureComponent {
  componentDidMount() {
    const { dispatch, currentUser } = this.props;
    dispatch({
      type: 'account/fetchArticles',
      url: `/api/v1/users/${currentUser.id}/posts`,
    });
  }

  handleDeleted = item => {
    const { dispatch } = this.props;
    dispatch({
      type: 'account/removeArticle',
      url: item.links.self,
      id: item.id,
    });
  };

  handleEdit = id => {
    router.push(`/posts/${id}/edit`);
  };

  render() {
    const { articles, loading } = this.props;
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
        dataSource={articles.items}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
              <IconText type="edit" text="编辑" onHandleAction={() => this.handleEdit(item.id)} />,
              <IconText
                type="delete"
                text="删除"
                onHandleAction={() => this.handleDeleted(item)}
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
