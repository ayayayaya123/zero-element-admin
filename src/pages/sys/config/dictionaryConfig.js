
module.exports = {
  layout: 'Empty',
  // title: '数字字典管理',
  items: [
    {
      layout: 'Empty',
      component: 'Dictionary',
      config: {
        API: {
          listAPI: '/api/config/field/option/groups/<id>/data',
          // deleteAPI: '/api/config/field/tree/(id)'
        },
        tree: {
          API: {
            initAPI: '/api/config/field/option/tree',
            // appendAPI: '/api/config/field/options/<id>',
            // searchAPI: '/api/test',
          }
        },
      },
    },
  ],
};
