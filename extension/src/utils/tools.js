/*global chrome*/
import request from './request';

const chromeStorageGet = (keys, callBacks) => {
  chrome.storage.local.get(keys, (data) => {
    console.log('chrome: storage data app got:>> ', data);
    keys.forEach((key, index) => {
      if (typeof data[key] !== 'undefined') {
        const callBack = callBacks[index];
        callBack(data[key]);
      }
    });
  });
};

const chromeStorageSet = (params) => {
  chrome.storage.local.set(params, () => {
    console.log('chrome: Data saved in storage:>> ', params);
  });
};

const sendToggleClassMessage = (keys, data) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tabId = tabs[0].id;
    chrome.tabs.sendMessage(tabId, { key: keys, data: data }, function () {});
  });
};

const updateLocalRules = (newConfig, keys, platform) => {
  if (platform === 'twitter') {
    chromeStorageSet({ config: newConfig });
    chromeStorageSet({ ...newConfig.hide });
    sendToggleClassMessage(keys, newConfig);
  } else if (platform === 'facebook') {
    chromeStorageSet({ configFb: newConfig });
    chromeStorageSet({ ...newConfig.hide });
    sendToggleClassMessage(keys, newConfig);
  }
};

const clearLocalConfig = () => {
  chromeStorageSet({
    config: {},
    latestConfig: {},
    configAll: {},
    configFb: {},
    latestConfigFb: {},
    configAllFb: {},
  });
};

// Initialize local config
const getEndNumber = (latestConfigRes) => {
  const endNumberArr = [-1];
  latestConfigRes.twitter[0].change.forEach((item) => {
    // if (item.type === 'card' && item.origin.substr(0,12) === 'fix-position-') {
    console.log('item.origin.substr(0,12) :>> ', item.origin.substr(0, 12));
    if (item.origin.substr(0, 12) === 'fix-position') {
      endNumberArr.push(item.origin.substr(13, item.origin.length));
    }
  });
  endNumberArr.sort((a, b) => b - a);
  return endNumberArr[0];
};

const updateLocalConfig = () => {
  // clearLocalConfig();
  const initConfig = async () => {
    try {
      // 获取最新配置信息
      const resConfig = await request.getConfiguration({
        version: '',
        type: 1, //latest
        platform: 'all',
      });
      // 获取所有配置信息
      const resConfigAll = await request.getConfiguration({
        version: '',
        type: 2, //all
        platform: 'all',
      });
      tools.chromeStorageSet({
        // userInfo: newUserInfo,
        endNumber: getEndNumber(resConfig),
        config: resConfig.twitter[0],
        latestConfig: resConfig.twitter[0],
        configAll: resConfigAll.twitter,
        configFb: resConfig.facebook[0],
        latestConfigFb: resConfig.facebook[0],
        configAllFb: resConfigAll.facebook,
        ...resConfig.twitter.hide,
      });
    } catch (e) {
      console.log('e :>> ', e);
    }
  };
  initConfig();
};

const getUserRoleLevel = (role) => {
  if (role === 'root') {
    return 0;
  } else if (role === 'admin') {
    return 1;
  } else {
    return 2;
  }
};

const tools = {
  chromeStorageGet,
  chromeStorageSet,
  sendToggleClassMessage,
  updateLocalRules,
  updateLocalConfig,
  getUserRoleLevel,
};

export default tools;
