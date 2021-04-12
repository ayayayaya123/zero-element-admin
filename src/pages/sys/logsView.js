import React from 'react';
import Details from '@/components/Details';
import Content from '@/layouts/Content';
import { Typography } from 'antd';

export default function CategroyView(props) {

  return <Content>
    <Details
      goBack
      namespace="logs"
      API="/api/logs/[id]"
      col={1}
      fields={[
        { label: '操作模块', field: 'module' },
        { label: '操作方法', field: 'method' },
        { label: '操作人员', field: 'userName' },
        { label: '操作时间', field: 'createTime' },
        { label: '操作内容', field: 'logName' },
        { type: 'group', value: '响应数据', span: 24 },
        {
          label: '', field: 'message', span: 24,
          render: (value) => <Typography code>{value}</Typography>
        },
      ]}
    />
  </Content>;
}
