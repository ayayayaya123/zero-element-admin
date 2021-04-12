module.exports = {
  layout: 'Content',
  title: '操作日志',
  items: [
    {
      layout: 'Empty',
      component: 'Search',
      config: {
        share: 'logs',
        layout: 'Items',
        fields: [
          {
            field: 'search', label: '搜索', type: 'input',
            style: {
              width: 280,
            },
            props: {
              placeholder: '模块, 人员, 内容',
            }
          },
          {
            field: 'createTime', label: '操作时间', type: 'range',
            span: 10,
            style: {
              width: 440,
            }
          },
        ],
      },
    },
    {
      layout: 'Empty',
      component: 'ReportTable',
      config: {
        share: 'logs',
        pageSize: 15,
        API: {
          listAPI: '/api/logs',
          // deleteAPI: '/api/logs/(id)'
        },
        actions: [],
        fields: [
          { field: 'module', label: '操作模块' },
          { field: 'userName', label: '操作人员' },
          { field: 'createTime', label: '操作时间' },
          { field: 'logName', label: '操作内容' },
        ],
        operation: [
          {
            title: '详情',
            type: 'path',
            options: {
              outside: true,
              path: '/sys/logsView',
            }
          }
        ]
      },
    },
  ],
};
