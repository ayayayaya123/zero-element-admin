export default {
  'GET /api/config': {
    "status": 1,
    "data": {
      "pageName": {
        "table": "表单模板管理",
        "new": "",
        "edit": ""
      },
      "listAPI": "/api/doc",
      "createAPI": "/api/doc",
      "getAPI": "/api/doc/[id]",
      "updateAPI": "/api/doc/[id]",
      "deleteAPI": "/api/doc/(id)",
      "getApplyHistoryAPI": "/api/wf/histories",
      "columns": 1,
      "createFields": [
        {
          "label": "上传文件",
          "span": 16,
          "rules": [
            {
              "type": "required"
            }
          ],
          "field": "urlList",
          "type": "upload_file_single",
          "options": {
            "title": "点击上传",
            "API": "/api/fs/uploadfile",
            "acceptType": ".docx"
          },
          "expect": {}
        }
      ],
      "updateFields": [
        {
          "field": "entityId",
          "label": "表单",
          "type": "modal-radio",
          "props": {},
          "rules": [],
          "options": {
            "title": "选择表单",
            "label": "name",
            "editLabel": "entityName",
            "value": "id",
            "pagination": true,
            "API": "/api/eav/entities",
            "fields": [
              {
                "label": "表单名称",
                "field": "name"
              },
              {
                "label": "备注",
                "field": "note"
              }
            ]
          }
        },
        {
          "label": "上传文件",
          "rules": [
            {
              "type": "required"
            }
          ],
          "field": "urlList",
          "span": 16,
          "type": "upload_file_single",
          "options": {
            "title": "点击上传",
            "API": "/api/fs/uploadfile",
            "acceptType": ".docx"
          },
          "expect": {}
        }
      ],
      "map": {},
      "layout": {
        "table": "Content",
        "form": "TitleContent"
      },
      "tableActions": [
        {
          "title": "新增打印模板",
          "type": "modal",
          "options": {
            "style": "primary",
            "modalTitle": "新增",
            "modalWidth": 600,
            "items": [
              {
                "component": "Form",
                "config": {
                  "layout": "Grid",
                  "layoutConfig": {
                    "value": [
                      24
                    ]
                  },
                  "API": {
                    "createAPI": "/api/doc"
                  },
                  "fields": [
                    {
                      "label": "上传文件",
                      "span": 16,
                      "rules": [],
                      "field": "urlList",
                      "type": "upload_file_single",
                      "options": {
                        "title": "点击上传",
                        "API": "/api/fs/uploadfile",
                        "acceptType": ".docx, .doc"
                      },
                      "expect": {}
                    }
                  ]
                }
              }
            ]
          }
        }
      ],
      "tableOperation": [
        {
          "title": "上传pdf",
          "type": "modal",
          "options": {
            "outside": true,
            "style": "primary",
            "modalTitle": "上传pdf",
            "modalWidth": 600,
            "items": [
              {
                "component": "Form",
                "config": {
                  "layout": "Grid",
                  "layoutConfig": {
                    "value": [
                      24
                    ]
                  },
                  "API": {
                    "getAPI": "/api/doc/(id)",
                    "updateAPI": "/api/doc/(id)"
                  },
                  "fields": [
                    {
                      "label": "上传文件",
                      "span": 16,
                      "rules": [
                        {
                          "type": "required"
                        }
                      ],
                      "field": "pdfUrl",
                      "type": "upload_file_single",
                      "options": {
                        "title": "点击上传",
                        "type": "string",
                        "API": "/api/fs/uploadfile",
                        "acceptType": ".pdf"
                      },
                      "expect": {}
                    }
                  ]
                }
              }
            ]
          }
        },
        {
          "title": "更新文档",
          "type": "modal",
          "options": {
            "outside": true,
            "style": "primary",
            "modalTitle": "更新文档",
            "modalWidth": 600,
            "items": [
              {
                "component": "Form",
                "config": {
                  "layout": "Grid",
                  "layoutConfig": {
                    "value": [
                      24
                    ]
                  },
                  "API": {
                    "getAPI": "/api/doc/(id)",
                    "updateAPI": "/api/doc/(id)"
                  },
                  "fields": [
                    {
                      "label": "文档名",
                      "field": "name",
                      "rules": [
                        {
                          "type": "required"
                        }
                      ],
                      "type": "input"
                    },
                    {
                      "label": "上传文件",
                      "span": 16,
                      "rules": [],
                      "field": "urlList",
                      "type": "upload_file_single",
                      "options": {
                        "title": "点击上传",
                        "API": "/api/fs/uploadfile",
                        "acceptType": ".docx, .doc"
                      },
                      "expect": {}
                    }
                  ]
                }
              }
            ]
          }
        },    {
          "title": "下载", 
          "type": "modal",
          "options":{
            "outside": true,
            "modalTitle": "下载文件",
            "modalWidth": 400,
            "layout": "Empty",
            "items": [
              {
                "component": "print_config_form",
                "config": {
                  "API": {
                    "getAPI": "/api/doc/(id)"
                  },
                  "fields": [
                    {
                      "field": "downloadFile",
                      "label": "下载",
                      "type": "normal_download_file",
                      "options": {
                        "title": "点击下载"
                      }
                    }
                  ],
                  "otherProps":{
                    "footerButton": false
                  }
                }
              }
            ]
          }
        },
        {
          "title": "详情",
          "type": "path",
          "options":{
            "outside": true,
            "path": "fileManage/fileManage-view"
          }
        },
        {
          "title": "删除",
          "type": "delete",
          "options": {
            "outside": false
          },
          "expect": {
            "permission": ""
          }
        }
      ],
      "searchFields": [
        {
          "label": "文档名",
          "field": "name",
          "type": "search",
          "props": {
            "placeholder": ""
          }
        }
      ],
      "tableFields": [
        {
          "label": "文档名",
          "field": "name"
        },{
          "label": "文件版本",
          "field": "version"
        }
      ],
      "viewConfig": [
        {
          "title": "详情",
          "type": "plain",
          "fields": [
            {
              "label": "文档名",
              "field": "name"
            },
            {
              "label": "下载地址",
              "field": "url"
            },
            {
              "label": "当前版本号",
              "field": "version"
            }
          ]
        },
        {
          "title": "历史版本",
          "type": "cardList",
          "api": "/api/doc/versionList/[id]",
          "map": {
            "title": "",
            "subTitle": false,
            "image": false,
            "imageTitle": false
          },
          "format": [
            "文档名: <title>",
            "下载地址: <url>",
            "更新时间: <uploadTime>",
            "文件版本: <versionCode>"
          ]
        }
      ]
    },
    "message": "Success"
  }
}
