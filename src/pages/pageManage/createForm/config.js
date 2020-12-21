module.exports = {
  title: '新增表单',
  items: [
    {
      component: 'DnDFormEdit',
      config: {
        API: {
          getAPI: '/api/json/gen/form/[id]/create',
          updateAPI: '/api/json/gen/form/[id]/create',
        }
      },
    },
  ],
};
