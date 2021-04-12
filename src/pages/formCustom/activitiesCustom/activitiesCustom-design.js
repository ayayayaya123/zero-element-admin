import React from 'react';
import ProjectActivities from '@/pages/workFlowManageFR/activitiesFR/config/ActivitiesFR/design';

import useBreadcrumb from '@/framework/useBreadcrumb';
    
export default (props) => {

    useBreadcrumb([
        { title: '首页', path: '/' },
        { title: '自定义表单', path: '/formCustom' },
        { title: '自定义表单', path: '/formCustom/activitiesCustom' },
        { title: '可视化设计' },
    ]);

    return (
        <ProjectActivities />
    )
}