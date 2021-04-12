import React from 'react';
import ZEle from 'zero-element';
import useBreadcrumb from '@/framework/useBreadcrumb';
import config from './config/Role/index.config';

export default function Role(props) {
  useBreadcrumb(props, [
    { title: '首页', path: '/' },
    { title: '系统管理' },
    { title: '角色' },
  ]);

  return <ZEle namespace='role' config={config} />;
}