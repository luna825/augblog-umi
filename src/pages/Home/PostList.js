import React, { memo } from 'react';
import Link from 'umi/link';
import { Card, List } from 'antd';
import PostListContent from '@/components/PostListContent/PostListContent';

const { Item } = List;

export default memo(({ posts, loading }) => (
  <>
    <Card bordered={false} bodyStyle={{ padding: '8px 32px 32px 32px' }}>
      <List
        size="large"
        rowKey="id"
        itemLayout="vertical"
        loading={posts.length === 0 ? loading : false}
        dataSource={posts}
        renderItem={item => (
          <Item key={item.id}>
            <Item.Meta title={<Link to={`/post/${item.id}`}>{item.title}</Link>} />
            <PostListContent data={item} />
          </Item>
        )}
      />
    </Card>
  </>
));
