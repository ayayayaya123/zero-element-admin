const setting = require('./workFlowTypeFR-setting.json');

module.exports = {
  layout: setting.layout.table,
  title: setting.pageName.table,
  items: [
    // process.env.NODE_ENV === 'development' ?
    //   {
    //     component: 'EditList',
    //   } : { component: 'Empty' },
    {
      component: 'Search',
      config: {
        fields: setting.searchFields,
      },
    },
    {
      layout: 'Empty',
      component: 'TreeTable',
      config: {
        share: 'fromCategory',
        API: {
          listAPI: setting.listAPI,
          appendAPI: '',
          deleteAPI: setting.deleteAPI,
        },
        actions: setting.tableActions,
        fields: setting.tableFields,
        operation: setting.tableOperation,
      },
    },
  ],
};
