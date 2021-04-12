import React from 'react';
import ZEle from 'zero-element';
import config from './config/User/index.config';

export default function User() {
  return <ZEle namespace='user' config={config} />;
}
