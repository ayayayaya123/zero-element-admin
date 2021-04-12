import React from 'react';
import useBreadcrumb from '@/framework/useBreadcrumb';
import ProjectActivities from '@/pages/formCustom/activitiesCustom/config/dataManage';
    
export default (props) => {
    useBreadcrumb([
        { title: '首页', path: '/' },
        { title: '自定义表单', path: '/formCustom' },
        { title: '自定义表单', path: '/formCustom/activitiesCustom' },
        { title: '数据管理' },
    ]);

return <ProjectActivities />

}