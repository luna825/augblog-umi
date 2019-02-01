import React from 'react';
import RenderAuthorized from '@/components/Authorized';
import Redirect from 'umi/redirect';

const Authorized = RenderAuthorized();

export default ({ children }) => (
  <Authorized authority={children.props.route.authority} noMatch={<Redirect to="/login" />}>
    {children}
  </Authorized>
);
