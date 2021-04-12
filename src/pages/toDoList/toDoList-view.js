import React from 'react';
import DetailsTemplate from '@/components/Details/DetailsTemplate';
import setting from './config/toDoList-setting';
    
export default () => {

  return <DetailsTemplate
    namespace="toDoList_view"
    setting={setting}
    config={setting.viewConfig}
  />
}
    
