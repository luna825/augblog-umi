import React from 'react';
import { Spin, Icon } from 'antd';

Spin.setDefaultIndicator(<Icon type="loading" style={{ fontSize: 24 }} spin />);
// loading components from code split
// https://umijs.org/plugin/umi-plugin-react.html#dynamicimport
export default () => (
  <div style={{ paddingTop: 100, textAlign: 'center' }}>
    <Spin size="large" />
  </div>
);
