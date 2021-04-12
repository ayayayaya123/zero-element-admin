import React from 'react';
import ZEle from 'zero-element';
import config from './config/Org/index.config';

export default function Org() {
  return <ZEle namespace='org' config={config} />;
}
