const formFields = require('./form.config');
const editFormFields = require('./editForm.config');

module.exports = {
  layout: 'Content',
  title: '表单分类',
  items: [
    {
      layout: 'Empty',
      component: 'Search',
      config: {
        share: 'fromCategory',
        fields: [

          { field: 'name', label: '分类名称', type: 'input' ,placeholder: '请输入', }
        ],
      },
    },
    {
      layout: 'Empty',
      component: 'TreeTable',
      config: {
        share: 'fromCategory',
        API: {
          listAPI: '/api/crud/eavEntityType/eavEntityTypes/list',
          appendAPI: '',
          deleteAPI: '/api/crud/eavEntityType/eavEntityTypes/(id)'
        },
        actions: [
          {
            title: '添加', type: 'modal',
            options: {
              style: "primary",
              modalTitle: '添加用户',
              modalWidth: 900,
              items: [
                {
                  component: 'Form',
                  config: {
                    layout: 'Grid',
                    API: {
                      createAPI: '/api/crud/eavEntityType/eavEntityTypes'
                    },
                    fields: formFields,
                  }
                }
              ]
            }
          }
        ],
        fields: [
          { field: 'name', label: '分类名称' },
          { field: 'note', label: '备注' },
        ],
        operation: [
          {
            title: '编辑', type: 'modal',
            options: {
              modalTitle: '编辑',
              modalWidth: 640,
              outside: true,
              layout: 'Empty',
              items: [
                {
                  layout: 'Empty',
                  component: 'Form',
                  config: {
                    layout: 'Grid',
                    layoutConfig: {
                      value: [12, 12],
                    },
                    API: {
                      getAPI: '/api/crud/eavEntityType/eavEntityTypes/(id)',
                      updateAPI: '/api/crud/eavEntityType/eavEntityTypes/(id)',
                    },
                    fields: editFormFields,
                  }
                }
              ]
            }
          },
          {
            title: '新增子分类', type: 'modal', options: {
              "outside": true,
              // field: 'pid',
              // value: 'IS_NOT_NULL',
              modalTitle: '新增子分类',
              modalWidth: 640,
              layout: 'Empty',
              items: [
                {
                  layout: 'Grid',
                  component: 'Form',
                  config: {
                    layout: 'Grid',
                    layoutConfig: {
                      value: [12, 12],
                    },
                    API: {
                      createAPI: '/api/crud/eavEntityType/eavEntityTypes/(id)',
                    },
                    fields: formFields,
                  },
                }
              ],
            }
          },
          {
            title: '删除', type: 'delete',
            options: {
              field: 'pid',
              value: 'IS_NOT_NULL',
            }
          }
        ]
      },
    },
  ],
};
