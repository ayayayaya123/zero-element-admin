module.exports = {
  layout: 'Content',
  title: '数据服务',
  items: [
    {
      component: 'Search',
      config: {
        fields: [
          {
            field: 'name', label: '表单名称', type: 'input',
            props: {
              placeholder: '请输入',
            }
          }
        ],
      },
    },
    {
      component: 'TreeList',
      config: {
        API: {
          listAPI: '/api/crud/eavEntityType/eavEntityTypes/entity?entityType=CRUD_FORM&typeId=<id>',
          deleteAPI: '/api/eav/entities/(id)'
        },
        tree: {
          API: {
            initAPI: '/api/crud/eavEntityType/eavEntityTypes/groupType',
            appendAPI: undefined,
          }
        },
        actions: [
          // {
          //   title: '添加', type: 'modal',
          //   options: {
          //     modalTitle: '添加用户',
          //     modalWidth: 900,
          //     items: [
          //       {
          //         component: 'Form',
          //         config: {
          //           layout: 'Grid',
          //           API: {
          //             createAPI: '/api/crud/cinema/user'
          //           },
          //           fields: formFields,
          //         }
          //       }
          //     ]
          //   }
          // }
          {
            "title": "新增",
            "type": "path",
            "options": {
              style: "primary",
              "path": "/formCustom/activitiesCustom/activitiesCustom-add"
            }
          },
        ],
        fields: [
          { field: 'name', label: '表单名称' },
          { field: 'note', label: '备注' },
        ],
        operation: [
          // {
          //   title: '编辑', type: 'modal',
          //   options: {
          //     modalTitle: '编辑用户',
          //     modalWidth: 800,

          //     layout: 'Empty',
          //     items: [
          //       {
          //         layout: 'Empty',
          //         component: 'Form',
          //         config: {
          //           layout: 'Grid',
          //           API: {
          //             getAPI: '/api/adm/users/(id)',
          //             updateAPI: '/api/adm/users/(id)',
          //           },
          //           fields: editFormFields,
          //         }
          //       }
          //     ]
          //   }
          // },
          {
            title: '数据管理', type: 'path',
            options:{
              outside: true,
              path: "/formCustom/activitiesCustom/activitiesCustom-dataManage"
            }
          },
          {
            title: '设计', type: 'path',
            options:{
              outside: true,
              path: "/formCustom/activitiesCustom/activitiesCustom-design"
            }
          },
          {
            title: '编辑', type: 'path',
            options:{
              outside: true,
              path: "/formCustom/activitiesCustom/activitiesCustom-edit"
            }
          },
          {
            title: '删除', type: 'delete'
          }
        ]
      },
    },
  ],
};
