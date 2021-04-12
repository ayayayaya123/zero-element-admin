module.exports = {
    label: '',
    field: 'history',
    type: 'one-mary',
    span: 24,
    options: {
      actions: [ ],
      fields: [
        { label: '步骤名称', field: 'stepName', valueType: 'plain' },
        { label: '经办人', field: 'userName', valueType: 'plain' },
        {
          field: 'result', label: '处理结果', valueType: 'tag',
          options: {
            map: {
              INITED: '申请',
              HANDLING: '审核',
              HANDLED_APPROVED: '通过',
              HANDLED_REJECTED: '拒绝',
              HANDLED_ROLLBACK: '驳回'
            },
            // colorMap: {
              // '0': '#ff2233',
              // '1': '',
            // }
          }
        },
        { label: '处理意见', field: 'comment', valueType: 'plain' },
        { label: '处理时间', field: 'handleTime', valueType: 'plain' },
        { label: '文件信息', field: 'attchments', valueType: 'plain' },
      ],
      operation: [ ],
    }
  }