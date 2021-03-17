import React, { useMemo, useState } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'umi';
import menuData from '@/config/router.config';
import { getModel } from 'zero-element/lib/Model';

const router = [...menuData];

export default ({ path, breadcrumb }) => {

  const menuConfigModel = getModel('menuConfig');
  const { menuTree } = menuConfigModel;
  const [firstLoadMenu, setFirstLoadMemu] = useState(0);
  // console.log('menuTree = ', menuConfigModel.getMenuTree());
  // router.push(...menuConfigModel.getMenuTree());

  if(Array.isArray(menuTree) && firstLoadMenu == 0){
    router.push(...menuTree);
    setFirstLoadMemu(1)
  }

  const pathAry = useMemo(() => {
    const arr = path.split("\/");
    const rst = [];
    arr.shift();
    arr.push('');
    arr.forEach((key, i) => {
      rst.push(`/${arr.slice(0, i).join('/')}`);
    });
    if (rst[1] === '/') {
      rst.splice(1, 1);
    }
    // rst[rst.length - 1] = rst[rst.length - 1].replace(/[_-](add|edit|view)$/g, '');
    rst[rst.length - 1] = rst[rst.length - 1];

    return rst;

  }, [path]);

  if (breadcrumb.length) {
    return <Breadcrumb className="ZEleA-Breadcrumb-margin">
      {breadcrumb.map((item, i) => {
        return <Breadcrumb.Item key={i}>
          {item.path ? (
            <Link to={item.path}>
              {item.title}
            </Link>
          ) : (
              item.title
            )}
        </Breadcrumb.Item>;
      })}
    </Breadcrumb>
  }

  return <Breadcrumb className="ZEleA-Breadcrumb-margin">
    {pathAry.map((path, i) => {
      if (path === '/') {
        return <Breadcrumb.Item key={path}>
          <Link to="/">首页</Link>
        </Breadcrumb.Item>;
      }
      return <Breadcrumb.Item key={path}>
        {/[_-](add|edit|view)$/.test(path) ?
          <span>{findPath(path, router).name}</span>
          : (
            <Link to={path}>
              {findPath(path, router).name}
            </Link>
          )}
      </Breadcrumb.Item>;
    })}
  </Breadcrumb>
}


const typeMap = {
  add: '新增',
  edit: '编辑',
  view: '详情',
};
function findPath(path, router) {
  const queue = [...router];
  let rst = {};

  if (path) {
    while (queue.length) {
      const route = queue.shift();
      if (route.path === path) {
        rst = route;
        break;
      }
      if (route.items) {
        queue.push(...route.items);
      }
    }
    if (!rst.name) {
      rst.name = findPath(path.replace(/\/[-\w]+$/, ''), router).name;
      const type = /[_-](add|edit|view)$/.exec(path);
      if (type) {
        rst.name = `${rst.name}${typeMap[type[1]]}`;
      }
    }
  }

  return rst;
}