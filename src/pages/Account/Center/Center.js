import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Icon, Divider } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './Center.less';

@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
class Center extends PureComponent {
  render() {
    const { currentUser, children } = this.props;
    return (
      <GridContent>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card bordered={false} style={{ marginBottom: 24 }}>
              {currentUser && Object.keys(currentUser).length ? (
                <div>
                  <div className={styles.avatarHolder}>
                    <img alt="" src={currentUser.avatarUrl} />
                    <div className={styles.name}>{currentUser.nickname}</div>
                  </div>
                  <div className={styles.detail}>
                    {currentUser.aboutMe && (
                      <p>
                        <i className={styles.title} />
                        {currentUser.about_me}
                      </p>
                    )}
                    {currentUser.location && (
                      <p>
                        <i className={styles.address} />
                        {currentUser.location}
                      </p>
                    )}
                  </div>
                  <Divider dashed />
                  <div className={styles.link}>
                    <div>
                      {' '}
                      <Icon type="mail" /> {currentUser.email}
                    </div>
                  </div>
                </div>
              ) : (
                'loding...'
              )}
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card>{children}</Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Center;
