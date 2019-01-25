import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Avatar } from 'antd';
import moment from 'moment';

@connect(({ blogView: { blog }, loading }) => ({
  blog,
  loading,
}))
class Blog extends PureComponent {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'blogView/queryBlog',
      payload: match.params.id,
    });
  }

  render() {
    const { blog, loading } = this.props;
    const { title, body, avatar, author, timestamp } = blog;
    return (
      <Card
        style={{ maxWidth: '992px', margin: 'auto' }}
        loading={loading.effects['blogView/queryBlog']}
      >
        <h1>{title}</h1>
        <div>
          <Avatar src={avatar} />
          <a>{author}</a>
          <em>{moment(timestamp).format('YYYY-MM-DD HH:mm')}</em>
        </div>
        <div>{body}</div>
      </Card>
    );
  }
}

export default Blog;
