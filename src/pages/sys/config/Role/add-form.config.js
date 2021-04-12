
module.exports = {
  layout: 'BaseTitle',
  title: '添加角色',
  items: [
    {
      layout: 'Content',
      component: 'Form',
      config: {
        share: 'role',
        API: {
          createAPI: '/api/adm/roles',
        },
        fields: [
          {
            field: 'name', label: '角色名', type: 'input',
            rules: ['required'],
          },
          { field: 'tips', label: '描述', type: 'text-area' },
          { field: 'permIds', label: '', type: 'perm' },
        ],
      },
    },
  ],
};
