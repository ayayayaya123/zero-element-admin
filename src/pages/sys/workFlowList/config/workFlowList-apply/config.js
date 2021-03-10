const setting = require('./setting-page.json');
const stepTableSetting = require('./workFlowStep-table.json');

module.exports = {
  layout: setting.layout.form,
  title: setting.pageName.edit,
  items: [
    // {
    //   component: 'Table',
    //   config: {
    //     API: {
    //       listAPI: stepTableSetting.listAPI,
    //       deleteAPI: stepTableSetting.deleteAPI,
    //     },
    //     actions: stepTableSetting.tableActions,
    //     fields: stepTableSetting.tableFields,
    //     operation: stepTableSetting.tableOperation,
    //   },
    // },
    {
      component: 'custom_form',
      config: {
        API: {
          getAPI: setting.getAPI,
          createApplyAPI: setting.createApplyAPI,
          getFieldsAPI: setting.getFieldsAPI,
        },
        layout: 'Grid',
        layoutConfig: {
          value: Array(setting.columns).fill(~~(24 / setting.columns)),
        },
        fields: setting.updateFields || setting.formFields,
        otherProps:{
          submitBtnText: '提交'
        }
      },
    },
  ],
};
