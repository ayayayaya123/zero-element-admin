import React from 'react';
import useBreadcrumb from '@/framework/useBreadcrumb';
import ZEle from 'zero-element';

const config = {
  layout: 'Content',
  title: '个人信息',
  items: [
    {
      layout: 'Empty',
      component: 'Form',
      config: {
        goBack: false,
        API: {
          getAPI: '/api/adm/users/userInfo',
          updateAPI: '/api/adm/users/self',
        },
        layout: 'Grid',
        layoutConfig: {
          value: [12, 12],
        },
        fields: [
          {
            field: 'avatar', label: '头像', type: 'upload-image',
            options: {
              // API: '/api/fs/uploadfile',
              type: 'text',
              max: 1,
            },
            span: 24,
          },
          { field: 'account', label: '账号', type: 'plain' },
          { field: 'name', label: '昵称', type: 'input' },
          {
            field: 'sex', label: '性别', type: 'radio',
            options: [
              { label: '男', value: 0 },
              { label: '女', value: 1 },
            ],
            span: 24  
          },
          { field: 'birthday', label: '生日', type: 'date' },
          
          { field: 'email', label: '邮箱', type: 'input', span: 24 },
        ]
      }
    }
  ]
};

export default function (props) {
  useBreadcrumb(props, [
    { title: '首页', path: '/' },
    { title: '个人中心' },
    { title: '修改个人信息' },
  ]);

  return <ZEle namespace='security_baseInfo' config={config} />

}