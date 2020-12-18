import React from 'react';
import ZEle from 'zero-element';
import useBreadcrumb from '@/framework/useBreadcrumb';
import config from './config';
import { PageHeader } from 'antd';

export default function TableAction() {
  useBreadcrumb([
    { title: '首页', path: '/' },
    { title: '页面管理', path: '/pageManage' },
    { title: '列表 operation 编辑' },
  ]);

  return <PageHeader
    title="列表 operation 编辑"
    ghost={false}
    onBack={() => window.history.back()}
  >
    <ZEle namespace="gen" config={config} />
  </PageHeader>
};
