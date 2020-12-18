import React from 'react';
import ZEle from 'zero-element';


export default function PageAPI({ uuid, menuId }) {
  const config = {
    items: [
      {
        component: 'Form',
        config: {
          API: {
            getAPI: `/api/generate/page/${uuid}/menu/${menuId}`,
            updateAPI: `/api/generate/page/crudapi/${uuid}/menu/${menuId}`,
          },
          fields: [
            { field: 'name', label: '页面名称', type: 'input' },
            {
              field: 'crudAPI', label: 'CRUD API', type: 'input',
              props: {
                placeholder: '例如: /api/crud/test'
              }
            }
          ]
        }
      }
    ]
  };

  return <ZEle namespace="gen" config={config} />;
}