import React from 'react';
import { Layout, Button } from 'antd';
// import useBreadcrumb from '@/framework/useBreadcrumb';
import TitleContent from '@/components/TitleContent';
import ZEle from 'zero-element';
import { history } from 'umi';

import config from './config';

const { Content } = Layout;

export default function PageManage() {
  // useBreadcrumb([
  //   { title: '首页', path: '/' },
  //   { title: '页面管理' },
  // ]);

  function handleRoute() {
    history.push({
      pathname: '/pageManage/tableFieldsCreate',
    });
  }

  return <TitleContent title="页面管理">
    <Content style={{
      padding: 8,
      background: '#fff',
    }}>
      <ZEle namespace="gen" config={config} />
    </Content>
    <>
      <Button onClick={handleRoute}>新建页面</Button>
    </>
  </TitleContent>
}