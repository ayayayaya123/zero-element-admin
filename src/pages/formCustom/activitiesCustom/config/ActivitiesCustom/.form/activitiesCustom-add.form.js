const API = require('../.setting/activitiesCustom.js');

module.exports = {
  "layout": "BaseTitle",
  "title": "新增",
  "items": [
    {
      "layout": "Content",
      "component": "custom_form_fr",
      "config": {
        "layout": "Grid",
        "layoutConfig": {
          
          "value": [12, 12]
        },
        "fields": [
          {
            "label": "表单标识",
            "field": "entityName",
            "type": "input",
            "props": {
              "placeholder": "请输入……"
            },
            "rules": [
              "required"
            ]
          },
          {
            "label": "表单名称",
            "field": "name",
            "type": "input",
            "props": {
              "placeholder": "请输入……"
            },
            "rules": [
              "required"
            ],
            span: 24,
          },
          {
            "label": "类别",
            span: 24,
            "field": "typeId",
            "type": "modal-radio",
            "props": {},
            "rules": [
              "required"
            ],

            "options": {
              "title": "选择类别",
              "label": "name",
              "editLabel": "typeName",
              "value": "id",
              pagination: true,
              "API": "/api/crud/eavEntityType/eavEntityTypes",
              "fields": [
                {
                  "label": "名称",
                  "field": "name",
                  valueType: 'ellipsis'
                },
                {
                  "label": "备注",
                  "field": "note",
                  valueType: 'ellipsis'
                },
              ]
            }
          },
          {
            "label": "备注",
            "field": "note",
            "type": "text-area",
            "props": {
              "placeholder": "请输入……"
            },
            "rules": [],
            "span": 12
          },
          {
            "label": "",
            "type": "hidden",
            "field": "entityType",
            "value": "CRUD_FORM"
          }
        ],
        "API": {
          createAPI: API.createAPI
        },
        otherProps:{
          nextBtn: '下一步',
          nextPageUrl: '/workFlowManageFR/activitiesFR/activitiesFR-schema',
        }
      }
    },
  ],
  "id": "8lw4lj1f"
}
