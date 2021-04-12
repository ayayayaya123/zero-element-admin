const setting = require('./setting-page.json');
const applyFormFileds = require("./approveFormConfig");

module.exports = {
  layout: setting.layout.form,
  title: setting.pageName.edit,
  items: [
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
          submitBtnText: '提交',
          applyFormFileds: applyFormFileds.fields
        }
      },
    },
  ],
};
