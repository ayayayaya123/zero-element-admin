const formFields = require('./form.config');
const editFormFields = require('./editForm.config');

module.exports = {
  layout: 'Content',
  title: '组织管理',
  items: [
    {
      layout: 'Empty',
      component: 'Search',
      config: {
        share: 'org',
        fields: [

          { field: 'search', label: '搜索', type: 'input' ,placeholder: '部门名 编号', }
        ],
      },
    },
    {
      layout: 'Empty',
      component: 'TreeTable',
      config: {
        share: 'org',
        API: {
          listAPI: '/api/sys/org',
          appendAPI: '/api/sys/org/<id>/kid',
          deleteAPI: '/api/sys/org/(id)'
        },
        actions: [],
        fields: [
          { field: 'name', label: '组织机构层级' },
         /* { field: 'orgCode', label: '编号' },*/
          {
            field: 'orgType', label: '分类', valueType: 'tag',
            align: 'center',
            options: {
              map: {
                0: '平台',
                1: '集团',
                2: '公司',
                3: '分公司',
                4: '部门',
                5: '工作组',
              },
              colorMap: {
                0:'#3399CC',
                1: '#08979c',
                2: '#874d00',
                3: '#10239e',
                4: '#391085',
                5: '#092b00',
              },
            },
          },
/*          { field: 'userName', label: '负责人' },
          { field: 'phone', label: '电话' },*/
          /*{
            field: 'deptCount', label: '部门人数',
            align: 'right',
          },
          {
            field: 'employeeCount', label: '总人数',
            align: 'right',
          },*/
          {
            field: 'status', label: '状态',
            valueType: 'tag',
            options: {
              map: {}
            }
          },
          // { field: 'fullName', label: '完整名称' },
          { field: 'note', label: '备注' },
        ],
        operation: [
          {
            title: '编辑', type: 'modal',
            options: {
              modalTitle: '编辑组织',
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
                      getAPI: '/api/sys/org/(id)',
                      updateAPI: '/api/sys/org/(id)',
                    },
                    fields: editFormFields,
                  }
                }
              ]
            }
          },
          {
            title: '新增子组织', type: 'modal', options: {
              "outside": true,
              // field: 'pid',
              // value: 'IS_NOT_NULL',
              modalTitle: '新增子组织',
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
                      createAPI: '/api/sys/org/(id)/children',
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
