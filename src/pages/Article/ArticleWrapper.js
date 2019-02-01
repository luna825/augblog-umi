/* eslint-disable react/no-danger */
import 'github-markdown-css';
import React, { PureComponent } from 'react';
import { connect } from 'dva';

@connect()
class ArticleWrapper extends PureComponent {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'article/fetch',
      payload: `/api/v1/posts/${match.params.id}`,
    });
  }

  render() {
    const { children } = this.props;
    return <>{children}</>
  }
}

export default ArticleWrapper;
