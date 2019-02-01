import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import { GlobalFooter } from 'ant-design-pro';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'Blog 首页',
          title: 'Blog 首页',
          href: 'https://www.moonyue.club',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <Icon type="github" />,
          href: 'https://github.com/luna825',
          blankTarget: true,
        },
        {
          key: 'August Blog',
          title: 'August Blog',
          href: 'https://www.moonyue.club',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          2019 August出品 <Icon type="copyright" /> 渝ICP备18000844号-1
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
