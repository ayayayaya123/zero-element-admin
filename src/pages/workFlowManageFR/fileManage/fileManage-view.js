import React from 'react';
import DetailsTemplate from '@/components/Details/DetailsTemplate';
import setting from './config/fileManage-setting';
    
export default () => {

  return <DetailsTemplate
    namespace="fileManage_view"
    setting={setting}
    config={setting.viewConfig}
  />
}
    
