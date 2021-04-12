import React from 'react';
import ZEle from 'zero-element';
import config from './config/Logs/index.config';

export default function Logs() {
  return <ZEle namespace='logs' config={config} />;
}
