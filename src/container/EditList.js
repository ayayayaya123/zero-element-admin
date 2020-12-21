import React from 'react';
import { withRouter, history } from 'umi';
import { Space, Button } from 'antd';

export default withRouter(function EditList(props) {
  const { namespace, location } = props;

  function handleRoute(path) {
    history.push({
      pathname: path,
      query: {
        id: location.pathname.replace(/^\//, ''),
      }
    })
  }

  return <Space>
    <Button type="primary" onClick={handleRoute.bind(null, '/pageManage/tableFields')}>编辑字段</Button>
    <Button type="dashed" onClick={handleRoute.bind(null, '/pageManage/tableAction')}>编辑 Action</Button>
    <Button type="dashed" onClick={handleRoute.bind(null, '/pageManage/tableOperation')}>编辑 Operation</Button>
    <Button onClick={handleRoute.bind(null, '/pageManage/createForm')}>编辑[新建]表单</Button>
    <Button onClick={handleRoute.bind(null, '/pageManage/editForm')}>编辑[编辑]表单</Button>
  </Space>
}
)