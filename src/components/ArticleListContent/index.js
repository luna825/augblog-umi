import React from 'react';
import moment from 'moment';
import { Avatar } from 'antd';
import styles from './index.less';

const formatBody = (body) => {
  try {
    const bodyObj = JSON.parse(body)
    const text = bodyObj.blocks.map(block => block.text).join(' ')
    return text;
  } catch(e){
    return body
  }
}

const ArticleListContent = ({ data: { body, timestamp, author } }) => (
  <div className={styles.listContent}>
    <p className={styles.description}>{`${formatBody(body).slice(0, 150)}...`}</p>
    <div className={styles.extra}>
      <Avatar src={author.avatarUrl} />
      <a>{author.nickname}</a>
      <em>{moment(timestamp).format('YYYY-MM-DD HH:mm')}</em>
    </div>
  </div>
);

export default ArticleListContent;
