import React from 'react';
import ZEle from 'zero-element';
import useBreadcrumb from '@/framework/useBreadcrumb';
import config from './config/dictionaryConfig.js';

export default function Dictionary(props) {
  useBreadcrumb(props, [
    { title: '首页', path: '/' },
    { title: '系统管理' },
    { title: '数据字典' },
  ]);

  return <ZEle namespace='dictionary' config={config} />;
}