module.exports = [
  {
    field: 'title', label: '名称', type: 'input',
    rules: ['required']
  },
  {
    field: 'type', label: '类型', type: 'select',
    options: [
      { label: '上移', value: 'moveUp' },
      { label: '下移', value: 'moveDown' },
      { label: '网络请求', value: 'request' },
      { label: '路由', value: 'path' },
      { label: '删除', value: 'delete' },
      { label: '模态框', value: 'modal' },
    ],
    rules: ['required']
  },
  {
    field: ['options', 'outside'], label: '操作位置', type: 'radio',
    options: [
      { label: '显示在外', value: true },
      { label: '收起', value: false },
    ],
  },
  {
    field: ['options', 'method'], label: '请求方式', type: 'select',
    options: [
      { label: 'GET', value: 'get' },
      { label: 'POST', value: 'post' },
      { label: 'PUT', value: 'put' },
      { label: 'DELETE', value: 'delete' },
    ],
    expect: {
      field: 'type',
      value: 'request',
    },
    rules: ['required']
  },
  {
    field: ['options', 'API'], label: 'API', type: 'text-area',
    expect: {
      field: 'type',
      value: '/(request)/',
    },
    props: {
      placeholder: '例如: /api/test/(id)',
    },
    rules: ['required']
  },
  {
    field: ['options', 'API'], label: 'API', type: 'text-area',
    expect: {
      field: 'type',
      value: '/(delete)/',
    },
    props: {
      placeholder: '例如: /api/test/(id)',
    },
  },
  {
    field: ['options', 'path'], label: '跳转的路由', type: 'text-area',
    expect: {
      field: 'type',
      value: 'path',
    },
    props: {
      placeholder: '例如: /parent/child',
    },
    rules: ['required']
  },

  {
    field: ['options', 'modalTitle'], label: '模态框标题', type: 'input',
    expect: {
      field: 'type',
      value: 'modal',
    },
    rules: ['required']
  },
  {
    field: ['options', 'modalWidth'], label: '模态框宽度', type: 'number',
    expect: {
      field: 'type',
      value: 'modal',
    },
    rules: ['required']
  },
  {
    field: ['options', 'items'], label: 'items', type: 'json',
    options: {
      defaultValue: [],
    },
    expect: {
      field: 'type',
      value: 'modal',
    },
    rules: ['required']
  },


  // /api/crud/alliance/alliances/(id)/action/actionName
  { field: 'text_1', label: '', type: 'plain', value: '高级:' },
  {
    field: 'text_2', label: '', type: 'plain',
    value: '让该 operation 只在满足以下条件下才显示',
    style: {
      color: 'red',
      textAlign: 'center',
    }
  },
  { field: 'field', label: '预期字段', type: 'input' },
  { field: 'value', label: '预期值', type: 'input' },
]