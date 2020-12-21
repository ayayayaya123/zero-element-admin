module.exports = {
  title: '编辑表单',
  items: [
    {
      component: 'DnDFormEdit',
      config: {
        API: {
          getAPI: '/api/json/gen/form/[id]/update',
          updateAPI: '/api/json/gen/form/[id]/update',
        }
      },
    },
  ],
};
