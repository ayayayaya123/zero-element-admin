import React from 'react';
import TableFields from './components';
import useBreadcrumb from '@/framework/useBreadcrumb';
import { update } from 'zero-element-antd/lib/utils/request';

export default function (props) {
  const { location } = props;

  useBreadcrumb([
    { title: '首页', path: '/' },
    { title: '页面管理', path: '/pageManage' },
    { title: '列表字段编辑' },
  ]);

  function handleSubmit(data) {
    const fAPI = `/api/json/gen/list/${encodeURIComponent(location.query.id)}`;

    return update(fAPI, data);
  }

  return <TableFields
    title="列表字段编辑"
    onSubmit={handleSubmit}
  />;
}