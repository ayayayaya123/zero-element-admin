import React from 'react';
import { history } from 'umi';
import win from 'zero-element/lib/utils/window';

export default function () {

  // if (win.ZEle.indexPage) {
  //   history.push(win.ZEle.indexPage);
  // }

  
  history.push('/masterResource');

  return (
    <div>
      首页
    </div>
  );
}
