
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
            },
            expect: {
                field: 'passed',
                value: 'APPROVE',
            }
        },
        {
            label: '转交步骤', field: 'currentStepId', type: 'dynamic_radio',
            options: [
            ],
            rules: ['required'],
            expect: {
                field: 'passed',
                value: 'APPROVE',
            }
        },
        {
            label: '办理意见', field: 'passed', type: 'local_radio', 
            options: [
                { label: '同意', value: 'APPROVE' },
                { label: '回退', value: 'ROLLBACK' },
                { label: '拒绝', value: 'REJECT' },
            ],
            rules: ['required']
        },
        {
            label: '备注', field: 'node', type: 'text-area',
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
            },
            expect: {
                field: 'passed',
                value: 'APPROVE',
            }
        }
    ]
}