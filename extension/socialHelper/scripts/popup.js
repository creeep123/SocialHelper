/*global chrome*/
// outside of react
// initValues([
//   'isExploreHidden',
//   'isTrendsHidden',
//   'isReactionNumberHidden',
//   // 'showCalmText',
//   'isFollowingNumberHidden',
//   'isFollowerNumberHidden',
//   'isReactionNumberAlwaysHidden',
//   'isReactionNumberDetailHidden',
//   'isWhoToFollowHidden',
//   'isTopicsToFollowHidden',
//   // 'isFontChanged',
// ]);
localize();
function localize() {
  var objects = document.getElementsByTagName('html');
  for (var j = 0; j < objects.length; j++) {
    var obj = objects[j];
    var valStrH = obj.innerHTML.toString();
    var valNewH = valStrH.replace(/__MSG_(\w+)__/g, function (match, v1) {
      return v1 ? chrome.i18n.getMessage(v1) : '';
    });
    if (valNewH != valStrH) {
      obj.innerHTML = valNewH;
    }
  }
}
// function addClickEventListeners(keys) {
//   keys.forEach(function (key) {
//     var input = document.getElementById(key);
//     input.addEventListener(
//       'click',
//       function (event) {
//         var _a;
//         var checkbox = event.target;
//         chrome.storage.local.set(
//           ((_a = {}), (_a[key] = checkbox.checked), _a),
//           function () {}
//         );
//         chrome.tabs.query(
//           { active: true, currentWindow: true },
//           function (tabs) {
//             var tabId = tabs[0].id;
//             chrome.tabs.sendMessage(tabId, { key: key }, function () {});
//           }
//         );
//         console.log('....clicked on key...');
//       },
//       false
//     );
//   });
//   console.log('keys :>> ', keys);
// }
// function toggleChecked(keys) {
//   chrome.storage.local.get(keys, function (data) {
//     keys.forEach(function (key) {
//       console.log(key + ': ' + data[key]);
//       if (
//         key === 'isFollowingNumberHidden' ||
//         key === 'isFollowerNumberHidden' ||
//         key === 'isReactionNumberAlwaysHidden' ||
//         key === 'isReactionNumberDetailHidden' ||
//         key === 'isWhoToFollowHidden' ||
//         key === 'isTopicsToFollowHidden'
//         // key === 'isFontChanged'
//       ) {
//         if (typeof data[key] === 'undefined') {
//           data[key] = false;
//         }
//       } else {
//         if (typeof data[key] === 'undefined') {
//           data[key] = true;
//         }
//       }
//       var input = document.getElementById(key);
//       input.checked = data[key];
//     });
//   });
// }
// function initValues(keys) {
//   toggleChecked(keys);
//   addClickEventListeners(keys);
// }
