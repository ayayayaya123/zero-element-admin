import React from 'react';
import DetailsTemplate from '@/components/Details/DetailsTemplate';
import setting from './config/fieldCustom-setting';
    
export default () => {

  return <DetailsTemplate
    namespace="fieldCustom_view"
    setting={setting}
    config={setting.viewConfig}
  />
}
    
