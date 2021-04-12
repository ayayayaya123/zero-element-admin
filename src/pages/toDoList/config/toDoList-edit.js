const setting = require('./toDoList-setting.json');
const applyFormFileds = require("./approveFormConfig");
const applyHistoryFileds = require("./approveHistory");

module.exports = {
  layout: setting.layout.form,
  title: setting.pageName.edit,
  items: [
    // {
    //   component: 'Form',
    //   config: {
    //     API: {
    //       getAPI: setting.getAPI,
    //       updateAPI: setting.updateAPI,
    //     },
    //     layout: 'Grid',
    //     layoutConfig: {
    //       value: Array(setting.columns).fill(~~(24 / setting.columns)),
    //     },
    //     fields: setting.updateFields || setting.formFields,
    //   },
    // },
    {
      component: 'custom_form',
      config: {
        API: {
          getAPI: setting.getAPI,
          updateApplyAPI: setting.updateApplyAPI,
          getApplyHistoryAPI: setting.getApplyHistoryAPI
        },
        layout: 'Grid',
        layoutConfig: {
          value: Array(setting.columns).fill(~~(24 / setting.columns)),
        },
        fields: setting.updateFields || setting.formFields,
        otherProps:{
          submitBtnText: '提交',
          isApplied: true,
          applyFormFileds: applyFormFileds.fields,
          applyHistoryFileds : applyHistoryFileds,
        }
      },
    },
  ],
};
