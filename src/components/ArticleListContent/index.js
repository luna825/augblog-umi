import React from 'react';
import moment from 'moment';
import { Avatar } from 'antd';
import styles from './index.less';

const ArticleListContent = ({ data: { body, timestamp, author } }) => (
  <div className={styles.listContent}>
    <p className={styles.description}>{body}</p>
    <div className={styles.extra}>
      <Avatar src={author.avatarUrl} />
      <a>{author.nickname}</a>
      <em>{moment(timestamp).format('YYYY-MM-DD HH:mm')}</em>
    </div>
  </div>
);

export default ArticleListContent;
