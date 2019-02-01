import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import InfiniteScroll from 'react-infinite-scroller';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PostList from './PostList';
import styles from './index.less';

const { Content, Sider } = Layout;

class Home extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'articles/fetch',
      payload: '/api/v1/posts',
    });
  }

  onLoadMore = next => {
    const { dispatch } = this.props;
    dispatch({
      type: 'articles/fetch',
      payload: next,
    });
  };

  render() {
    const { articles, loading } = this.props;
    return (
      <GridContent>
        <Content>
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={() => this.onLoadMore(articles.links.next)}
            hasMore={!loading && !!articles.links.next}
          >
            <PostList
              articles={articles}
              loading={loading}
              handleInfiniteOnLoad={this.onLoadMore}
            />
          </InfiniteScroll>
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
