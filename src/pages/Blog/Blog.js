import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Avatar, Row, Col } from 'antd';
import moment from 'moment';
import styles from './index.less';

@connect(({ blogView: { blog }, loading }) => ({
  blog,
  loading,
}))
class Blog extends PureComponent {
  componentDidMount() {
    const { dispatch, match, blog } = this.props;
    if (String(blog.id) !== match.params.id) {
      dispatch({
        type: 'blogView/queryBlog',
        payload: match.params.id,
      });
    }
  }

  render() {
    const { blog, loading } = this.props;
    const { title, body, avatar, author, timestamp } = blog;
    return (
      <Card
        style={{ maxWidth: '100rem', margin: 'auto' }}
        loading={loading.effects['blogView/queryBlog']}
      >
        <Row className={styles.blog}>
          <Col xs={24} md={18}>
            <div className={styles.header}>
              <Avatar size="large" src={avatar} />
              <div className={styles.avatarInfoBox}>
                <a className={styles.username}>{author}</a>
                <div className={styles.time}>
                  {moment(timestamp).format('YYYY年MM月DD日 HH:mm')}
                </div>
              </div>
            </div>
            <h1>{title}</h1>
            <p className={styles.content}>{body}</p>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default Blog;
