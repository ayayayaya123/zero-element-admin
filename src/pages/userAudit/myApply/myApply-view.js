import React from 'react';
import DetailsTemplate from '@/components/Details/DetailsTemplate';
import setting from './config/myApply-setting';
    
export default () => {

  return <DetailsTemplate
    namespace="myApply_view"
    setting={setting}
    config={setting.viewConfig}
  />
}
    
