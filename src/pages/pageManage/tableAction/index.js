import React from 'react';
import ZEle from 'zero-element';
// import useBreadcrumb from '@/framework/useBreadcrumb';
import config from './config';
import { PageHeader } from 'antd';
import { useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';
import switchEndpoint from '@/components/switchEndpoint';

export default function TableAction() {
  // useBreadcrumb([
  //   { title: '首页', path: '/' },
  //   { title: '页面管理', path: '/pageManage' },
  //   { title: '列表 actions 编辑' },
  // ]);
  useWillUnmount(switchEndpoint);

  return <PageHeader
    title="列表 actions 编辑"
    ghost={false}
    onBack={() => window.history.back()}
  >
    <ZEle namespace="gen" config={config} />
  </PageHeader>
};
