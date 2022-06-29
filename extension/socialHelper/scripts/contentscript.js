/*global chrome*/
var property = [
  'isExploreHidden',
  'isTrendsHidden',
  'isReactionNumberHidden',
  // 'showCalmText',
  'isFollowingNumberHidden',
  'isFollowerNumberHidden',
  'isReactionNumberAlwaysHidden',
  'isReactionNumberDetailHidden',
  'isWhoToFollowHidden',
  'isTopicsToFollowHidden',
  'isRecommendationBlocked',
  'isReplyButtonHidden',
  'isLikeButtonHidden',
  'isShareButtonHidden',
  'isRetweetButtonHidden',
  'isHeadPortraitHidden',
  'isAccountIDHidden'
  // 'isFontChanged',
];
init(property);
TaggingAndChange();

var changes;
function init_change() {
  chrome.storage.local.get('config', function (data) {
    changes = data.config.change
  });
}
function init(keys) {
  chrome.storage.local.get(keys, function (data) {
    toggleClass(keys, data)
  });
  init_change();
}

// var recommendationIntervalId;
function toggleClass(keys, data) {
  console.log('。。。。。。toggleClass content script working。。。。。。 ');
  keys.forEach(function (key) {
    // 如果属于以下某一条规则变量
    if (key in property) {
      // 设置默认值 false
      if (typeof data[key] === 'undefined') {
        data[key] = false;
      }
    }
    // 如果不上述规则变量
    else {
      // 设置默认值 true
      if (typeof data[key] === 'undefined') {
        data[key] = true;
      }
    }
    // console.log(key + ": " + data[key])
    // if (key === 'isRecommendationBlocked') {
    //   if (data[key]) {
    //     recommendationIntervalId = setInterval(BlockRecommendation, 2000);
    //   } else if (recommendationIntervalId != undefined) {
    //     clearInterval(recommendationIntervalId);
    //   }
    // }
    var body = document.getElementsByTagName('body')[0];
    // 根据设定值添加或移除规则同名 Class
    if (data[key]) {
      body.classList.add(key);
    } else {
      body.classList.remove(key);
    }
  });
}
console.log('twitter content script running')
// 接收到 Message
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('onMessage in twitter content Working....... ');
  if (request.from === 'controller' && request.subject === 'check platform') {
    console.log('reached content script')
    sendResponse('twitter')
  } else if (request.key.length >= 1) {
    toggleClass(request.key, request.data.hide);
    sendResponse();
  } else {
    toggleClass([request.key], request.data.hide);
    sendResponse();
  }
  return true;
});
// chrome.runtime.sendMessage({ from: 'content', subject: 'showPageAction' });
function addCalmTitle() {
  var calmText = chrome.i18n.getMessage('textCalm');
  var css =
    'body.showCalmText header[role="banner"] h1[role="heading"]::after { content:"' +
    calmText +
    '";}';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  head.appendChild(style);
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));
}
function changeCalmColor() {
  var body = document.body || document.getElementsByTagName('body')[0];
  if (body.style.backgroundColor !== null) {
    var logo = document.querySelector(
      'header[role="banner"] h1[role="heading"] > a svg'
    );
    if (logo !== null) {
      var css =
        'body.showCalmText header[role="banner"] h1[role="heading"]::after { color: ' +
        window.getComputedStyle(logo).color +
        ';}';
      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      head.appendChild(style);
      style.type = 'text/css';
      style.appendChild(document.createTextNode(css));
    }
  }
}
// implement the change rules
function TaggingAndChange() {
  if (changes == null || changes == undefined) {
    return
  }
  // let changes_copy = changes.map((x) => x);

  tweetAll = [...document.body.querySelectorAll('div[aria-label^="Timeline:"] > div > div')];
  if (tweetAll.length == 0) {
    tweetAll = [...document.body.querySelectorAll('div[id="react-root"]')];
  }

  tweetAll.forEach(tweet => {
    // console.log(tweet)
    // delete, end have higher priority (only work in home page)
    if (window.location.href.includes("https://twitter.com/home") && tweet.querySelector('article[order_number="delete"]') != null) {
      tweet.setAttribute("style", "display:none");
      console.log("delete one tweet...")
      return;
    }
    if (window.location.href.includes("https://twitter.com/home") && tweet.querySelector('article[order_number="end"]') != null) {
      let parentNode = tweet.querySelector('div[class^="css-1dbjc4n r-16y2uox r-1wbh5a2 r-1ny4l3l"]>div');
      parentNode.children[1].children[0].setAttribute("style", "display:none");
      parentNode = parentNode.children[1].children[1];
      parentNode.children[0].setAttribute("style", "display:none");
      parentNode = parentNode.children[1];
      parentNode.children[1].setAttribute("style", "display:none");
      parentNode.children[2].setAttribute("style", "display:none");
      let endNode = createEndNode();
      parentNode.replaceChild(endNode, parentNode.firstChild);
      console.log("This is the end tweet...")
      return;
    }
    let isFixPosition = false;
    let fixposition = "none";
    // console.log(tweet.querySelector('article[order_number^="fix-position-"]') != null,tweet);
    if (window.location.href.includes("https://twitter.com/home") && tweet.querySelector('article[order_number^="fix-position-"]') != null) {
      isFixPosition = true;
      fixposition = tweet.querySelector('article[order_number^="fix-position-"]').getAttribute("order_number");
      // console.log(fixposition);
    }

    // others change process && fix-position-%d
    if (tweet.innerHTML.includes('<span aria-label="Recommended Topic: You might like"')) {
      tweet.setAttribute("tweet_type", "Recommendation");
    }

    let tweet_link = tweet.querySelector('div[class="css-1dbjc4n r-1d09ksm r-18u37iz r-1wbh5a2"]>a') == null ? null : tweet.querySelector('div[class="css-1dbjc4n r-1d09ksm r-18u37iz r-1wbh5a2"]>a').href;
    let tweet_body = tweet.querySelector('div[class="css-1dbjc4n r-1iusvr4 r-16y2uox r-1777fci r-kzbkwu"]');

    // if (changes == undefined) {
    //   return;
    // }
    // let changes_copy = changes.map((x) => x);
    for (let oj of changes) {
      if (oj.type == "user_name") {
        let item = document.querySelector('div[class="css-901oao r-1awozwy r-18jsvk2 r-6koalj r-37j5jr r-adyw6z r-1vr29t4 r-135wba7 r-bcqeeo r-1udh08x r-qvutc0"]')
        if (item != null && item != undefined && item.parentNode.parentNode.parentNode.children[1].innerText == oj.origin) {
          // hide accountID
          item.parentNode.parentNode.parentNode.children[1].style.display = "none"
          let temp = document.querySelector('span[class="css-901oao css-16my406 r-1awozwy r-18jsvk2 r-6koalj r-poiln3 r-b88u0q r-bcqeeo r-1udh08x r-3s2u2q r-qvutc0"]')
          temp.innerText = oj.replacement
          item.children[0].innerText = oj.replacement
        }

        let all_id = [...tweet.querySelectorAll('div[class^="css-1dbjc4n r-18u37iz r-1wbh5a2"]')]
        all_id.forEach(cur_id => {
          if (cur_id.innerText == oj.origin) {
            // hide account ID
            cur_id.style.display = "none"
            // hide head portrait . It's kind of repetitive  display=none or opacity = 0
            if (tweet.querySelector('div[class^="css-1dbjc4n r-1awozwy r-1hwvwag r-18kxxzh r-1b7u577"]') != null) {
              // tweet.querySelector('div[class^="css-1dbjc4n r-1awozwy r-1hwvwag r-18kxxzh r-1b7u577"]').style.opacity = 0;
              tweet.querySelector('div[class^="css-1dbjc4n r-1awozwy r-1hwvwag r-18kxxzh r-1b7u577"]').style.display = "none"
            }
            // console.log(cur_id.parentNode, cur_id.parentNode.firstChild.querySelector('div>span>span'))
            let temp = cur_id.parentNode.firstChild.querySelector('div>span>span')
            if (temp != null && temp != undefined) {
              temp.innerText = oj.replacement
            }
          }
        })
        // fix position has the highest priority => do it again to replace other name rules
        if (isFixPosition && oj.origin == fixposition) {
          let cur_id = tweet.querySelector('div[class^="css-1dbjc4n r-18u37iz r-1wbh5a2"]');
          // hide account ID
          cur_id.style.display = "none"
          // hide head portrait . It's kind of repetitive  display=none or opacity = 0
          if (tweet.querySelector('div[class^="css-1dbjc4n r-1awozwy r-1hwvwag r-18kxxzh r-1b7u577"]') != null) {
            // tweet.querySelector('div[class^="css-1dbjc4n r-1awozwy r-1hwvwag r-18kxxzh r-1b7u577"]').style.opacity = 0;
            tweet.querySelector('div[class^="css-1dbjc4n r-1awozwy r-1hwvwag r-18kxxzh r-1b7u577"]').style.display = "none"
          }
          // console.log(cur_id.parentNode, cur_id.parentNode.firstChild.querySelector('div>span>span'))
          let temp = cur_id.parentNode.firstChild.querySelector('div>span>span')
          if (temp != null && temp != undefined) {
            temp.innerText = oj.replacement
          }
        }
        // Floating frame
        item = document.querySelector('div[id="layers"] > div:nth-child(2)')
        if (item != null && item != undefined) {
          let temp = item.querySelector('div[class="css-901oao css-bfa6kz r-14j79pv r-18u37iz r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-qvutc0"]>span')
          // may cause problem: about the oder!!
          if (temp != null && temp != undefined && (temp.innerText == oj.origin || (isFixPosition && oj.origin == fixposition))) {
            //hidden head portrait and accountID
            temp.style.display = "none"
            // temp = item.querySelector('div[class="css-1dbjc4n r-1adg3ll r-bztko3"]').style.opacity = 0
            temp = item.querySelector('div[class="css-1dbjc4n r-1adg3ll r-bztko3"]').style.display = "none"

            temp = item.querySelector('div[class="css-901oao r-1awozwy r-18jsvk2 r-6koalj r-37j5jr r-1inkyih r-b88u0q r-rjixqe r-bcqeeo r-1udh08x r-3s2u2q r-qvutc0"]>span>span')
            if (temp != null && temp != undefined) {
              console.log(temp)
              temp.innerText = oj.replacement
            }
          }
        }
      } else if (oj.type == "content" && ((isFixPosition && oj.origin == fixposition) || (tweet_link != null && tweet_link.includes(oj.origin)) || (tweet_link == null && window.location.href.includes(oj.origin)))) {
        if (tweet_link != null && tweet_link.includes(oj.origin) || (isFixPosition && oj.origin == fixposition)) {
          let isComment = tweet_body.children[1].firstChild.querySelector('div[class="css-901oao r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-qvutc0"]') != null ? true : false;
          let pos_div = isComment ? 1 : 0;
          if (tweet_body.children[1].children[pos_div].getAttribute("aria-labelledby") != null || tweet_body.children[1].children[pos_div].querySelector('div[data-testid="tweetText"]') == null) {
            // id is not inserted to its parent node now
            let content_node = createContentNode("en", oj.replacement, "id__" + genID(13));
            tweet_body.children[1].insertBefore(content_node, tweet_body.children[1].children[pos_div]);
          } else if (tweet_body.children[1].children[pos_div].querySelector('div[data-testid="tweetText"]') != null) {
            let content_node = createContentNode("en", oj.replacement, tweet_body.children[1].children[pos_div].children[0].getAttribute("id"));
            tweet_body.children[1].replaceChild(content_node, tweet_body.children[1].children[pos_div]);
          }
        } else {
          let item = document.body.querySelector('article > div > div > div > div:nth-child(3)');
          if (item == null) {
            continue;
          }
          let content_node = document.createElement("div");
          content_node.className = "css-1dbjc4n";
          if (item.querySelector('div[data-testid="tweetText"]') == null) {
            //english
            // id is not inserted to its parent node now
            let temp_node = createContentNode("en", oj.replacement, "id__" + genID(13));
            content_node.appendChild(temp_node);
            content_node.children[0].setAttribute("class", "css-1dbjc4n r-1s2bzr4");
            item.insertBefore(content_node, item.firstChild)
          } else {
            //english
            let temp_node = createContentNode("en", oj.replacement, item.children[0].children[0].children[0].getAttribute("id"))
            content_node.appendChild(temp_node);
            content_node.children[0].setAttribute("class", "css-1dbjc4n r-1s2bzr4");
            content_node.children[0].children[0].setAttribute("class", "css-901oao r-18jsvk2 r-37j5jr r-1blvdjr r-16dba41 r-vrz42v r-bcqeeo r-bnwqim r-qvutc0");
            item.replaceChild(content_node, item.firstChild)
          }
        }
        //changes.splice(changes.indexOf(oj), 1)
      } else if (oj.type == "image" && ((isFixPosition && oj.origin == fixposition) || (tweet_link != null && tweet_link.includes(oj.origin)) || (tweet_link == null && window.location.href.includes(oj.origin)))) {
        let imgs;
        if (tweet_link != null && tweet_link.includes(oj.origin) || (isFixPosition && oj.origin == fixposition)) {
          imgs = [...tweet_body.querySelectorAll('img')];
        } else if (tweet.querySelector('div[data-testid="swipe-to-dismiss"]>div>div>div[aria-label="Image"]') != null) {
          imgs = [...tweet.querySelectorAll('img')];
        } else {
          let item = document.querySelector('article > div > div > div > div:nth-child(3)');
          if (item == null) {
            continue;
          }
          imgs = [...item.querySelectorAll('img')];
        }
        //check the length of the image list
        if (imgs.length <= 0) {
          continue;
        }
        let len = imgs.length >= oj.replacement.length ? oj.replacement.length : imgs.length;
        for (let i = 0; i < len; ++i) {
          if (oj.replacement[i] == null) {
            continue;
          }
          let pNode = imgs[i].parentNode;
          let div1 = document.createElement("div");
          div1.setAttribute("class","css-1dbjc4n r-1niwhzg r-vvn4in r-u6sd8q r-4gszlv r-1p0dtai r-1pi2tsx r-1d2f490 r-u8s1d r-zchlnj r-ipm5af r-13qz1uu r-1wyyakw");
          div1.setAttribute("style", "background-image: url(\"" + oj.replacement[i] + "\");");
          let img1 = document.createElement("img");
          img1.setAttribute("src", oj.replacement[i]);
          img1.setAttribute("alt", "Image");
          img1.setAttribute("draggable","true");
          img1.setAttribute("class","css-9pa8cd");
          pNode.replaceChild(div1, pNode.firstChild);
          pNode.replaceChild(img1, pNode.lastChild);
          // imgs[i].setAttribute("src", oj.replacement[i]);
          // imgs[i].setAttribute("alt", "Image");
          // imgs[i].parentNode.children[0].setAttribute("style", "background-image: url(\"" + oj.replacement[i] + "\");");
          // console.log(pNode);
        }
        //changes.splice(changes.indexOf(oj), 1)
      } else if (oj.type == "card" && ((isFixPosition && oj.origin == fixposition) || (tweet_link != null && tweet_link.includes(oj.origin)) || (tweet_link == null && window.location.href.includes(oj.origin)))) {
        let p = tweet_body == null ? document.querySelector('div[data-testid="card.wrapper"]') : tweet_body.querySelector('div[data-testid="card.wrapper"]');
        if (p == null) {
          continue;
        }
        let id = p.children[1].getAttribute("id");
        let card_node = createCardNode(oj.replacement, id);
        p.replaceChild(card_node, p.children[1]);
        //changes.splice(changes.indexOf(oj), 1)
      } else if (oj.type == "com_sum") {
        let inner_page_layer = tweet.querySelector('div[class="css-1dbjc4n r-1dgieki r-1efd50x r-5kkj8d r-13awgt0 r-18u37iz r-tzz3ar r-s1qlax r-1yzf0co"]')
        let total_comment = 0
        if (inner_page_layer != null && inner_page_layer.innerText.includes("Retweets")) {
          total_comment = parseInt(inner_page_layer.querySelector('span>span>span').innerText)
        } else {
          let item = tweet.querySelector('div[class="css-1dbjc4n r-1iusvr4 r-16y2uox r-1777fci r-kzbkwu"]>div:nth-child(2)>div:last-child>div>div:nth-child(1)')

          if (item == null || item == undefined || isNaN(parseInt(item.innerText))) {
            continue;
          }
          total_comment = parseInt(item.innerText);
        }
        // console.log(total_comment)

        let trueNum = null;
        let fakeNum = null;
        let dcNum = null;
        if (oj.replacement[2] == "count") {
          trueNum = Math.floor(parseFloat(oj.replacement[0]) * total_comment / 100);
          fakeNum = Math.floor(parseFloat(oj.replacement[1]) * total_comment / 100);
          dcNum = total_comment - trueNum - fakeNum;
        } else {
          trueNum = oj.replacement[0] + "%";
          fakeNum = oj.replacement[1] + "%";
          dcNum = String(100 - parseFloat(oj.replacement[0]) - parseFloat(oj.replacement[1])) + "%";
        }

        // check the condition/source
        // id
        let cond1 = (temp = tweet.querySelector('div[class^="css-1dbjc4n r-18u37iz r-1wbh5a2"]')) == null ? false : temp.innerText == oj.origin
        // specific link
        let cond2 = (tweet_link != null && tweet_link.includes(oj.origin) || (isFixPosition && oj.origin == fixposition)) ? true : (window.location.href.includes(oj.origin) && inner_page_layer != null) ? true : false
        // all
        let cond3 = oj.origin == "all"
        // old comment summary
        let old_node = tweet.querySelector('div[summarized="true"]')
        if ((cond1 || cond2 || cond3) && inner_page_layer != null) {
          if (old_node != null) {
            old_node.children[0].innerText = "True: " + trueNum
            old_node.children[1].innerText = "Fake: " + fakeNum
            // old_node.children[2].innerText = "Don't care: " + dcNum
          } else {
            let new_node = createCommentSummaryNode(trueNum, fakeNum, dcNum)
            inner_page_layer.parentNode.parentNode.insertBefore(new_node, inner_page_layer.parentNode)
          }
        } else if ((cond1 || cond2 || cond3) && inner_page_layer == null) {
          if (old_node != null) {
            old_node.children[0].innerText = "True: " + trueNum
            old_node.children[1].innerText = "Fake: " + fakeNum
            // old_node.children[2].innerText = "Don't care: " + dcNum
          } else {
            let new_node = createCommentSummaryNode(trueNum, fakeNum, dcNum)
            let p_node = tweet.querySelector('div[class="css-1dbjc4n r-1iusvr4 r-16y2uox r-1777fci r-kzbkwu"]>div:nth-child(2)>div:last-child')
            p_node.parentNode.insertBefore(new_node, p_node)
          }
        }
      }
    }
  })
}

setInterval(TaggingAndChange, 500);

function createEndNode() {
  let endNode = document.createElement('div');
  endNode.setAttribute("class", "css-1dbjc4n");
  
  let headOne = document.createElement("div");
  headOne.setAttribute("lang", "en");
  headOne.innerHTML = "End of the Experiment";
  headOne.setAttribute("style", "background-color: blue;color: red;width:100%; font-weight:bold; font-size:28px; display:flex; justify-content:center; align-items:center;");
  endNode.appendChild(headOne);
  return endNode;
}

function createCommentSummaryNode(num1, num2, num3) {
  let comSum = document.createElement('div')
  // comSum.setAttribute("class", "d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 d3f4x2em iv3no6db jq4qci2q a3bd9o3v b1v8xokw m9osqain")
  comSum.setAttribute("style", 'margin-top: 15px')
  let spanStyle = 'margin-right: 20px; padding-left: 13px;padding-right:13px; border: 1px solid #DFDFDF; border-radius: 32px;'
  let trueSpan = document.createElement('span')
  trueSpan.setAttribute("style", spanStyle)
  trueSpan.innerText = "True: " + num1
  comSum.appendChild(trueSpan)
  let fakeSpan = document.createElement('span')
  fakeSpan.setAttribute("style", spanStyle)
  fakeSpan.innerText = "Fake: " + num2
  comSum.appendChild(fakeSpan)
  let dcSpan = document.createElement('span')
  dcSpan.setAttribute("style", spanStyle)
  dcSpan.innerText = "Don't care: " + num3
  // comSum.appendChild(dcSpan)
  //console.log(comNum, trueNum, fakeNum, dcNum)
  comSum.setAttribute("summarized", "true")
  return comSum
}

function genID(length) {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
}

function createContentNode(lang, text, id) {
  let temp_node = document.createElement("div");
  temp_node.className = "css-1dbjc4n";
  temp_node.appendChild(document.createElement("div"));
  temp_node.children[0].setAttribute("class", "css-901oao r-18jsvk2 r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-bnwqim r-qvutc0");
  temp_node.children[0].setAttribute("data-testid", "tweetText");
  temp_node.children[0].setAttribute("dir", "auto");
  temp_node.children[0].setAttribute("lang", lang);
  temp_node.children[0].setAttribute("id", id);

  temp_node.children[0].appendChild(document.createElement("span"));
  temp_node.children[0].children[0].setAttribute("class", "css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0");
  temp_node.children[0].children[0].appendChild(document.createTextNode(text));
  return temp_node;
}

function createCardNode(data, id) {
  let temp_node = document.createElement("div");
  temp_node.className = "css-1dbjc4n";
  temp_node.setAttribute("id", id);

  temp_node.appendChild(document.createElement("a"));
  temp_node.children[0].setAttribute("href", data[0]);
  temp_node.children[0].setAttribute("rel", "noopener noreferrer");
  temp_node.children[0].setAttribute("target", "_blank");
  temp_node.children[0].setAttribute("role", "link");
  temp_node.children[0].setAttribute("class", "css-4rbku5 css-18t94o4 css-1dbjc4n r-1loqt21 r-18u37iz r-16y2uox r-1wtj0ep r-1ny4l3l r-o7ynqc r-6416eg");


  const div_class = ["css-901oao css-bfa6kz r-14j79pv r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-qvutc0", "css-901oao css-bfa6kz r-18jsvk2 r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-qvutc0", "css-901oao css-cens5h r-14j79pv r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-qvutc0"]
  const span_class = ["css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0", "css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0"];
  const style = "-webkit-line-clamp: 2;";

  let outer = document.createElement("div");
  outer.className = "css-1dbjc4n r-16y2uox r-1wbh5a2 r-z5qs1h r-1777fci r-kzbkwu r-1e081e0 r-ttdzmv";
  outer.setAttribute("data-testid", "card.layoutLarge.detail");
  for (let i = 0; i < 3; i++) {
    if (data[i + 1] == null) {
      continue;
    }
    //div
    let div = document.createElement("div");
    div.setAttribute("dir", "auto");
    div.setAttribute("class", div_class[i]);
    if (i == 2) {
      div.setAttribute("style", style);
    }
    //span
    div.appendChild(document.createElement("span"));
    div.children[0].setAttribute("class", span_class[0]);
    //span
    div.children[0].appendChild(document.createElement("span"));
    div.children[0].children[0].setAttribute("class", span_class[1]);
    div.children[0].children[0].appendChild(document.createTextNode(data[i + 1]));

    outer.appendChild(div);
  }
  if (data[4] != null) {
    let img = document.createElement("span");
    img.innerHTML = "i"
    img.setAttribute('style', 'border:1px solid #ccc !important; border-radius: 32px !important; margin-right: 0px; font-size: 20px !important; font-weight: 600 !important; float:right !important');
    img.setAttribute("title", data[4])
    img.setAttribute("weight", 20)
    img.setAttribute("height", 20)
    img.setAttribute("align", "right")
    outer.lastChild.appendChild(img)
  }
  temp_node.children[0].appendChild(outer);
  return temp_node;
}

var oldHref = document.location.href;
window.onload = function () {
  let bodyList = document.querySelector("body")
  let observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (oldHref != document.location.href) {
        oldHref = document.location.href;
        /* Changed your code here */
        init_change();
      }
    });
  });
  var config = {
    childList: true,
    subtree: true
  };
  observer.observe(bodyList, config);
};

var clickLikeTimes = 0;
var clickCommentTimes = 0;
var clickShareTimes = 0;
var clickRetweetTimes = 0;
var clickUnlikeTimes = 0;
var endNumber = -1;
const body = [];
const storeTweets = {};

function uploadClickDetail(e) {
  var date = new Date();
  var UTCdate = date.toUTCString();
  let key = "https://twitter.com" + e.currentTarget.getAttribute("web");
  let poster = storeTweets[key].poster;
  let duration = storeTweets[key].duration;
  let postTime = storeTweets[key].time;
  let postTimeLocal = storeTweets[key].local_post_time;
  let tweetContent = storeTweets[key].content;
  let hasImage = storeTweets[key].image;
  let outsiderLink = storeTweets[key].outside_link;
  let type = e.currentTarget.getAttribute("data-testid");
  body.push({
    "time": UTCdate, "action_type": type, "id": key, "poster": poster,
    "duration": duration, "post time": postTime, "post time local": postTimeLocal,
    "text content": tweetContent, "image information": hasImage, "outside link": outsiderLink
  });


  if (type === "reply") clickCommentTimes += 1;
  else if (type === "Share") clickShareTimes += 1;
  else if (type === "like") clickLikeTimes += 1;
  else if (type === "unlike") clickLikeTimes += 1;
  else if (type === "retweet") clickRetweetTimes += 1;
  console.log(body);

}

setTimeout(()=>{
  chrome.storage.local.get(["endNumber"], function (result) {
    endNumber = parseInt(result.endNumber) + 1
  })
},100)


let orderNum = 1;
const orderNumbers = {};
async function Separate() {
  const Tweets = [...document.body.querySelectorAll('article[data-testid="tweet"]')];
  const endNum = endNumber;
  // console.log('endNum 555 666 777 :>> ', endNum);
  Tweets.forEach(Tweet => {
    if (Tweet) {
      const uniqueID = Tweet.querySelector('a[aria-label~="ago"]');
      if (uniqueID) {
        //get poster's id
        Uid = uniqueID.getAttribute("href");
        lists = Uid.split("/");
        poster = lists[1];

        //get post duration
        postTime = uniqueID.getAttribute("aria-label");

        //get post time in UTC
        postTime2Tmp = Tweet.querySelector('time[datetime]').getAttribute("datetime");
        postTime2 = postTime2Tmp.replace("T", " ");
        postTime2 = postTime2.replace(".000Z", "");

        //get local post time (local based on user's position)
        postTimeLocal = new Date(postTime2Tmp).toLocaleString();

        //get content of tweet, if empry return null
        content = "";
        postInfos = Tweet.querySelector('div[data-testid="tweetText"]');
        if (postInfos) {
          content = postInfos.innerHTML.replace(/\<.*?\>/g, "");
        }

        //check if have image
        hasImage = [];
        outsideLink = "No outside link";
        postImage = Tweet.querySelector('div[aria-label="Image"]');
        if (postImage) {
          Images = Tweet.querySelectorAll('div[aria-label="Image"]');
          Images.forEach(EachImage => {
            address = EachImage.querySelector('img').getAttribute("src");
            hasImage.push(address);
          })
        }

        //check if has card info
        cardInfo = Tweet.querySelector('div[data-testid="card.wrapper"]');
        if (cardInfo) {
          isOrdered = Tweet.getAttribute("order_number"); //avoid give order number twice
          if (!isOrdered && orderNum < endNum) {  //not given an order
            orderNumbers[Uid] = "fix-position-" + orderNum.toString(); // e.g. fix-position-1
            Tweet.setAttribute('order_number', orderNumbers[Uid]);
            orderNum += 1;
          } else if (!isOrdered && orderNum == endNum) {
            orderNumbers[Uid] = "end";
            Tweet.setAttribute('order_number', "end");
            orderNum += 1;
          } else {
            givenOrder = orderNumbers[Uid];
            if (givenOrder) {
              Tweet.setAttribute('order_number', givenOrder);
            }
          }

          imgTemp = cardInfo.querySelector('img');
          if (imgTemp) {
            address = imgTemp.getAttribute("src");
            hasImage.push(address);
          }
          linkTemp = cardInfo.querySelector('a');
          if (linkTemp) {
            outsideLink = linkTemp.getAttribute("href");
          } else {
            outsideLink = "No outside link";
          }
        } else {
          if (orderNum <= endNum) {
            orderNumbers[Uid] = "delete";
            Tweet.setAttribute('order_number', "delete");
          } else {
            givenOrder = orderNumbers[Uid];
            if (givenOrder) {
              Tweet.setAttribute('order_number', givenOrder);
            }
          }
        }

        if (hasImage.length === 0) {
          hasImage.push("No Image");
        }

        /* console.log(poster);
        console.log(postTime);
        console.log(postInfos.innerHTML.replace(/\<.*?\>/g,"")); */

        storeTweets[uniqueID] = {
          "poster": poster, "duration": postTime,
          "time": postTime2, "local_post_time": postTimeLocal, "content": content,
          "image": hasImage, "outside_link": outsideLink
        };


        // add message for button
        const LikeButton = Tweet.querySelector('div[data-testid="like"]');
        if (LikeButton) {
          LikeButton.setAttribute('web', Uid);
          LikeButton.addEventListener("click", uploadClickDetail);
        }

        const UnlikeButton = Tweet.querySelector('div[data-testid="unlike"]');
        if (UnlikeButton) {
          UnlikeButton.setAttribute('web', Uid);
          UnlikeButton.addEventListener("click", uploadClickDetail);
        }

        const ShareButton = Tweet.querySelector('div[aria-label="Share Tweet"]');
        ShareButton.setAttribute('web', Uid);
        ShareButton.setAttribute('data-testid', "Share");
        ShareButton.addEventListener("click", uploadClickDetail);

        const ReplyButton = Tweet.querySelector('div[data-testid="reply"]');
        ReplyButton.setAttribute('web', Uid);
        ReplyButton.addEventListener("click", uploadClickDetail);

        const RetweetButton = Tweet.querySelector('div[data-testid="retweet"]');
        RetweetButton.setAttribute('web', Uid);
        RetweetButton.addEventListener("click", uploadClickDetail);
      }

    }
  });

  chrome.storage.local.set({
    curPlatform: 'twitter',
    like: clickLikeTimes,
    retweet: clickRetweetTimes,
    reply: clickCommentTimes,
    share: clickShareTimes,
    body: body
  }, () => {
    console.log("click data stored");
  });

}

setInterval(Separate, 500);
