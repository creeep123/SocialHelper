import httpAxios from '../utils/httpAxios';

// function login() {
//   return httpAxios('get', '/article/home/index');
// }
const cloudFuncBase =
  'https://us-central1-web-extension-project.cloudfunctions.net';

function getUserRole(email) {
  return httpAxios('get', `${cloudFuncBase}/checkRole`, { user: email });
}

function setUserRole({ email, role }) {
  return httpAxios(
    'post',
    `${cloudFuncBase}/setRole?user=${email}&role=${role}`
  );
}

function getConfiguration({ version, type, platform }) {
  return httpAxios('get', `${cloudFuncBase}/getConfig`, {
    version,
    type,
    platform,
  });
}

function setLatestVersion({ version, platform }) {
  return httpAxios('get', `${cloudFuncBase}/setLatestVersion`, {
    version,
    platform,
  });
}

function uploadConfig(params) {
  return httpAxios('post', `${cloudFuncBase}/uploadConfig`, params);
}

function uploadClickData(body, useremail, platform, versionName) {
  const user = useremail;
  const curPlatform = platform;
  const version = versionName;

  return httpAxios(
    'post',
    `${cloudFuncBase}/uploadData?user=${user}&version=${version}&platform=${curPlatform}`,
    body
  );
}

const request = {
  getUserRole,
  getConfiguration,
  uploadConfig,
  uploadClickData,
  setLatestVersion,
  setUserRole,
};

export default request;
