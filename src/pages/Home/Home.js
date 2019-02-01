import React, { PureComponent } from 'react';
import { Layout, Divider, Icon, Card } from 'antd';
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
        <Sider width={300} className={styles.sider} breakpoint="lg" collapsedWidth={0} trigger={null}>
          <Card bordered={false}>
            <div className={styles.avatarHolder}>
              <img alt="" src="https://avatars0.githubusercontent.com/u/10859713?s=460&v=4" />
              <div className={styles.name}>August</div>
            </div>
            <div className={styles.detail}>
              <p>欢迎来到我的博客!</p>
              <p>我是一名计算机爱好者，目前居住于重庆</p>
              <p>谢谢你的访问。</p>
            </div>
            <Divider dashed />
            <div className={styles.link}>
              <div> <Icon type='mail' /> luna825@qq.com </div>
              <div> <Icon type='github' /> <a rel="noopener noreferrer" target="_blank" href="https://github.com/luna825">Github </a></div>
            </div>
          </Card>
        </Sider>
      </GridContent>
    );
  }
}

export default connect(({ articles, loading }) => ({
  articles,
  loading: loading.models.articles,
}))(Home);
