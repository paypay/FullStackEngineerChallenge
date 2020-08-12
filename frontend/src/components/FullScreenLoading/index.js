import React, { memo } from 'react';
import Loader from 'react-loader-spinner';

const FullScreenLoading = () => (
  <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', opacity: '0.8', zIndex: '100' }}>
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
      <Loader type="Bars" color="#FFFFFF" height={40} width={40} />
    </div>
  </div>
);

export default memo(FullScreenLoading);
