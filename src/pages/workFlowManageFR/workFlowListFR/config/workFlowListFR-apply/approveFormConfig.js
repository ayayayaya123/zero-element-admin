
module.exports = {
    
    fields: [
        { field: '_group', type: 'group-title', defaultValue: '审批信息' },
        {
            field: 'currentUserId', label: '经办人', type: 'modal-radio',
            props: {},
            rules: ['required'],
            options: {
                title: '选择经办人',
                label: 'name',
                editLabel: 'currentUserName',
                value: 'id',
                pagination: true,
                API: '/api/adm/users',
                fields: [
                    {
                        label: '经办人名字',
                        field: 'name'
                    },
                    {
                        label: '联系电话',
                        field: 'phone'
                    }
                ]
            }
        },
        {
            label: '转交步骤', field: 'currentStepId', type: 'dynamic_radio',
            options: [
                { label: '开始', value: 'START' },
                { label: '中间', value: 'BY_ROUNDS' },
                { label: '结束', value: 'CLOSE' },
            ],
            rules: ['required']
        },
        {
            label: '办理意见', field: 'currentStepName', type: 'text-area',
            span: 12,
            props: {
                autoSize: {
                    minRows: 3,
                }
            }
        },
        {
            label: '上传文件',
            field: 'attachments',
            type: 'direct-upload',
            span: 24,
            options: {
                title: '点击上传',
                API: ''
            }
        }
    ]
}