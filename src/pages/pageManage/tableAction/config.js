module.exports = {
  layout: 'Empty',
  title: '编辑页面 action',
  items: [
    {
      component: 'Table',
      config: {
        API: {
          listAPI: '/api/json/gen/list/[id]/actions',
          deleteAPI: '/api/json/gen/list/[id]/actions/(id)',
        },
        actions: [
          {
            title: '新增', type: 'modal',
            options: {
              modalTitle: '新增 action',
              modalWidth: 400,
              items: [
                {
                  component: 'Form',
                  config: {
                    API: {
                      createAPI: '/api/json/gen/list/[id]/actions',
                    },
                    fields: [
                      { field: 'title', label: '名称', type: 'input' },
                      {
                        field: 'type', label: '类型', type: 'select',
                        options: [
                          { label: '路由', value: 'path' },
                          { label: '导入', value: 'import' },
                          { label: '导出', value: 'export' },
                        ]
                      },
                      { field: 'options', label: '配置', type: 'json' },
                    ]
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
                'path': '路由',
                'import': '导入',
                'export': '导出',
              },
              color: {
                'path': 'blue',
                'import': 'green',
              }
            }
          },
          // { field: 'options', label: '配置' },
        ],
        operation: [
          {
            title: '编辑', type: 'modal',
            options: {
              outside: true,
              items: [
                {
                  component: 'Form',
                  config: {
                    API: {
                      getAPI: '/api/json/gen/list/[id]/actions/(id)',
                      updateAPI: '/api/json/gen/list/[id]/actions/(id)',
                    },
                    fields: [
                      { field: 'title', label: '名称', type: 'input' },
                      {
                        field: 'type', label: '类型', type: 'select',
                        options: [
                          { label: '路由', value: 'path' },
                          { label: '导入', value: 'import' },
                          { label: '导出', value: 'export' },
                        ]
                      },
                      { field: 'options', label: '配置', type: 'json' },
                    ]
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
