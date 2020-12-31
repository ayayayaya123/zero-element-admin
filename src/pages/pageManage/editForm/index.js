import React from 'react';
import ZEle from 'zero-element';
import config from './config';
// import useBreadcrumb from '@/framework/useBreadcrumb';
import { useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';
import switchEndpoint from '@/components/switchEndpoint';

export default () => {
  // useBreadcrumb([
  //   { title: '首页', path: '/' },
  //   { title: '页面管理', path: '/pageManage' },
  //   { title: '编辑表单编辑' },
  // ]);
  useWillUnmount(switchEndpoint)
  return <ZEle namespace="gen" config={config} />;
};
