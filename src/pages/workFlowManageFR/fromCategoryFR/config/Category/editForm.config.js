module.exports = [
  {
    field: 'name', label: '表单名称', type: 'input',
    span: 24,
    rules: ['required'],
  },
  {
    field: 'note', label: '备注', type: 'text-area',
    span: 16,
    props: {
      autoSize: {
        minRows: 3,
      }
    }
  },
]
