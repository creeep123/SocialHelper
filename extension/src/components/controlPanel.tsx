/*global chrome*/
import React, { useEffect, useState } from 'react';
import { Button, Stack, Heading, useToast } from '@chakra-ui/react';
import tools from '../utils/tools';
import request from '../utils/request';
import {
  twitterRuleNames,
  facebookRuleNames,
  defaultConfig,
  defaultAllConfig,
} from './ruleMaps';
import VersionControlCard from './controlPanelComponents/versionControlCard.tsx';
import HideControlCard from './controlPanelComponents/hideControlCard.tsx';
import ChangeControlCard from './controlPanelComponents/ChangeControlCard.tsx';

const ControlPanel = ({
  userInfo,
  userRoleLevel,
  globalLoading,
  setGlobalLoading,
}) => {
  const toast = useToast();
  const { role: userRole } = userInfo;
  const [cacheCurVersion, setCache] = useState('');
  const [latestConfig, setLatest] = useState({ version: '' });
  const [creatingNew, setCreatingNew] = useState(false);
  const [activated, changeActStatus] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [curPlatform, setCurPlatform] = useState(null);
  const [curConfig, setConfig] = useState(null);
  const [allConfig, setAllConfig] = useState(defaultAllConfig);

  // const onChangeActStatus = () => {
  //   changeActStatus(!activated);
  // };

  const getIsLatestGlobalVersion = () => {
    tools.chromeStorageSet({ latestVersion: latestConfig.version });
    if (curConfig && latestConfig.version !== '') {
      if (curConfig.version === latestConfig.version) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const getLatestVersionName = () => {
    let latestVersionName;
    if (latestConfig.version !== '') {
      latestVersionName = latestConfig.version;
    } else {
      latestVersionName = null;
    }
    return latestVersionName;
  };

  const updateConfigFromStorage = () => {
    console.log('____________get current config__________');
    if (curPlatform === 'twitter') {
      tools.chromeStorageGet(
        ['config', 'configAll', 'latestConfig'],
        [setConfig, setAllConfig, setLatest]
      );
    } else if (curPlatform === 'facebook') {
      tools.chromeStorageGet(
        ['configFb', 'configAllFb', 'latestConfigFb'],
        [setConfig, setAllConfig, setLatest]
      );
    }
  };

  const onSwitchHideRules = (event) => {
    const ruleId = event.target.id;
    const newConfig = { ...curConfig };
    newConfig.hide[ruleId] = !curConfig.hide[ruleId];
    setConfig(newConfig);
    // tools.updateLocalRules(newConfig, ruleId, 'twitter');
    tools.updateLocalRules(newConfig, [ruleId], curPlatform);
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      const versionName = document.getElementById('version_name').value;

      if (versionName === '') {
        toast({
          title: `Error: Please fill the form`,
          status: 'error',
          isClosable: true,
        });
        setLoading(false);
        // setCreatingNew(false);
        return;
      }

      const formatChangeRules = (changeRules) => {
        return changeRules.map((rule) => {
          const newRule = rule;
          newRule.origin = newRule.origin.replace('https://twitter.com/', '');
          newRule.origin = newRule.origin.replace(
            'https://www.facebook.com/',
            ''
          );
          if (newRule.origin.indexOf('?') !== -1) {
            newRule.origin = newRule.origin.slice(
              0,
              newRule.origin.indexOf('?')
            );
          }
          if (newRule.type === 'image') {
            if(!Array.isArray(newRule.replacement)){
              newRule.replacement = newRule.replacement.replace(/[\r\n]/g, ''); //去掉回车换行
              newRule.replacement = newRule.replacement.split(',');
            }
            return newRule;
          } else {
            return newRule;
          }
        });
      };

      const upConfig = {
        ...curConfig,
        platform: curPlatform,
        version: versionName,
        change: formatChangeRules(curConfig.change),
      };

      const resUploadConfig = await request.uploadConfig(upConfig);
      if (resUploadConfig.code === 200 || resUploadConfig.code === 201) {
        toast({
          title: `Success: ${resUploadConfig.message}`,
          status: 'success',
          isClosable: true,
        });
        tools.updateLocalConfig();
        setTimeout(() => {
          updateConfigFromStorage();
        }, 4500);
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      } else {
        toast({
          title: `Error:${resUploadConfig.message}`,
          status: 'error',
          isClosable: true,
        });
      }
    } catch (e) {
      toast({
        title: `Error:${e}`,
        status: 'error',
        isClosable: true,
      });
      setLoading(false);
    }
    setCreatingNew(false);
  };

  const handleCancelCreate = () => {
    setCreatingNew(false);
    handleVersionChange('cacheCurVersion');
  };

  const handleVersionChange = (event) => {
    const newConfig =
      event === 'cacheCurVersion'
        ? cacheCurVersion
        : getConfigByVersionName(event.target.value);
    setConfig(newConfig);
    const keyNames = Object.keys(defaultConfig[curPlatform].hide);
    tools.updateLocalRules(newConfig, keyNames, curPlatform);
  };

  const handleSetLatestVersion = async () => {
    setLoading(true);
    const res = await request.setLatestVersion({
      version: curConfig.version,
      platform: curPlatform,
    });
    if (res.code === 200 || res.code === 201) {
      toast({
        title: `Success: ${res.message}`,
        status: 'success',
        isClosable: true,
      });
      setLatest(curConfig);
      if (curPlatform === 'facebook') {
        tools.chromeStorageSet({
          configFb: curConfig,
          latestConfigFb: curConfig,
        });
      } else {
        tools.chromeStorageSet({
          config: curConfig,
          latestConfig: curConfig,
        });
      }
      setLoading(false);
    } else {
      toast({
        title: `Error:${res.message}`,
        status: 'error',
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const handleAddNewVersion = () => {
    // setConfig(defaultConfig[curPlatform]);
    setConfig(curConfig);
    setCache(curConfig);
    setCreatingNew(true);
  };

  const handleResetFields = () => {
    setConfig(defaultConfig[curPlatform]);
  };

  const getConfigByVersionName = (name) => {
    let config = {};
    for (let i = 0; i < allConfig.length; i++) {
      if (allConfig[i].version === name) {
        config = allConfig[i];
        break;
      }
    }
    return config;
  };

  const getVersions = () => {
    let allVersions = [];
    if (allConfig.length > 0) {
      allConfig.map((item) => {
        allVersions.push({ version: item.version });
      });
      return allVersions;
    } else {
      return 'null';
    }
  };

  const getHideRules = () => {
    const hideRules = [];
    if (curConfig && curConfig.hide !== undefined) {
      const keys = Object.keys(curConfig.hide);
      keys.forEach((key) => {
        hideRules.push({
          id: key,
          name:
            curPlatform === 'twitter'
              ? twitterRuleNames[key]
              : curPlatform === 'facebook'
              ? facebookRuleNames[key]
              : null,
          value: curConfig.hide[key],
        });
      });
      return hideRules;
    } else {
      return 'null';
    }
  };

  const makeWarnToast = (msg) => {
    toast({
      title: `Warning: ${msg}`,
      status: 'warning',
      isClosable: false,
    });
  };

  // 👇👇👇👇👇 动态增减表单 👇👇👇👇👇
  const getChangeRules = () => {
    if (curConfig) {
      const changeRules = curConfig.change;
      return changeRules;
    } else {
      return [];
    }
  };

  const setFormFields = (fields) => {
    setConfig({ ...curConfig, change: fields });
  };
  // const [formFields, setFormFields] = useState([]);

  const handleFormChange = (event, index) => {
    console.log('handleFormChange event :>> ', event);
    console.log('event.target.value :>> ', event.target.value);
    const cardReplacements = [
      'replacement-url',
      'replacement-title',
      'replacement-abstract',
      'replacement-content',
      'info-summary',
    ];
    const commentReplacements = [
      'replacement-true',
      'replacement-fake',
      'replacement-summary-type',
    ];
    const insertedReplacements = [
      'replacement-inserted-avatarFlag',
      'replacement-inserted-avatarImgUrl',
      'replacement-inserted-userName',
      'replacement-inserted-userNameUrl',
      'replacement-inserted-timeFlag',
      'replacement-inserted-time',
      'replacement-inserted-content',
      'replacement-inserted-resourceUrl',
      'replacement-inserted-resourceImg',
      'replacement-inserted-infoSum',
      'replacement-inserted-resourcesWebsite',
      'replacement-inserted-abstract',
      'replacement-inserted-like_number',
      'replacement-inserted-comment',
      'replacement-inserted-share',
    ];
    let data = [...curConfig.change];
    const cardIndex = cardReplacements.indexOf(event.target.name);
    const commentIndex = commentReplacements.indexOf(event.target.name);
    const insertedIndex = insertedReplacements.indexOf(event.target.name);

    if (cardIndex !== -1) {
      let cardArray = data[index]['replacement'];
      if (Array.isArray(cardArray)) {
        cardArray[cardIndex] = event.target.value;
      } else {
        cardArray = ['', '', '', ''];
        cardArray[cardIndex] = event.target.value;
      }
      data[index]['replacement'] = cardArray;
    } else if (commentIndex !== -1) {
      let commentArray = data[index]['replacement'];
      if (Array.isArray(commentArray)) {
        commentArray[commentIndex] = event.target.value;
      } else {
        commentArray = ['', ''];
        commentArray[commentIndex] = event.target.value;
      }
      data[index]['replacement'] = commentArray;
    } else if (insertedIndex !== -1) {
      let insertedArray = data[index]['replacement'];
      if (Array.isArray(insertedArray)) {
        insertedArray[insertedIndex] = event.target.value;
      } else {
        insertedArray = Array(15).fill('');
        insertedArray[insertedIndex] = event.target.value;
      }
      data[index]['replacement'] = insertedArray;
    } else {
      data[index][event.target.name] = event.target.value;
    }

    setFormFields(data);
  };

  const addFields = () => {
    let object = {
      origin: '',
      replacement: '',
      type: '',
    };
    setFormFields([...curConfig.change, object]);
  };

  const removeFields = (index) => {
    let data = [...curConfig.change];
    data.splice(index, 1);
    setFormFields(data);
  };

  // 👆👆👆👆👆 动态增减表单 👆👆👆👆👆

  // 获取默认规则
  useEffect(() => {
    updateConfigFromStorage();
  }, [curPlatform]);

  // 获取最新规则
  useEffect(() => {
    tools.chromeStorageGet(
      [curPlatform === 'facebook' ? 'latestConfigFb' : 'latestConfig'],
      [setLatest]
    );
  }, [curPlatform]);

  // set listener to listen message from content script
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (result) {
      chrome.tabs.sendMessage(
        result[0].id,
        { from: 'controller', subject: 'check platform' },
        function (response) {
          if (curPlatform !== response) {
            setCurPlatform(response);
            console.log('____________get current config__________');
          }
        }
      );
    });
  }, []);

  // Load popup.js while rendering
  useEffect(() => {
    setTimeout(() => {
      let script = document.querySelector('#script');
      if (script) {
        return;
      }
      script = document.createElement('script');
      script.id = 'script';
      script.src = '../scripts/popup.js';
      document.querySelector('body').appendChild(script);
    }, 2500);
  }, []);

  const readyToRender = ({
    versions,
    curPlatform,
    hideRules,
    latestVersionName,
  }) => {
    if (
      curConfig &&
      versions !== 'null' &&
      curPlatform !== undefined &&
      hideRules !== 'null' &&
      latestVersionName !== ''
    ) {
      console.log('====Ready To Render====');
      return true;
    } else {
      console.log('!!!Not Ready to render!!!');
      console.log('versions :>> ', versions);
      console.log('curPlatform :>> ', curPlatform);
      console.log('hideRules :>> ', hideRules);
      console.log('latestVersionName :>> ', latestVersionName);
      return false;
    }
  };

  // Preprocess Render Data
  const hideRules = getHideRules();
  const changeRules = getChangeRules();
  const versions = getVersions();
  const isLatestVersion = getIsLatestGlobalVersion();
  const latestVersionName = getLatestVersionName();
  const roleLevel = userRoleLevel;

  const [body, setBody] = useState(0);
  useEffect(() => {
    if (
      userInfo.email !== 0 &&
      curPlatform !== null &&
      latestVersionName !== null
    ) {
      /* console.log("run data upload function")
      console.log(userInfo.email);
      console.log(body);
      console.log(curPlatform);
      console.log(latestVersionName); */
      uploadClickData();
    }
  }, [curPlatform, latestVersionName, userInfo.email]);

  useEffect(() => {
    console.log('click data update');
    tools.chromeStorageGet(['body'], [setBody]);
  }, []);

  const uploadClickData = async () => {
    try {
      const resUploadUserdata = await request.uploadClickData(
        body,
        userInfo.email,
        curPlatform,
        latestVersionName
      );
      console.log('upload user data :>> ', resUploadUserdata);
    } catch (e) {
      alert('error :>> ' + e);
    }
  };

  if (!globalLoading && curPlatform === undefined) {
    makeWarnToast('Social Helper only works on Twitter and Facebook.');
  }

  return globalLoading ? (
    <Stack>
      <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
        Loading...
      </Heading>
    </Stack>
  ) : readyToRender({ versions, curPlatform, hideRules, latestVersionName }) ? (
    <Stack align="center" direction="column">
      {/* <div
        className="activate-control"
        style={{ marginTop: '20px', marginBottom: '40px' }}
      >
        <FormLabel
          className="activate-icon"
          style={{ marginBottom: '20px' }}
          htmlFor="email-alerts"
          mb="0"
        >
          {!activated ? (
            <CloseIcon w={12} h={12} color="gray.500"></CloseIcon>
          ) : (
            <CheckIcon w={12} h={12} color="green.500"></CheckIcon>
          )}
        </FormLabel>
        <Switch size="lg" defaultChecked onChange={onChangeActStatus} />
      </div> */}

      {/* Version Selector */}
      {roleLevel <= 1 && (
        <VersionControlCard
          versions={versions}
          isLoading={isLoading}
          activated={activated}
          creatingNew={creatingNew}
          handleVersionChange={handleVersionChange}
          handleAddNewVersion={handleAddNewVersion}
          handleResetFields={handleResetFields}
          handleSetLatestVersion={handleSetLatestVersion}
          latestVersionName={latestVersionName}
          isLatestVersion={isLatestVersion}
        ></VersionControlCard>
      )}

      {/* Hide Rule Control */}
      <HideControlCard
        activated={activated}
        hideRules={hideRules}
        onSwitchHideRules={onSwitchHideRules}
        creatingNew={creatingNew}
      ></HideControlCard>

      {/* Change Rule Control */}
      <ChangeControlCard
        addFields={addFields}
        creatingNew={creatingNew}
        curPlatform={curPlatform}
        changeRules={changeRules}
        removeFields={removeFields}
        handleFormChange={handleFormChange}
      ></ChangeControlCard>

      {creatingNew ? (
        <Stack
          mt={4}
          spacing={4}
          p={6}
          w={'full'}
          maxW={'md'}
          bg={'white'}
          rounded={'xl'}
          boxShadow={'lg'}
          direction={'row'}
          justifyContent={'space-between'}
          style={activated ? {} : { display: 'none' }}
        >
          <Button
            isLoading={isLoading}
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
            onClick={handleCreate}
            flexBasis={'45%'}
          >
            Create
          </Button>
          <Button
            colorScheme="blue"
            variant="outline"
            isLoading={isLoading}
            onClick={handleCancelCreate}
            flexBasis={'45%'}
          >
            Cancel
          </Button>
        </Stack>
      ) : null}
    </Stack>
  ) : (
    <Stack>
      <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
        <br></br>
      </Heading>
    </Stack>
  );
};

export default ControlPanel;
