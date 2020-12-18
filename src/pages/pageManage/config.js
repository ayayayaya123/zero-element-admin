module.exports = {
  layout: 'Empty',
  items: [
    {
      component: 'ProjectDetail',
      config: {
        API: {},
        tree: {
          API: {
            initAPI: '/api/json/gen/list',
            // appendAPI: '',
            // searchAPI: '',
          },
        },
        actions: [],
        fields: [],
      },
    },
  ],
};
