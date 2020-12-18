const formFields = require('./formFields');

module.exports = {
  layout: 'Empty',
  title: '编辑页面 operation',
  items: [
    {
      component: 'Table',
      config: {
        API: {
          listAPI: '/api/json/gen/list/[id]/operation',
          deleteAPI: '/api/json/gen/list/[id]/operation/(id)',
        },
        actions: [
          {
            title: '新增', type: 'modal',
            options: {
              modalTitle: '新增 operation',
              modalWidth: 660,
              items: [
                {
                  component: 'Form',
                  config: {
                    API: {
                      createAPI: '/api/json/gen/list/[id]/operation',
                    },
                    fields: formFields,
                  }
                }
              ],
            }
          }
        ],
        fields: [
          { field: 'title', label: '名称' },
          {
            field: 'type', label: '类型', valueType: 'tag',
            options: {
              map: {
                'moveUp': '上移',
                'moveDown': '下移',
                'request': '网络请求',
                'path': '路由',
                'delete': '删除',
                'modal': '模态框',
              },
              color: {
                'moveUp': 'purple',
                'moveDown': 'purple',
                // 'request': '',
                'path': 'blue',
                'delete': '#f50',
              }
            }
          },
          { field: ['options', 'path'], label: '路由' },
          { field: ['options', 'method'], label: '请求方式' },
          { field: ['options', 'API'], label: 'API' },
        ],
        operation: [
          {
            title: '编辑', type: 'modal',
            options: {
              outside: true,
              modalTitle: '编辑 operation',
              modalWidth: 660,
              items: [
                {
                  component: 'Form',
                  config: {
                    layout: 'Grid',
                    layoutConfig: {
                      value: [24],
                    },
                    API: {
                      getAPI: '/api/json/gen/list/[id]/operation/(id)',
                      updateAPI: '/api/json/gen/list/[id]/operation/(id)',
                    },
                    fields: formFields
                  },
                }
              ]
            },
          },
          { title: '删除', type: 'delete' }
        ]
      },
    },
  ],
};
