/* eslint-disable react/no-danger */
import 'github-markdown-css';
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Avatar, Row, Col, Skeleton } from 'antd';
import moment from 'moment';
import styles from './index.less';

@connect(({ article, loading }) => ({
  article,
  loading: loading.effects['article/fetch']
}))
class Blog extends PureComponent {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'article/fetch',
      payload: `/api/v1/posts/${match.params.id}`,
    });
  }

  render() {
    const { article, loading } = this.props;
    return (
      <Card style={{ maxWidth: '100rem', margin: 'auto' }}>
        <Row className={styles.blog}>
          <Col xs={24} md={18}>
            <Skeleton loading={loading} active avatar paragraph={{rows: 22}}>
              {Object.keys(article).length && article.bodyHtml &&
              <>
                <div className={styles.header}>
                  <Avatar size="large" src={article.author.avatarUrl} />
                  <div className={styles.avatarInfoBox}>
                    <a className={styles.username}>{article.author.nickname}</a>
                    <div className={styles.time}>
                      {moment(article.timestamp).format('YYYY年MM月DD日 HH:mm')}
                    </div>
                  </div>
                </div>
                <h1>{article.title}</h1>
                <div className="markdown-body" dangerouslySetInnerHTML={{ __html: article.bodyHtml }} />
              </>
              }
            </Skeleton>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default Blog;
