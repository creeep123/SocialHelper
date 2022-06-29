/*global chrome*/
import { firebaseApp } from './firebase_config';
import {
  getAuth,
  onAuthStateChanged,
  signInWithCredential,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';

// Auth instance for the current firebaseApp
const auth = getAuth(firebaseApp);
const initHttp = new XMLHttpRequest();
const initUrl = 'https://us-central1-web-extension-project.cloudfunctions.net/initUser'
// setPersistence(auth, browserLocalPersistence)

// function init() {
//   // Detect auth state
//   onAuthStateChanged(auth, (user) => {
//     if (user != null) {
//       return user
//     } else {
//       return false
//     }
//   });
// }

function getAuthState() {
  // Detect auth state
  //let res = {};
  // onAuthStateChanged(auth, (user) => {
  //   if (user != null) {
  //     res = user;
  //   } else {
  //     res = startSignIn();
  //     // return false;
  //   }
  // });
  // res = startSignIn();
  // return res;
}

/**
 * Starts the sign-in process.
 */
function startSignIn() {
  console.log('started SignIn');
  //https://firebase.google.com/docs/auth/web/manage-users
  const user = auth.currentUser;
  let p = new Promise(function(resolve){
    if (user) {
      console.log('current');
      resolve(user);
    } else {
      console.log('proceed');
      startAuth(true).then(function (user) {
        resolve(user);
      })
    }
  })
  return p;
}
/**
 * Start the auth flow and authorizes to Firebase.
 * @param{boolean} interactive True if the OAuth flow should request with an interactive mode.
 */
function startAuth(interactive) {
  console.log('Auth trying');
  let p = new Promise(function(resolve, reject){
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
      //Token:  This requests an OAuth token from the Chrome Identity API.
      if (chrome.runtime.lastError && !interactive) {
        console.log('It was not possible to get a token programmatically.');
      } else if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else if (token) {
        // Follows: https://firebase.google.com/docs/auth/web/google-signin
        // Authorize Firebase with the OAuth Access Token.
        console.log('TOKEN:');
        console.log(token);
        // Builds Firebase credential with the Google ID token.
        const credential = GoogleAuthProvider.credential(null, token);
        signInWithCredential(auth, credential).then((userCredential) => {
          console.log('Success!!!');
          initHttp.open('get', initUrl + '?user=' + userCredential.user.reloadUserInfo.providerUserInfo[0].email , false);
          initHttp.send();
          resolve(userCredential.user);
        }).catch((error) => {
          // You can handle errors here
          reject(error);
        });
      } else {
        console.error('The OAuth token was null');
      }
    });
  })
  return p;
}

function logout(){
  if (auth.currentUser){
    auth.signOut();
    return '200'
  }else{
    console.log("Please login first!")
    return '201'
  }

}

const server = { startSignIn, logout};
export default server;
