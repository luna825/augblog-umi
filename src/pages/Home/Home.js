import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PostList from './PostList';

class Home extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'posts/fetch',
    });
  }

  render() {
    const { posts } = this.props;
    return (
      <>
        <PostList posts={posts.posts} />
      </>
    );
  }
}

export default connect(({ posts }) => ({
  posts,
}))(Home);
