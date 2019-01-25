import React from 'react';
import moment from 'moment';
import { Avatar } from 'antd';
import styles from './index.less';

const ArticleListContent = ({ data: { body, timestamp, avatar, author } }) => (
  <div className={styles.listContent}>
    <p className={styles.description}>{body}</p>
    <div className={styles.extra}>
      <Avatar src={avatar} />
      <a>{author}</a>
      <em>{moment(timestamp).format('YYYY-MM-DD HH:mm')}</em>
    </div>
  </div>
);

export default ArticleListContent;
