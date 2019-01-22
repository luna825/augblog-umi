import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import PostList from './PostList';
import styles from './index.less';

const { Content, Sider } = Layout;

class Home extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'posts/fetch',
    });
  }

  render() {
    const { posts, loading } = this.props;
    return (
      <Layout className={styles.container}>
        <Content>
          <PostList posts={posts.posts} loading={loading} />
        </Content>
        <Sider className={styles.sider}>sider</Sider>
      </Layout>
    );
  }
}

export default connect(({ posts, loading }) => ({
  posts,
  loading: loading.models.posts,
}))(Home);
