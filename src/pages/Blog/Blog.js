import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Avatar } from 'antd';
import moment from 'moment';

@connect(({ blog }) => ({
  blog,
}))
class Blog extends PureComponent {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'blog/fetch',
      payload: match.params.id,
    });
  }

  render() {
    const {
      blog: { blog },
    } = this.props;
    const { title, body, avatar, author, timestamp } = blog;
    return (
      <Card style={{ maxWidth: '992px', margin: 'auto' }}>
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
