import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import styles from './GridContent.less';

class GridContent extends PureComponent {
  render() {
    const { contentWidth, children } = this.props;
    let className = `${styles.main}`;
    if (contentWidth === 'Fixed') {
      className = `${styles.main} ${styles.wide}`;
    }
    return <Layout className={className}>{children}</Layout>;
  }
}

export default connect(({ setting }) => ({
  contentWidth: setting.contentWidth,
}))(GridContent);
