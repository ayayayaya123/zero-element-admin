import React from 'react';
import { Tabs } from 'antd';
import Content from '@/layouts/Content';
import ZEle from 'zero-element';
import useBreadcrumb from '@/framework/useBreadcrumb';
import config from './config/settingConfig.js';
import dConfig from './config/dictionaryConfig.js';

const { TabPane } = Tabs;

export default function Term(props) {

  useBreadcrumb(props, [
    { title: '首页', path: '/' },
    { title: '系统管理' },
    { title: '系统配置' },
  ]);
  function handleChangeTabPane(key) {
  }

  return <Content>
    <Tabs
      destroyInactiveTabPane
      onChange={handleChangeTabPane}
    >
      <TabPane tab="系统配置" key="sys">
        <ZEle namespace='setting_sys' config={config} />
      </TabPane>
      <TabPane tab="数字字典" key="dict">
        <ZEle namespace='setting_dist' config={dConfig} />
      </TabPane>
    </Tabs>
  </Content>
}