import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PostList from './PostList';
import styles from './index.less';

const { Content, Sider } = Layout;

class Home extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'articles/fetch',
      url: '/api/v1/posts',
    });
  }

  onLoadMore = next => {
    const { dispatch } = this.props;
    dispatch({
      type: 'articles/fetch',
      url: next,
      add: true,
    });
  };

  render() {
    const { articles, loading } = this.props;
    return (
      <GridContent>
        <Content>
          <PostList articles={articles} loading={loading} handleInfiniteOnLoad={this.onLoadMore} />
        </Content>
        <Sider className={styles.sider} breakpoint="lg" collapsedWidth={0} trigger={null}>
          sider
        </Sider>
      </GridContent>
    );
  }
}

export default connect(({ articles, loading }) => ({
  articles,
  loading: loading.models.articles,
}))(Home);
