module.exports = [
  // {
  //   name: '普通菜单',
  //   path: '/a',
  // },
  // {
  //   name: '分割线',
  //   key: 'divider',
  // },
  // {
  //   name: '一级菜单',
  //   path: '/b',
  //   icon: '<svg viewBox=0 0 1024 1024 version=1.1 xmlns=http://www.w3.org/2000/svg><path d=M903.168 998.4c-25.6 0-46.592-19.968-48.128-45.568a343.808 343.808 0 0 0-343.04-323.584c-181.76 0-332.288 142.336-343.04 323.584-1.536 26.624-24.576 46.592-50.688 45.568a48.4352 48.4352 0 0 1-45.568-50.688c13.312-232.448 206.336-414.72 439.296-414.72s425.984 182.272 439.296 414.72a48.128 48.128 0 0 1-45.568 50.688h-2.56z fill= p-id=1188></path><path d=M512 629.76a302.592 302.592 0 0 1-302.08-302.08C209.92 161.28 345.6 25.6 512 25.6c166.4 0 302.08 135.68 302.08 302.08 0 166.4-135.68 302.08-302.08 302.08z m0-507.904c-113.152 0-205.824 92.16-205.824 205.824a205.824 205.824 0 0 0 411.648 0c0-113.664-92.672-205.824-205.824-205.824z></path></svg>',
  //   items: [
  //     {
  //       path: '/b/c',
  //       name: '二级菜单A',
  //     },
  //     {
  //       path: '/b/d',
  //       name: '二级菜单B',
  //     },
  //   ],
  // },
  // {
  //   name: '权限父菜单',
  //   path: '/p',
  //   permissions: ['myPermA.view', 'myPermB.view'],
  //   items: [
  //     {
  //       path: '/p/a',
  //       name: '权限子菜单A',
  //       permissions: 'myPermA.view',
  //     },
  //     {
  //       path: '/p/b',
  //       name: '权限子菜单B',
  //       permissions: 'myPermB.view',
  //     },
  //   ],
  // },
  {
    name: '审批',
    path: '/userAudit',
    items: [
      {
        path: '/userAudit/applyManage',
        name: '发起申请',
      },
      {
        path: '/userAudit/myApply',
        name: '我的申请',
      }
    ],
  },
  // {
  //   name: '流程管理FR',
  //   path: '/workFlowManageFR',
  //   items: [
  //     {
  //       path: '/workFlowManageFR/fromCategoryFR',
  //       name: '表单分类FR',
  //     },
  //     {
  //       path: '/workFlowManageFR/activitiesFR',
  //       name: '表单管理FR',
  //     },
  //     {
  //       path: '/workFlowManageFR/workFlowTypeFR',
  //       name: '流程类别FR',
  //     },
  //     {
  //       path: '/workFlowManageFR/workFlowListFR',
  //       name: '流程管理FR',
  //     },
  //     {
  //       path: '/workFlowManageFR/auditManageFR',
  //       name: '审核管理FR',
  //     }
  //   ],
  // },
  // {
  //   name: '系统管理',
  //   path: '/sys',
  //   // permissions: [
  //   //   'Org.view',
  //   //   'sysUser.view',
  //   //   'sysRole.view',
  //   //   'Config.view',
  //   //   'OperationLog.view'
  //   // ],
  //   items: [
  //     {
  //       name: '菜单管理',
  //       path: '/sys/menuManage',
  //     },
  //     {
  //       name: '组织管理',
  //       path: '/sys/org',
  //       permissions: ''
  //     },
  //     {
  //       name: '用户管理',
  //       path: '/sys/user',
  //       permissions: ''
  //     },
  //     {
  //       name: '角色管理',
  //       path: '/sys/role',
  //       permissions: ''
  //     },
  //     {
  //       name: '系统配置',
  //       path: '/sys/setting',
  //       permissions: ''
  //     },
  //     {
  //       name: '操作日志',
  //       path: '/sys/logs',
  //       permissions: ''
  //     }
  //   ]
  // },
  // {
  //   name: '业务中台',
  //   path: '/businessCenter',
  // },
  // {
  //   name: '自定义表单',
  //   path: '/formCustom',
  //   items:[
  //     {
  //       name: '自定义字段',
  //       path: '/formCustom/fieldCustom',
  //     },
  //     {
  //       name: '自定义表单',
  //       path: '/formCustom/activitiesCustom',
  //     }
  //   ]
  // }
    {
    "name": "运维管理",
    "path": "/devops",
    "items": [
      {
        "name": "数据现场管理",
        "path": "/devops/backup"
      },
      // {
      //   "name": "问题跟踪",
      //   "path": "/devops/issueTask"
      // },
      // {
      //   "name": "微服务权限配置",
      //   "path": "/devops/appPermission"
      // },
    ]
  },{
    name: '分类',
    path: '/type',
    items: [
	  {
        path: '/type/testField',
        name: '分类管理',
      }
    ],
  }
]