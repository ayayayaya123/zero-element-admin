import React from 'react';
import { withRouter, history } from 'umi';
import { Space, Button } from 'antd';
import switchEndpoint from '@/components/switchEndpoint';

export default withRouter(function EditList(props) {
  const { namespace, location } = props;

  console.log('location = ', location)

  function handleClick(path) {
    switchEndpoint();
    console.log('path = ', path)
    handleRoute(path);
  }
  function handleRoute(path) {
    history.push({
      pathname: path,
      query: {
        id: location.pathname.replace(/^\//, ''),
      }
    })
  }

  return <Space>
    <Button type="primary" onClick={handleClick.bind(null, '/pageManage/tableFields')}>编辑字段</Button>
    <Button type="dashed" onClick={handleClick.bind(null, '/pageManage/tableAction')}>编辑 Action</Button>
    <Button type="dashed" onClick={handleClick.bind(null, '/pageManage/tableOperation')}>编辑 Operation</Button>
    <Button onClick={handleClick.bind(null, '/pageManage/createForm')}>编辑[新建]表单</Button>
    <Button onClick={handleClick.bind(null, '/pageManage/editForm')}>编辑[编辑]表单</Button>
  </Space>
}
)