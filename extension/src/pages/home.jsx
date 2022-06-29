import React, { useEffect, useState } from 'react';
import ControlPanel from '../components/controlPanel.tsx';

const Home = ({ userInfo, userRoleLevel, globalLoading, setGlobalLoading }) => {
  const isUserLogin = userRoleLevel >= 3 ? false : true;

  return (
    // <div className="container home-container">
    <div
      className={userRoleLevel >= 2 ? '' : 'container'}
      style={userRoleLevel >= 2 ? { display: 'none' } : {}}
    >
      {isUserLogin ? (
        <ControlPanel
          globalLoading={globalLoading}
          setGlobalLoading={setGlobalLoading}
          userInfo={userInfo}
          userRoleLevel={userRoleLevel}
        ></ControlPanel>
      ) : null}
    </div>
  );
};

export default Home;
