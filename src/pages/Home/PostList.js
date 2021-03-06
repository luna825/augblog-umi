import React, { memo } from 'react';
import Link from 'umi/link';
import { Card, List, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import ArticleListContent from '@/components/ArticleListContent';
import styles from './postList.less';

const { Item } = List;

export default memo(({ articles, loading, handleInfiniteOnLoad }) => (
  <Card bordered={false} bodyStyle={{ padding: '8px 32px 32px 32px' }}>
    <InfiniteScroll
      initialLoad={false}
      pageStart={0}
      loadMore={() => handleInfiniteOnLoad(articles.links.next)}
      hasMore={!loading && !!articles.links.next}
    >
      <List
        size="large"
        rowKey="id"
        itemLayout="vertical"
        loading={loading}
        dataSource={articles.items}
        renderItem={item => (
          <Item key={item.id} extra={item.images ? <div className={styles.listItemExtra} /> : null}>
            <Item.Meta title={<Link to={`/posts/${item.id}`}>{item.title}</Link>} />
            <ArticleListContent data={item} />
          </Item>
        )}
      >
        {loading && articles.links.next && (
          <div className={styles.loadingContainer}>
            <Spin />
          </div>
        )}
      </List>
    </InfiniteScroll>
  </Card>
));
