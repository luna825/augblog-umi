import React, { memo } from 'react';
import Link from 'umi/link';
import { Card, List } from 'antd';

const { Item } = List;

export default memo(({ posts }) => (
  <>
    <Card bordered={false} style={{ marginTop: 24 }} bodyStyle={{ padding: '8px 32px 32px 32px' }}>
      <List
        size="large"
        rowKey="id"
        itemLayout="vertical"
        dataSource={posts}
        renderItem={item => (
          <Item key={item.id}>
            <Item.Meta title={<Link to={`/post/${item.id}`}>{item.title}</Link>} />
            {item.body}
          </Item>
        )}
      />
    </Card>
  </>
));
