import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Icon, Divider } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './Center.less';

@connect(({ user, loading }) => ({
  currentUserLoading: loading.effects['user/fetchCurrent'],
  currentUser: user.currentUser,
  postsInfo: user.postsInfo,
}))
class Center extends PureComponent {
  componentDidMount() {
    const { dispatch, currentUser } = this.props;
    if (currentUser && Object.keys(currentUser).length) {
      dispatch({
        type: 'user/fetchCurrentuserPosts',
        payload: currentUser.id,
      });
    }
  }

  componentDidUpdate(preprops) {
    const { dispatch, currentUser } = this.props;
    if (currentUser.id !== preprops.currentUser.id) {
      dispatch({
        type: 'user/fetchCurrentuserPosts',
        payload: currentUser.id,
      });
    }
  }

  render() {
    const { currentUser, currentUserLoading, children } = this.props;
    return (
      <GridContent>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card bordered={false} style={{ marginBottom: 24 }} loading={currentUserLoading}>
              {currentUser && Object.keys(currentUser).length ? (
                <div>
                  <div className={styles.avatarHolder}>
                    <img alt="" src={currentUser.avatar} />
                    <div className={styles.name}>{currentUser.nickname}</div>
                  </div>
                  <div className={styles.detail}>
                    {currentUser.about_me && (
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
                    <a href="https://github.com/luna825" target="_blank">
                      <Icon type="github" /> Github
                    </a>
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
