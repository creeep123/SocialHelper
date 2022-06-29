/*global chrome*/
// background.js

// let rules = {
//   hide: {
//     authorName: 1,
//     authorAvatar: 0,
//   },
// };

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.sync.set({ rules });
//   console.log('Default current rule set to ', `rules: ${rules}`);
// });

const cloudFuncBase =
  'https://us-central1-web-extension-project.cloudfunctions.net';

console.log('bgjs started :>> ');

chrome.runtime.onMessage.addListener((request, sender) => {
  console.log('onMessage in bgjs Working....... ');
  if (request.from === 'content' && request.subject === 'showPageAction') {
    chrome.pageAction.show(sender.tab.id);
  }
});

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

const chromeStorageSet = (params) => {
  chrome.storage.local.set(params, () => {
    console.log('chrome: Data saved in storage:>> ', params);
  });
};

function getConfiguration({ version, type, platform }) {
  return fetch( `${cloudFuncBase}/getConfig?version=${version}&type=${type}&platform=${platform}`, {
    method: 'get'
  }).then(function(data) { return data.json(); } )
}

const updateLocalConfig = () => {
  // clearLocalConfig();
  console.log('updateLocalConfig....... ');
  const initConfig = async () => {
    try {
      // 获取最新配置信息
      const resConfig = await getConfiguration({
        version: '',
        type: 1, //latest
        platform: 'all',
      });
      console.log('resConfig :>> ', resConfig);
      // 获取所有配置信息
      const resConfigAll = await getConfiguration({
        version: '',
        type: 2, //all
        platform: 'all',
      });
      console.log('resConfigAll :>> ', resConfigAll);
      chromeStorageSet({
        // userInfo: newUserInfo,
        endNumber:getEndNumber(resConfig),
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

updateLocalConfig();
// Update Everyday
const updateTimer = setInterval(() => {
  updateLocalConfig();
}, 1000 * 60 * 60 * 1);
setTimeout(() => {
  clearInterval(updateTimer);
}, 1000 * 60 * 60 * 24);