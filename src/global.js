/* eslint-disable no-unused-vars */
import model from '@/models';
import zeroAntd from './zero-antd-dep';

import { history } from 'umi';
import { getModel } from 'zero-element/lib/Model';

import { set as golbalSet } from 'zero-element/lib/config/global';
import { set as APIConfig } from 'zero-element/lib/config/APIConfig';

import { set as setEndpoint } from 'zero-element/lib/utils/request/endpoint';
import { saveToken, removeToken } from 'zero-element/lib/utils/request/token';

import { set as LayoutSet } from 'zero-element/lib/config/layout';
import { set as CSet } from 'zero-element/lib/config/container';
import { set as LASet } from 'zero-element/lib/config/listAction';
import { set as FITSet } from 'zero-element/lib/config/formItemType';
import { set as AITSet } from 'zero-element/lib/config/actionItemType';
import { set as VTSet } from 'zero-element/lib/config/valueType';

import { message } from 'antd';

import onPath from '@/listAction/onPath';

import path from '@/actionItemType/path';
import tabs from '@/actionItemType/tabs';

import ProjectDetail from '@/container/ProjectDetail';
import EditList from '@/container/EditList';

// import DnDPdfEdit from 'zero-element-antd-dpe';
// import zeroDesign from 'zero-element-plugin-design';

import './rewrite.less';

const globalModel = getModel('global');

APIConfig({
  'DEFAULT_current': 1,
  'DEFAULT_pageSize': 10,

  'REQUEST_FIELD_current': 'pageNum',
  'REQUEST_FIELD_pageSize': 'pageSize',
  'REQUEST_FIELD_field': 'orderBy',
  'REQUEST_FIELD_order': 'sort',
  'REQUEST_FIELD_ascend': 'ASC',
  'REQUEST_FIELD_descend': 'DESC',

  'RESPONSE_FIELD_current': 'current',
  'RESPONSE_FIELD_pageSize': 'size',
  'RESPONSE_FIELD_total': 'total',
  'RESPONSE_FIELD_records': 'records',
});
golbalSet({
  tempEndpoint: '', // 开发环境下, 临时切换 pageManage 的 endpoint
  router: (path) => {
    history.push(path);
  },
  goBack: () => {
    history.goBack();
  },
  Unauthorized: () => {
    removeToken();
    history.push('/login');
  },
  getPerm() {
    return globalModel.getPerm();
  },
  RequestError: ({ data = {} }) => {
    if (data.errors && data.errors.length) {
      data.errors.forEach(msg => {
        message.error(JSON.stringify(msg));
      })
    } else {
      message.error(data.message || '无法连接服务器');
    }
  }
});


if (process.env.NODE_ENV === 'development') {

  setEndpoint('http://localhost:8000');
  saveToken({
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJvcmdJZCI6IjEwMDAwMDAwMDAwMDAwMDAxMCIsInVzZXJJZCI6Ijg3NjcwODA4MjQzNzE5NzgzMCIsInVzZXJUeXBlIjoxMDEsImJVc2VyVHlwZSI6IlNZU1RFTSIsInRlbmFudE9yZ0lkIjoxMDAwMDAwMDAwMDAwMDAwMTAsImFjY291bnQiOiJhZG1pbiIsImV4dHJhVXNlclR5cGUiOjEsImlhdCI6MTYwOTM4NzYwMSwianRpIjoiODc2NzA4MDgyNDM3MTk3ODMwIiwic3ViIjoiYWRtaW4iLCJleHAiOjE2MDk2NDY4MDF9.NR4FM6o-0sjcaMIicCe8-TPIsDojmgGxvfYhLF4BPpTCzyN5D9iQSpJMFHoHqLWQ7UQSGWU6fp_UG5U4S33HAA',
  });
}

LASet({
  'onPath': onPath,
});

CSet({
  'ProjectDetail': ProjectDetail,
  'EditList': EditList,
  // 'DnDFormEdit': zeroDesign.DnDFormEdit
});

AITSet({
  path,
  tabs,
});
