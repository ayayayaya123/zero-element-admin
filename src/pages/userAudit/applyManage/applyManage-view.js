import React from 'react';
import DetailsTemplate from '@/components/Details/DetailsTemplate';
import setting from './config/applyManage-setting';
    
export default () => {

  return <DetailsTemplate
    namespace="applyManage_view"
    setting={setting}
    config={setting.viewConfig}
  />
}
    
