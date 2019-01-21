import React, { Component } from 'react';
import { Checkbox, Alert } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { connect } from 'dva';
import Login from '@/components/Login';
import styles from './login.less';

const { UserName, Password, Submit } = Login;

@connect(({ auth, loading }) => ({
  auth,
  submitting: loading.effects['auth/login'],
}))
class LoginPage extends Component {
  state = {
    autoLogin: true,
    type: 100,
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'auth/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { autoLogin } = this.state;
    const { submitting, login = {} } = this.props;
    return (
      <div className={styles.main}>
        {login.error &&
          !submitting &&
          this.renderMessage(formatMessage({ id: 'app.login.message-invalid-credentials' }))}
        <Login
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <UserName name="account" />
          <Password name="secret" />
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="app.login.remember-me" />
            </Checkbox>
            <a style={{ float: 'right' }} href="">
              <FormattedMessage id="app.login.forgot-password" />
            </a>
          </div>
          <Submit loading={submitting}>
            <FormattedMessage id="app.login.login" />
          </Submit>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
