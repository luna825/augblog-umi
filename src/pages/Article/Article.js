import React, { PureComponent }from 'react';
import { connect } from 'dva';
import { Card, Avatar, Row, Col, Skeleton } from 'antd';
import moment from 'moment';
import styles from './index.less';

@connect(({article, loading}) => ({
  article,
  loading: loading.models.article
}))
class Article extends PureComponent {

  render() {
    const { article, loading} = this.props;
    return (
      <Card style={{ maxWidth: '100rem', margin: 'auto' }}>
        <Row className={styles.blog}>
          <Col xs={24} md={18}>
            <Skeleton loading={loading} active avatar paragraph={{ rows: 22 }}>
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

export default Article;