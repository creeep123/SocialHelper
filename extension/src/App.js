/*global chrome*/
import './GlobalStyle.scss';
import Home from './pages/home.jsx';
import Statistics from './pages/statistics.tsx';
import Settings from './pages/settings.tsx';
import tools from './utils/tools';
import request from './utils/request';
// import localize from './utils/popup';

import Navigator from './components/navigator.tsx';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const [userInfo, setUserInfo] = useState({ email: 0, role: 3 });
  const [userRoleLevel, setLevel] = useState(3);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('Home');
  const [isUserLogin, setIsUserLogin] = useState(false);

  const pages = {
    Home: (
      <Home
        userInfo={userInfo}
        userRoleLevel={userRoleLevel}
        globalLoading={globalLoading}
        setGlobalLoading={setGlobalLoading}
      />
    ),
    Statistics: <Statistics />,
    Settings: <Settings userInfo={userInfo} setUserInfo={setUserInfo} />,
  };

  // 装载时获取配置信息
  useEffect(() => {
    setGlobalLoading(true);
    tools.chromeStorageGet(['userInfo'], [setUserInfo]);
    tools.updateLocalConfig();
    setTimeout(() => {
      setGlobalLoading(false);
    }, 100);
  }, []);

  // 根据邮箱信息判断用户登陆状态
  useEffect(() => {
    if (userInfo.email !== 0) {
      setIsUserLogin(true);
    } else {
      setIsUserLogin(false);
    }
  }, [userInfo, userInfo.email]);

  // 装载时根据邮箱获取角色信息
  useEffect(() => {
    setGlobalLoading(true);
    if (isUserLogin && userRoleLevel === 3) {
      // setTimeout(() => {
      (async () => {
        console.log('userInfo.email :>> ', userInfo.email);
        const resRole = await request.getUserRole(userInfo.email);
        console.log('resRole :>> ', resRole);
        // const { data: role } = resRole;
        // 拿到信息之后全局保存
        const newUserInfo = { role: resRole, ...userInfo };
        setUserInfo(newUserInfo);
        setLevel(tools.getUserRoleLevel(resRole));
      })();
      // }, 0);
    }
    setGlobalLoading(false);
  }, [isUserLogin, userInfo, userRoleLevel]);

  return (
    <div id={userRoleLevel >= 2 ? 'participant-app' : 'app'}>
      <Navigator
        userInfo={userInfo}
        setLevel={setLevel}
        setUserInfo={setUserInfo}
        setCurrentPage={setCurrentPage}
        userRoleLevel={userRoleLevel}
      >
        {pages[currentPage]}
      </Navigator>
    </div>
  );
}

export default App;
