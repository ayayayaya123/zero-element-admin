
module.exports = {
  layout: 'BaseTitle',
  title: '编辑角色',
  items: [
    {
      layout: 'Content',
      component: 'Form',
      config: {
        share: 'role',
        API: {
          getAPI: '/api/adm/roles/[id]',
          updateAPI: '/api/adm/roles/[id]',
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
