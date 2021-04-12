import React from 'react';
import DetailsTemplate from '@/components/Details/DetailsTemplate';
import setting from './config/menuManage-setting';
    
export default () => {

  return <DetailsTemplate
    namespace="menuManage_view"
    setting={setting}
    config={setting.viewConfig}
  />
}
    
