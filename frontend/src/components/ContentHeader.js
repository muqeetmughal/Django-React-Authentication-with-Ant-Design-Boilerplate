import { PageHeader } from 'antd';
import React from 'react';


const ContentHeader = ({ app_name, child_app }) => (
    <PageHeader
        className="site-page-header"
        onBack={() => null}
        title={app_name}
        subTitle={child_app}
    />
);
export default ContentHeader