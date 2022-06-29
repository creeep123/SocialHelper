/*global chrome*/
init([
  'isAdsBlocked',
  'isCreateRoomHidden',
  'isCreateStoryHidden',
  'isSuggestionBlocked',
  'isLikeHidden',
  'isShareHidden',
  'isCommentHidden',
  'isReactionHidden'
]);
// addCalmTitle();
// for (var i = 0; i < 2; i++) {
//   setTimeout(changeCalmColor, (i + 1) * 100);
// }
// var AdsIntervalId;
// var SuggestionIntervalId;
var changes;

function init(keys) {
  changes = null;
  chrome.storage.local.get(keys, function (data) {
    toggleClass(keys, data)
    insertNews();
  });
}

function insertNews(){
  chrome.storage.local.get('configFb', function (data) {
    changes = data.configFb.change
    let insert_posts = new Array();
    let changes_copy = changes.map((x) => x);
    for(let change of changes_copy){
      if(change.type === 'inserted_card'){
        let replacements = change.replacement
        replacements.push(change.origin)
        insert_posts.push(replacements)
        changes.splice(changes.indexOf(change), 1)
      }
    }
    let template = "<div class=\"du4w35lb k4urcfbm l9j0dhe7 sjgh65i0\"><div class=\"du4w35lb l9j0dhe7\"><div class=\"\"><div class=\"\"><div class=\"lzcic4wl\"><div class=\"j83agx80 cbu4d94t\"><div class=\"rq0escxv l9j0dhe7 du4w35lb\"><div class=\"j83agx80 l9j0dhe7 k4urcfbm\"><div class=\"rq0escxv l9j0dhe7 du4w35lb hybvsw6c io0zqebd m5lcvass fbipl8qg nwvqtn77 k4urcfbm ni8dbmo4 stjgntxs sbcfpzgs\" style=\"border-radius: max(0px, min(8px, ((100vw - 4px) - 100%) * 9999)) / 8px;\"><div><div></div><div><div><div class=\"\"></div><div><div class=\"ll8tlv6m j83agx80 btwxx1t3 n851cfcs hv4rvrfc dati1w0a pybr56ya\"><div class=\"oi9244e8 do00u71z j83agx80\"><span class=\"nc684nl6\">avatarImagePlaceholder</span></div><div class=\"buofh1pr\"><div class=\"j83agx80 cbu4d94t ew0dbk1b irj2b8pg\"><div class=\"qzhwtbm6 knvmm38d\"><span class=\"d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 d3f4x2em iv3no6db jq4qci2q a3bd9o3v b1v8xokw m9osqain hzawbc8m\"><h4 class=\"gmql0nx0 l94mrbxd p1ri9a11 lzcic4wl aahdfvyu hzawbc8m\"><span class=\"nc684nl6\"><a class=\"oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 nc684nl6 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl gpro0wi8 oo9gr5id lrazzd5p\" href=\"userNameUrlPlaceholder\"><strong><span>userNameDisplayPlaceholder</span></strong></a></span><span class=\"l9j0dhe7 h3qc4492\">&nbsp;<span><span class=\"hrs1iv20 pq6dq46d\"><i class=\"\" style=\"background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/6_b0I_TpqUX.png&quot;); background-position: -176px -48px; background-size: 190px 160px; width: 12px; height: 12px; background-repeat: no-repeat; display: inline-block;\"></i></span></span></span></h4></span></div><div class=\"qzhwtbm6 knvmm38d\"><span class=\"d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 d9wwppkn mdeji52x e9vueds3 j5wam9gi b1v8xokw m9osqain hzawbc8m\"><span><span class=\"jpp8pzdo\"><span><span class=\"rfua0xdk pmk7jnqg stjgntxs ni8dbmo4 ay7djpcl q45zohi1\">&nbsp;</span><span> · </span></span></span><span><span class=\"tojvnm2t a6sixzi8 abs2jz4q a8s20v7p t1p8iaqh k5wvi7nf q3lfd5jv pk4s997a bipmatt0 cebpdrjk qowsmv63 owwhemhu dp1hu0rb dhp61c6y iyyx5f41\">intervalTimePlaceholder</span></span><span class=\"jpp8pzdo\"><span><span class=\"rfua0xdk pmk7jnqg stjgntxs ni8dbmo4 ay7djpcl q45zohi1\">&nbsp;</span><span> · </span></span></span><span class=\"g0qnabr5\"><span class=\"tojvnm2t a6sixzi8 abs2jz4q a8s20v7p t1p8iaqh k5wvi7nf q3lfd5jv pk4s997a bipmatt0 cebpdrjk qowsmv63 owwhemhu dp1hu0rb dhp61c6y iyyx5f41\"><span class=\"q9uorilb l9j0dhe7 bk00n993\"><svg fill=\"currentColor\" viewBox=\"0 0 16 16\" width=\"1em\" height=\"1em\" class=\"a8c37x1j ms05siws l3qrxjdp b7h9ocf4 py1f6qlh cyypbtt7 fwizqjfa\" title=\"Shared with Public\"><title>Shared with Public</title><g fill-rule=\"evenodd\" transform=\"translate(-448 -544)\"><g><path d=\"M109.5 408.5c0 3.23-2.04 5.983-4.903 7.036l.07-.036c1.167-1 1.814-2.967 2-3.834.214-1 .303-1.3-.5-1.96-.31-.253-.677-.196-1.04-.476-.246-.19-.356-.59-.606-.73-.594-.337-1.107.11-1.954.223a2.666 2.666 0 0 1-1.15-.123c-.007 0-.007 0-.013-.004l-.083-.03c-.164-.082-.077-.206.006-.36h-.006c.086-.17.086-.376-.05-.529-.19-.214-.54-.214-.804-.224-.106-.003-.21 0-.313.004l-.003-.004c-.04 0-.084.004-.124.004h-.037c-.323.007-.666-.034-.893-.314-.263-.353-.29-.733.097-1.09.28-.26.863-.8 1.807-.22.603.37 1.166.667 1.666.5.33-.11.48-.303.094-.87a1.128 1.128 0 0 1-.214-.73c.067-.776.687-.84 1.164-1.2.466-.356.68-.943.546-1.457-.106-.413-.51-.873-1.28-1.01a7.49 7.49 0 0 1 6.524 7.434\" transform=\"translate(354 143.5)\"></path><path d=\"M104.107 415.696A7.498 7.498 0 0 1 94.5 408.5a7.48 7.48 0 0 1 3.407-6.283 5.474 5.474 0 0 0-1.653 2.334c-.753 2.217-.217 4.075 2.29 4.075.833 0 1.4.561 1.333 2.375-.013.403.52 1.78 2.45 1.89.7.04 1.184 1.053 1.33 1.74.06.29.127.65.257.97a.174.174 0 0 0 .193.096\" transform=\"translate(354 143.5)\"></path><path fill-rule=\"nonzero\" d=\"M110 408.5a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-1 0a7 7 0 1 0-14 0 7 7 0 0 0 14 0z\" transform=\"translate(354 143.5)\"></path></g></g></svg></span></span></span></span></span></div></div></div></div></div><div><div class=\"\"><div class=\"ecm0bbzt hv4rvrfc ihqw7lf3 dati1w0a\"><div class=\"j83agx80 cbu4d94t ew0dbk1b irj2b8pg\"><div class=\"qzhwtbm6 knvmm38d\"><span class=\"d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 d3f4x2em iv3no6db jq4qci2q a3bd9o3v b1v8xokw oo9gr5id hzawbc8m\"><div class=\"kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x c1et5uql ii04i59q\"><div style=\"text-align:start;\">contentPlaceholder</div></div></span></div></div></div></div><div class=\"l9j0dhe7\"><div class=\"l9j0dhe7\"><div><div class=\"b3i9ofy5 l9j0dhe7\"><div class=\"j83agx80 soycq5t1 ni8dbmo4 stjgntxs l9j0dhe7\"><a class=\"oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 nc684nl6 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl gmql0nx0 gpro0wi8 datstx6m k4urcfbm\" href=\"resourceUrlPlaceholder\" target=\"_blank\"><div class=\"bp9cbjyn cwj9ozl2 j83agx80 cbu4d94t ni8dbmo4 stjgntxs l9j0dhe7 k4urcfbm\"><div style=\"max-width: 100%; min-width: 500px; width: calc((100vh + -325px) * 1.91571);\"><div class=\"do00u71z ni8dbmo4 stjgntxs l9j0dhe7\" style=\"padding-top: 52.2%;\"><div class=\"pmk7jnqg kr520xx4\" style=\"height: 100%; left: 0%; width: calc(100%);\"><img height=\"261\" width=\"500\" class=\"i09qtzwb n7fi1qx3 datstx6m pmk7jnqg j9ispegn kr520xx4 k4urcfbm bixrwtb6\" src=\"resourceImageUrlPlaceholder\"></div></div></div></div><div class=\"linmgsc8 opwvks06 i09qtzwb rq0escxv n7fi1qx3 hzruof5a pmk7jnqg j9ispegn kr520xx4\"></div></a></div></div></div><div class=\"o0s42vec pmk7jnqg ehxjyohh b4oskaiq\"><div class=\"oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 nc684nl6 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl gmql0nx0 gpro0wi8\"><div class=\"bp9cbjyn cwj9ozl2 opwvks06 hop1g133 linmgsc8 t63ysoy8 cmek9o9a p7f4f6cj c8oo3d72 r15kkdkt oo9gr5id j83agx80 mudddibn taijpn5t ciadx1gn\"><span class=\"tojvnm2t a6sixzi8 abs2jz4q a8s20v7p t1p8iaqh k5wvi7nf q3lfd5jv pk4s997a bipmatt0 cebpdrjk qowsmv63 owwhemhu dp1hu0rb dhp61c6y iyyx5f41\"><i class=\"hu5pjgll lzf7d6o1\" title=\"informationSummaryHoverPlaceholder\" style=\"background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/zZy_cDj1YyY.png&quot;); background-position: 0px -252px; background-size: 26px 820px; width: 20px; height: 20px; background-repeat: no-repeat; display: inline-block;\"></i></span></div></div></div></div><div class=\"stjgntxs ni8dbmo4\"><div class=\"l9j0dhe7\"><a class=\"oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl gmql0nx0 a8c37x1j p8dawk7l\" href=\"resourceUrlPlaceholder\" target=\"_blank\"><div class=\"b3i9ofy5 s1tcr66n l9j0dhe7 p8dawk7l\"><div class=\"rq0escxv l9j0dhe7 du4w35lb j83agx80 pfnyh3mw i1fnvgqd bp9cbjyn owycx6da btwxx1t3 b5q2rw42 lq239pai f10w8fjw hv4rvrfc dati1w0a pybr56ya\"><div class=\"rq0escxv l9j0dhe7 du4w35lb d2edcug0 hpfvmrgz rj1gh0hx buofh1pr g5gj957u p8fzw8mz pcp91wgn\"><div class=\"bi6gxh9e sqxagodl\"><span class=\"d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 d9wwppkn iv3no6db e9vueds3 j5wam9gi b1v8xokw m9osqain\"><span class=\"a8c37x1j ni8dbmo4 stjgntxs l9j0dhe7 ltmttdrg g0qnabr5 ojkyduve\">resourceWebsiteNamePlaceholder</span></span></div><div class=\"ni8dbmo4 stjgntxs rq0escxv a5q79mjw enqfppq2 muag1w35 e5nlhep0 ecm0bbzt r9c01rrb\"><div class=\"j83agx80 cbu4d94t ew0dbk1b irj2b8pg\"><div class=\"qzhwtbm6 knvmm38d\"><span class=\"d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 d3f4x2em iv3no6db a5q79mjw g1cxx5fr lrazzd5p oo9gr5id hzawbc8m\"><span class=\"a8c37x1j ni8dbmo4 stjgntxs l9j0dhe7 ojkyduve\" style=\"-webkit-box-orient: vertical; -webkit-line-clamp: 2; display: -webkit-box;\"><span>resourceAbstractPlaceholder</span></span></span></div></div></div></div><div class=\"rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t pfnyh3mw d2edcug0 hpfvmrgz p8fzw8mz pcp91wgn\"></div></div></div></a></div></div></div></div><div><div class=\"stjgntxs ni8dbmo4 l82x9zwi uo3d90p7 h905i5nu monazrh9\"><div><div><div><div class=\"l9j0dhe7\"><div class=\"bp9cbjyn m9osqain j83agx80 jq4qci2q bkfpd7mw a3bd9o3v kvgmc6g5 wkznzc2l oygrvhab dhix69tm jktsbyx5 rz4wbd8a osnr6wyh a8nywdso s1tcr66n\"><div class=\"bp9cbjyn j83agx80 buofh1pr ni8dbmo4 stjgntxs\"><span class=\"du4w35lb\"><span class=\"bp9cbjyn j83agx80 b3onmgus\"><span class=\"np69z8it et4y5ytx j7g94pet b74d5cxt qw6c0r16 kb8x4rkr ed597pkb omcyoz59 goun2846 ccm00jje s44p3ltw mk2mc5f4 qxh1up0x qtyiw8t4 tpcyxxvw k0bpgpbk hm271qws rl04r1d5 l9j0dhe7 ov9facns kavbgo14\"><span class=\"t0qjyqq4 jos75b7i j6sty90h kv0toi1t q9uorilb hm271qws ov9facns\"><span class=\"tojvnm2t a6sixzi8 abs2jz4q a8s20v7p t1p8iaqh k5wvi7nf q3lfd5jv pk4s997a bipmatt0 cebpdrjk qowsmv63 owwhemhu dp1hu0rb dhp61c6y iyyx5f41\"><div class=\"oajrlxb2 gs1a9yip g5ia77u1 mtkw9kbi tlpljxtp qensuy8j ppp5ayq2 goun2846 ccm00jje s44p3ltw mk2mc5f4 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 rq0escxv nhd2j8a9 mg4g778l pfnyh3mw p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x tgvbjcpo hpfvmrgz jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso l9j0dhe7 i1ao9s8h esuyzwwr f1sip0of du4w35lb n00je7tq arfg74bv qs9ysxi8 k77z8yql pq6dq46d btwxx1t3 abiwlrkh p8dawk7l lzcic4wl\"><img class=\"j1lvzwm4\" height=\"18\" src=\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%2318AFFF'/%3e%3cstop offset='100%25' stop-color='%230062DF'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0 0 0 0 0 0.299356041 0 0 0 0 0.681187726 0 0 0 0.3495684 0'/%3e%3c/filter%3e%3cpath id='b' d='M8 0a8 8 0 00-8 8 8 8 0 1016 0 8 8 0 00-8-8z'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='white' d='M12.162 7.338c.176.123.338.245.338.674 0 .43-.229.604-.474.725a.73.73 0 01.089.546c-.077.344-.392.611-.672.69.121.194.159.385.015.62-.185.295-.346.407-1.058.407H7.5c-.988 0-1.5-.546-1.5-1V7.665c0-1.23 1.467-2.275 1.467-3.13L7.361 3.47c-.005-.065.008-.224.058-.27.08-.079.301-.2.635-.2.218 0 .363.041.534.123.581.277.732.978.732 1.542 0 .271-.414 1.083-.47 1.364 0 0 .867-.192 1.879-.199 1.061-.006 1.749.19 1.749.842 0 .261-.219.523-.316.666zM3.6 7h.8a.6.6 0 01.6.6v3.8a.6.6 0 01-.6.6h-.8a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6z'/%3e%3c/g%3e%3c/svg%3e\" width=\"18\"></div></span></span></span></span></span><div class=\"\"><span class=\"tojvnm2t a6sixzi8 abs2jz4q a8s20v7p t1p8iaqh k5wvi7nf q3lfd5jv pk4s997a bipmatt0 cebpdrjk qowsmv63 owwhemhu dp1hu0rb dhp61c6y iyyx5f41\"><div class=\"oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of n00je7tq arfg74bv qs9ysxi8 k77z8yql l9j0dhe7 abiwlrkh p8dawk7l lzcic4wl gmql0nx0 ce9h75a5 ni8dbmo4 stjgntxs tkr6xdv7 a8c37x1j\" role=\"button\"><span class=\"bzsjyuwj ni8dbmo4 stjgntxs ltmttdrg gjzvkazv\"><span><span class=\"gpro0wi8 pcp91wgn\">likeNumberPlaceholder</span></span></span> </div></span></div></div><div class=\"bp9cbjyn j83agx80 pfnyh3mw p1ueia1e\"><div class=\"gtad4xkn\"></div><div class=\"gtad4xkn\"><span class=\"tojvnm2t a6sixzi8 abs2jz4q a8s20v7p t1p8iaqh k5wvi7nf q3lfd5jv pk4s997a bipmatt0 cebpdrjk qowsmv63 owwhemhu dp1hu0rb dhp61c6y iyyx5f41\"><div class=\"oajrlxb2 gs1a9yip mtkw9kbi tlpljxtp qensuy8j ppp5ayq2 nhd2j8a9 mg4g778l pfnyh3mw p7hjln8o tgvbjcpo hpfvmrgz esuyzwwr f1sip0of n00je7tq arfg74bv qs9ysxi8 k77z8yql pq6dq46d btwxx1t3 abiwlrkh lzcic4wl dwo3fsh8 g5ia77u1 goun2846 ccm00jje s44p3ltw mk2mc5f4 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 rq0escxv gmql0nx0 kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso l9j0dhe7 i1ao9s8h du4w35lb gpro0wi8\"><span class=\"d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 d3f4x2em iv3no6db jq4qci2q a3bd9o3v b1v8xokw m9osqain\">commentNumberPlaceholder</span></div></span></div><div class=\"gtad4xkn\"><span class=\"tojvnm2t a6sixzi8 abs2jz4q a8s20v7p t1p8iaqh k5wvi7nf q3lfd5jv pk4s997a bipmatt0 cebpdrjk qowsmv63 owwhemhu dp1hu0rb dhp61c6y iyyx5f41\"><div class=\"oajrlxb2 gs1a9yip mtkw9kbi tlpljxtp qensuy8j ppp5ayq2 nhd2j8a9 mg4g778l pfnyh3mw p7hjln8o tgvbjcpo hpfvmrgz esuyzwwr f1sip0of n00je7tq arfg74bv qs9ysxi8 k77z8yql pq6dq46d btwxx1t3 abiwlrkh lzcic4wl dwo3fsh8 g5ia77u1 goun2846 ccm00jje s44p3ltw mk2mc5f4 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 rq0escxv gmql0nx0 kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso l9j0dhe7 i1ao9s8h du4w35lb gpro0wi8\"><span class=\"d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 d3f4x2em iv3no6db jq4qci2q a3bd9o3v b1v8xokw m9osqain\">shareNumberPlaceholder</span></div></span></div></div></div><div class=\"is6700om i09qtzwb rm7oo3ik pmk7jnqg j9ispegn kr520xx4 dsl5tyj5\"></div></div><div class=\"tvfksri0 ozuftl9m\"><div style=\"pointer-events: none;\" class=\"rq0escxv l9j0dhe7 du4w35lb j83agx80 pfnyh3mw i1fnvgqd gs1a9yip owycx6da btwxx1t3 ph5uu5jm b3onmgus e5nlhep0 ecm0bbzt nkwizq5d roh60bw9 mysgfdmx hddg9phg\"><div class=\"rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t d2edcug0 hpfvmrgz rj1gh0hx buofh1pr g5gj957u n8tt0mok hyh9befq iuny7tx3 ipjc6fyt\"><div class=\"oajrlxb2 gs1a9yip g5ia77u1 mtkw9kbi tlpljxtp qensuy8j ppp5ayq2 goun2846 ccm00jje s44p3ltw mk2mc5f4 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 rq0escxv nhd2j8a9 mg4g778l pfnyh3mw p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x tgvbjcpo hpfvmrgz jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso l9j0dhe7 i1ao9s8h esuyzwwr du4w35lb n00je7tq arfg74bv qs9ysxi8 k77z8yql pq6dq46d btwxx1t3 abiwlrkh p8dawk7l lzcic4wl gokke00a\"><div class=\"rq0escxv l9j0dhe7 du4w35lb j83agx80 rj1gh0hx buofh1pr g5gj957u hpfvmrgz taijpn5t bp9cbjyn owycx6da btwxx1t3 d1544ag0 tw6a2znq jb3vyjys dlv3wnog rl04r1d5 mysgfdmx hddg9phg qu8okrzs g0qnabr5\"><div class=\"rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t pfnyh3mw d2edcug0 hpfvmrgz ph5uu5jm b3onmgus iuny7tx3 ipjc6fyt\"><span class=\" pq6dq46d\"><i class=\"hu5pjgll m6k467ps\" style=\"background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/zZy_cDj1YyY.png&quot;); background-position: 0px -336px; background-size: 26px 820px; width: 18px; height: 18px; background-repeat: no-repeat; display: inline-block;\"></i></span></div><div class=\"rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t pfnyh3mw d2edcug0 hpfvmrgz ph5uu5jm b3onmgus iuny7tx3 ipjc6fyt\"><span class=\"d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 d3f4x2em iv3no6db jq4qci2q a3bd9o3v lrazzd5p m9osqain\"><span>Like</span></span></div></div><div class=\"n00je7tq arfg74bv qs9ysxi8 k77z8yql i09qtzwb n7fi1qx3 b5wmifdl hzruof5a pmk7jnqg j9ispegn kr520xx4 c5ndavph art1omkt ot9fgl3s\" style=\"border-radius: 4px;\"></div></div><div class=\"oajrlxb2 gs1a9yip g5ia77u1 mtkw9kbi tlpljxtp qensuy8j ppp5ayq2 goun2846 ccm00jje s44p3ltw mk2mc5f4 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 rq0escxv nhd2j8a9 mg4g778l pfnyh3mw p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x tgvbjcpo hpfvmrgz i1ao9s8h esuyzwwr du4w35lb n00je7tq arfg74bv qs9ysxi8 k77z8yql pq6dq46d btwxx1t3 abiwlrkh p8dawk7l lzcic4wl pphx12oy b4ylihy8 rz4wbd8a b40mr0ww a8nywdso hmalg0qr q45zohi1 g0aa4cga pmk7jnqg gokke00a\"><i class=\"hu5pjgll m6k467ps\" style=\"background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/6_b0I_TpqUX.png&quot;); background-position: -18px -132px; background-size: 190px 160px; width: 16px; height: 16px; background-repeat: no-repeat; display: inline-block;\"></i><div class=\"n00je7tq arfg74bv qs9ysxi8 k77z8yql i09qtzwb n7fi1qx3 b5wmifdl hzruof5a pmk7jnqg j9ispegn kr520xx4 c5ndavph art1omkt ot9fgl3s\"></div></div></div><div class=\"rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t d2edcug0 hpfvmrgz rj1gh0hx buofh1pr g5gj957u n8tt0mok hyh9befq iuny7tx3 ipjc6fyt\"><div class=\"oajrlxb2 gs1a9yip g5ia77u1 mtkw9kbi tlpljxtp qensuy8j ppp5ayq2 goun2846 ccm00jje s44p3ltw mk2mc5f4 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 rq0escxv nhd2j8a9 mg4g778l pfnyh3mw p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x tgvbjcpo hpfvmrgz jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso l9j0dhe7 i1ao9s8h esuyzwwr f1sip0of du4w35lb n00je7tq arfg74bv qs9ysxi8 k77z8yql pq6dq46d btwxx1t3 abiwlrkh p8dawk7l lzcic4wl\"><div class=\"rq0escxv l9j0dhe7 du4w35lb j83agx80 rj1gh0hx buofh1pr g5gj957u hpfvmrgz taijpn5t bp9cbjyn owycx6da btwxx1t3 d1544ag0 tw6a2znq jb3vyjys dlv3wnog rl04r1d5 mysgfdmx hddg9phg qu8okrzs g0qnabr5\"><div class=\"rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t pfnyh3mw d2edcug0 hpfvmrgz ph5uu5jm b3onmgus iuny7tx3 ipjc6fyt\"><i class=\"hu5pjgll m6k467ps\" style=\"background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/zZy_cDj1YyY.png&quot;); background-position: 0px -296px; background-size: 26px 820px; width: 18px; height: 18px; background-repeat: no-repeat; display: inline-block;\"></i></div><div class=\"rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t pfnyh3mw d2edcug0 hpfvmrgz ph5uu5jm b3onmgus iuny7tx3 ipjc6fyt\"><span class=\"d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 d3f4x2em iv3no6db jq4qci2q a3bd9o3v lrazzd5p m9osqain\">Comment</span></div></div><div class=\"n00je7tq arfg74bv qs9ysxi8 k77z8yql i09qtzwb n7fi1qx3 b5wmifdl hzruof5a pmk7jnqg j9ispegn kr520xx4 c5ndavph art1omkt ot9fgl3s\" style=\"border-radius: 4px;\"></div></div></div><div class=\"rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t d2edcug0 hpfvmrgz rj1gh0hx buofh1pr g5gj957u n8tt0mok hyh9befq iuny7tx3 ipjc6fyt\"><div class=\"oajrlxb2 gs1a9yip g5ia77u1 mtkw9kbi tlpljxtp qensuy8j ppp5ayq2 goun2846 ccm00jje s44p3ltw mk2mc5f4 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 rq0escxv nhd2j8a9 mg4g778l pfnyh3mw p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x tgvbjcpo hpfvmrgz jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso l9j0dhe7 i1ao9s8h esuyzwwr f1sip0of du4w35lb n00je7tq arfg74bv qs9ysxi8 k77z8yql pq6dq46d btwxx1t3 abiwlrkh p8dawk7l lzcic4wl\"><div class=\"rq0escxv l9j0dhe7 du4w35lb j83agx80 rj1gh0hx buofh1pr g5gj957u hpfvmrgz taijpn5t bp9cbjyn owycx6da btwxx1t3 d1544ag0 tw6a2znq jb3vyjys dlv3wnog rl04r1d5 mysgfdmx hddg9phg qu8okrzs g0qnabr5\"><div class=\"rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t pfnyh3mw d2edcug0 hpfvmrgz ph5uu5jm b3onmgus iuny7tx3 ipjc6fyt\"><i class=\"hu5pjgll m6k467ps\" style=\"background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/zZy_cDj1YyY.png&quot;); background-position: 0px -356px; background-size: 26px 820px; width: 18px; height: 18px; background-repeat: no-repeat; display: inline-block;\"></i></div><div class=\"rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t pfnyh3mw d2edcug0 hpfvmrgz ph5uu5jm b3onmgus iuny7tx3 ipjc6fyt\"><span class=\"d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 d3f4x2em iv3no6db jq4qci2q a3bd9o3v lrazzd5p m9osqain\">Share</span></div></div><div class=\"n00je7tq arfg74bv qs9ysxi8 k77z8yql i09qtzwb n7fi1qx3 b5wmifdl hzruof5a pmk7jnqg j9ispegn kr520xx4 c5ndavph art1omkt ot9fgl3s rnr61an3\" style=\"border-radius: 4px;\"></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div>"
    let FeedUnits = [...document.body.querySelectorAll('div[role="feed"]>div')];
    for (let post of insert_posts){
      let insertedNode = template
      if(post[0] === 'true'){
        insertedNode = insertedNode.replace("avatarImagePlaceholder", "<img src=\"" + post[1] +  "\" style=\"border-radius:50%;height:40px;width:40px\">")
      }else{
        insertedNode = insertedNode.replace("avatarImagePlaceholder", "<div style=\" border:0; height:40px;width:40px\"></div>")
      }
      insertedNode = insertedNode.replace("userNameUrlPlaceholder", post[3])
      insertedNode = insertedNode.replace("userNameDisplayPlaceholder", post[2])
      if(post[4] === 'true'){
        insertedNode = insertedNode.replace("intervalTimePlaceholder", post[5])
      }else{
        insertedNode = insertedNode.replace("intervalTimePlaceholder", ' ')
      }
      
      insertedNode = insertedNode.replace("contentPlaceholder", post[6])
      insertedNode = insertedNode.replace("resourceUrlPlaceholder", post[7])
      insertedNode = insertedNode.replace("resourceImageUrlPlaceholder", post[8])
      insertedNode = insertedNode.replace("resourceUrlPlaceholder", post[7])
      insertedNode = insertedNode.replace("informationSummaryHoverPlaceholder", post[9])
      insertedNode = insertedNode.replace("resourceWebsiteNamePlaceholder", post[10])
      insertedNode = insertedNode.replace("resourceAbstractPlaceholder", post[11])
      insertedNode = insertedNode.replace("likeNumberPlaceholder", post[12])
      insertedNode = insertedNode.replace("commentNumberPlaceholder", post[13] + ' Comments')
      insertedNode = insertedNode.replace("shareNumberPlaceholder", post[14] + ' Shares')
      let wrapper = document.createElement('div')
      wrapper.innerHTML = insertedNode
      wrapper.setAttribute('order_number', post[15])
      FeedUnits[0].parentElement.insertBefore(wrapper, FeedUnits[0])
    }
    // End block
    if(insert_posts.length !== 0){
      let endNode = document.createElement('div');
      endNode.setAttribute("class", "css-1dbjc4n");
      let headOne = document.createElement("div");
      headOne.setAttribute("lang", "en");
      headOne.innerHTML = "End of the Experiment";
      headOne.setAttribute("style", "margin-bottom:30px; background-color: blue;color: red;width:100%; font-weight:bold; font-size:28px; display:flex; justify-content:center; align-items:center;");
      endNode.appendChild(headOne);
      FeedUnits[0].parentElement.insertBefore(endNode, FeedUnits[0])
    }
  })
}

function toggleClass(keys, data) {
  console.log('。。。。。。toggleClass content script working。。。。。。 ');
  keys.forEach(function (key) {
    // 如果属于以下某一条规则变量
    if (
      key === 'isAdsBlocked' ||
      key === 'isCreateRoomHidden' ||
      key === 'isCreateStoryHidden' ||
      key === 'isSuggestionBlocked' ||
      key === 'isLikeHidden' ||
      key === 'isCommentHidden' ||
      key === 'isShareHidden' ||
      key === 'isReactionHidden'
    ) {
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
    // block function
    // if (key === 'isAdsBlocked') {
    //   // console.log(key + ": " + data[key])
    //   if (data[key]) {
    //     AdsIntervalId = setInterval(BlockFacebookAds, 2000);
    //   } else if (AdsIntervalId != undefined) {
    //     clearInterval(AdsIntervalId);
    //   }
    // }
    // if (key === 'isSuggestionBlocked') {
    //   if (data[key]) {
    //     SuggestionIntervalId = setInterval(BlockSuggestion, 2000);
    //   } else if (SuggestionIntervalId != undefined) {
    //     clearInterval(SuggestionIntervalId);
    //   }
    // }
    var body = document.getElementsByTagName('body')[0];
    // console.log(key + ": " + data[key])
    // 根据设定值添加或移除规则同名 Class
    if (data[key]) {
      body.classList.add(key);
    } else {
      body.classList.remove(key);
    }
  });
}
// 接收到 Message
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('onMessage in facebook content Working....... ');
  if (request.from === 'controller' && request.subject === 'check platform') {
    console.log('reached content script')
    sendResponse('facebook')
  } else if (request.key.length >= 1) {
    toggleClass(request.key, request.data.hide);
    sendResponse()
  } else {
    toggleClass([request.key], request.data.hide);
    sendResponse()
  }
  return true;
});
//chrome.runtime.sendMessage({ from: 'content', subject: 'showPageAction' });
// function addCalmTitle() {
//   var calmText = chrome.i18n.getMessage('textCalm');
//   var css =
//     'body.showCalmText header[role="banner"] h1[role="heading"]::after { content:"' +
//     calmText +
//     '";}';
//   var head = document.head || document.getElementsByTagName('head')[0];
//   var style = document.createElement('style');
//   head.appendChild(style);
//   style.type = 'text/css';
//   style.appendChild(document.createTextNode(css));
// }
// function changeCalmColor() {
//   var body = document.body || document.getElementsByTagName('body')[0];
//   if (body.style.backgroundColor !== null) {
//     var logo = document.querySelector(
//       'header[role="banner"] h1[role="heading"] > a svg'
//     );
//     if (logo !== null) {
//       var css =
//         'body.showCalmText header[role="banner"] h1[role="heading"]::after { color: ' +
//         window.getComputedStyle(logo).color +
//         ';}';
//       var head = document.head || document.getElementsByTagName('head')[0];
//       var style = document.createElement('style');
//       head.appendChild(style);
//       style.type = 'text/css';
//       style.appendChild(document.createTextNode(css));
//     }
//   }
// }
function checkKeyword(standard, text) {
  // if (standard.length != text.length) {
  //   return false;
  // }
  for (let i = 0; i < standard.length; i++) {
    if (text.indexOf(standard[i]) == -1) {
      return false;
    }
  }
  return true;
}

function TaggingAndChange() {
  const rightRail = [...document.querySelectorAll('div[data-pagelet="RightRail"] > div')];

  rightRail.forEach(unit => {
    if (unit.innerHTML.includes("Sponsored")) {
      unit.setAttribute("post_type", "Ads");
      // unit.remove();
    }
  });
  
  let FeedUnits = [...document.body.querySelectorAll('div[role="feed"]>div')];
  FeedUnits.forEach(feedunit => {
    if (feedunit) {
      // Block Ads
      // feedunit.setAttribute("data-pagelet", "Ads_" + feedunit.getAttribute("data-pagelet"));
      const sponsorLettersDOM = [...feedunit.querySelectorAll('span.nc684nl6.l94mrbxd.l9j0dhe7.sdhka5h4 > span')].filter(d => {
        const styles = window.getComputedStyle(d, null);
        return styles.top === "0px" && styles.display !== "none";
      }).map(d => d.textContent);

      const sponsorText = 'S' + sponsorLettersDOM.join('');

      if (checkKeyword('SSponsored', sponsorText) || checkKeyword('Sponsored', sponsorText)) {
        feedunit.setAttribute("post_type", "Ads");
      }

      // Block suggestions
      if (feedunit.innerHTML.includes("Suggested for you") || feedunit.innerHTML.includes("Recommended post")) {
        feedunit.setAttribute("post_type", "Suggestion");
      }
      let changes_copy = changes.map((x) => x);
      // changing process
      for (let oj of changes_copy) {
        // Change username
        if (oj.type == "user_name" && feedunit.innerHTML.includes(oj.origin)) {
          let nameFields = feedunit.getElementsByClassName("d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 d3f4x2em iv3no6db jq4qci2q a3bd9o3v b1v8xokw m9osqain hzawbc8m")
          for (let nameField of nameFields) {
            let str = nameField.innerHTML
            if (str.includes(oj.origin)) {
              var re = new RegExp(oj.origin, 'g')
              let str2 = str.replace(re, oj.replacement)
              nameField.innerHTML = str2
            }
          }
        }
        // Change photo content 
        else if (oj.type == "content" && feedunit.innerHTML.includes(oj.origin)) {
          let contentField = feedunit.getElementsByClassName("kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x c1et5uql ii04i59q")
          contentField[0].innerHTML = "<div>" + oj.replacement + "</div>"
          changes.splice(changes.indexOf(oj), 1)
        }
        // Change image
        else if (oj.type == "image" && feedunit.innerHTML.includes(oj.origin)) {
          let imageField = feedunit.getElementsByClassName("do00u71z ni8dbmo4 stjgntxs l9j0dhe7")[0].childNodes[0]
          if (imageField.childNodes.length != 0 && imageField.childNodes[0].nodeName.toLowerCase() == 'img') {
            imageField.childNodes[0].setAttribute("src", oj.replacement[0])
            changes.splice(changes.indexOf(oj), 1)
          }
        }
        // Change card
        else if (oj.type == "card" && feedunit.innerHTML.includes(oj.origin)) {
          let replacements = oj.replacement
          // Change the resource url
          if(replacements[0] !== 'null'){
            let linkField = feedunit.getElementsByClassName("oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 nc684nl6 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl gmql0nx0 gpro0wi8 datstx6m k4urcfbm")[0]
            let childrenNode = linkField.childNodes;
            let textLink = feedunit.getElementsByClassName("oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl gmql0nx0 a8c37x1j p8dawk7l")[0]
            let textChildren = textLink.childNodes
            // Create new link node
            let new_link = document.createElement('a')
            new_link.setAttribute("class", 'oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 nc684nl6 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl gmql0nx0 gpro0wi8 datstx6m k4urcfbm')
            new_link.setAttribute('href', replacements[0])
            new_link.setAttribute('target', "_blank")
            for(let childNode of childrenNode){
              new_link.appendChild(childNode)
            }
            let textNewLink = document.createElement('a')
            textNewLink.setAttribute("class", 'oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl gmql0nx0 a8c37x1j p8dawk7l')
            textNewLink.setAttribute('href', replacements[0])
            textNewLink.setAttribute("target", "_blank")
            for(let childNode of textChildren){
              textNewLink.appendChild(childNode)
            }
            let linkWrapper = feedunit.getElementsByClassName("j83agx80 soycq5t1 ni8dbmo4 stjgntxs l9j0dhe7")[0]
            let textLinkWrapper = textLink.parentNode;
            // Clear old wrapper and add new content
            while (linkWrapper.firstChild) {
              linkWrapper.removeChild(linkWrapper.lastChild);
            }
            while (textLinkWrapper.firstChild) {
              textLinkWrapper.removeChild(textLinkWrapper.lastChild);
            }
            linkWrapper.appendChild(new_link)
            textLinkWrapper.appendChild(textNewLink)
          }
          // Clear the old wrapper
          let triLineWrapper = feedunit.getElementsByClassName("rq0escxv l9j0dhe7 du4w35lb d2edcug0 hpfvmrgz rj1gh0hx buofh1pr g5gj957u p8fzw8mz pcp91wgn")[0]
          while (triLineWrapper.firstChild) {
            triLineWrapper.removeChild(triLineWrapper.lastChild);
          }
          // Change the title
          if(replacements[1] !== ''){
            // Create new nodes about the title
            let titleWrapper = document.createElement("div")
            titleWrapper.setAttribute("class", "bi6gxh9e sqxagodl")
            let titleSpanWrapper = document.createElement("span")
            titleSpanWrapper.setAttribute("class", "d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 d9wwppkn iv3no6db e9vueds3 j5wam9gi b1v8xokw m9osqain")
            titleSpanWrapper.setAttribute("dir", "auto")
            let titleField = document.createElement("span")
            titleField.setAttribute("class", "a8c37x1j ni8dbmo4 stjgntxs l9j0dhe7 ltmttdrg g0qnabr5 ojkyduve")
            titleField.innerHTML = replacements[1]
            titleSpanWrapper.appendChild(titleField)
            titleWrapper.appendChild(titleSpanWrapper)
            triLineWrapper.appendChild(titleWrapper)
          }
          let douLineWrapper = document.createElement("div")
          douLineWrapper.setAttribute("class", "ni8dbmo4 stjgntxs rq0escxv a5q79mjw enqfppq2 muag1w35 e5nlhep0 ecm0bbzt r9c01rrb")
          let subDouLineWrapper = document.createElement("div")
          subDouLineWrapper.setAttribute("class", "j83agx80 cbu4d94t ew0dbk1b irj2b8pg")
          // Change the abstract
          if(replacements[2] !== ''){
            // Create new nodes about the abstract
            let absWrapper = document.createElement("div")
            absWrapper.setAttribute("class", "qzhwtbm6 knvmm38d")
            let absSpanWrapper = document.createElement("span")
            absSpanWrapper.setAttribute("class", "d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 d3f4x2em iv3no6db a5q79mjw g1cxx5fr lrazzd5p oo9gr5id hzawbc8m")
            absSpanWrapper.setAttribute("dir", "auto")
            let absField = document.createElement("span")
            absField.setAttribute("class", "a8c37x1j ni8dbmo4 stjgntxs l9j0dhe7 ojkyduve")
            absField.setAttribute("style", "-webkit-box-orient: vertical; -webkit-line-clamp: 2; display: -webkit-box;")
            let abs = document.createElement("span")
            abs.innerHTML = replacements[2]
            absField.appendChild(abs)
            absSpanWrapper.appendChild(absField)
            absWrapper.appendChild(absSpanWrapper)
            subDouLineWrapper.appendChild(absWrapper)
          }
          // Change the content
          if(replacements[3] !== ''){
            // Create new nodes about the content
            let conWrapper = document.createElement("div")
            conWrapper.setAttribute("class", "qzhwtbm6 knvmm38d")
            let conSpanWrapper = document.createElement("span")
            conSpanWrapper.setAttribute("class", "d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 d3f4x2em iv3no6db jq4qci2q a3bd9o3v b1v8xokw m9osqain hzawbc8m")
            conSpanWrapper.setAttribute("dir", "auto")
            let conField = document.createElement("span")
            conField.setAttribute("class", "a8c37x1j ni8dbmo4 stjgntxs l9j0dhe7 ltmttdrg g0qnabr5")
            let con = document.createElement("span")
            con.innerHTML = replacements[3]
            conField.appendChild(con)
            conSpanWrapper.appendChild(conField)
            conWrapper.appendChild(conSpanWrapper)
            subDouLineWrapper.appendChild(conWrapper)
          }

          // Add the new created node into the wrapper
          douLineWrapper.appendChild(subDouLineWrapper)
          triLineWrapper.appendChild(douLineWrapper)
          changes.splice(changes.indexOf(oj), 1)
        }
        // Comment summary for specific post
        else if(oj.type == "com_sum" && oj.origin !== '' && feedunit.getAttribute("order_number") === (oj.origin)){
          let percentages = oj.replacement
          generateCommentSum(feedunit, percentages, true)
          changes.splice(changes.indexOf(oj), 1)
        } 
        // Comment summary for all post
        else if(oj.type == "com_sum" && oj.origin === '' && feedunit.getAttribute("summarized") === null){
          generateCommentSum(feedunit, oj.replacement, false)
        }
      }
    }
  });

  // Change popup username
  for (let oj of changes) {
    let popups = document.querySelector('span[class="d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 ns63r2gh iv3no6db o3w64lxj b2s5l15y hnhda86s oo9gr5id hzawbc8m"');
    if (popups != null && popups != undefined) {
      let str = popups.innerHTML
      if (oj.type == "user_name" && str.includes(oj.origin)) {
        var re = new RegExp(oj.origin, 'g')
        let str2 = str.replace(re, oj.replacement)
        popups.innerHTML = str2
      }
    }
  }
}
setInterval(TaggingAndChange, 1000)

function generateCommentSum(feedunit, percentages, clearFlag){
  let commentField = feedunit.getElementsByClassName("oajrlxb2 gs1a9yip mtkw9kbi tlpljxtp qensuy8j ppp5ayq2 nhd2j8a9 mg4g778l pfnyh3mw p7hjln8o tgvbjcpo hpfvmrgz esuyzwwr f1sip0of n00je7tq arfg74bv qs9ysxi8 k77z8yql pq6dq46d btwxx1t3 abiwlrkh lzcic4wl dwo3fsh8 g5ia77u1 goun2846 ccm00jje s44p3ltw mk2mc5f4 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 rq0escxv gmql0nx0 kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso l9j0dhe7 i1ao9s8h du4w35lb gpro0wi8")
    if (commentField.length != 0) {
      let comStr = commentField[0].innerText.toLowerCase();
      if (comStr.includes("comment")) {
        let comNum = parseFloat(comStr)
        if (comStr.includes("k")) {
          comNum = comNum * 1000
        }
        let trueNum;
        let fakeNum;
        if(percentages[2] === 'percentage'){
          trueNum = percentages[0] + '%'
          fakeNum = percentages[1] + '%'
        }else{
          trueNum = Math.round(percentages[0] * comNum / 100)
          fakeNum = Math.round(percentages[1] * comNum / 100)
          if(comNum < (trueNum + fakeNum)){
            fakeNum = comNum - trueNum
          }
        }
        let buttonWrapper = feedunit.getElementsByClassName("rq0escxv l9j0dhe7 du4w35lb j83agx80 pfnyh3mw i1fnvgqd gs1a9yip owycx6da btwxx1t3 ph5uu5jm b3onmgus e5nlhep0 ecm0bbzt nkwizq5d roh60bw9 mysgfdmx hddg9phg")
        let comSum = document.createElement('div')
        comSum.setAttribute("class", "d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 d3f4x2em iv3no6db jq4qci2q a3bd9o3v b1v8xokw m9osqain")
        comSum.setAttribute("style", 'margin-top: 15px')
        let spanStyle = 'margin-right: 20px; padding-left: 13px;padding-right:13px; border: 1px solid #DFDFDF; border-radius: 32px;'
        let trueSpan = document.createElement('span')
        trueSpan.setAttribute("style", spanStyle)
        trueSpan.innerHTML = "True: " + trueNum
        comSum.appendChild(trueSpan)
        let fakeSpan = document.createElement('span')
        fakeSpan.setAttribute("style", spanStyle)
        fakeSpan.innerHTML = "Fake: " + fakeNum
        comSum.appendChild(fakeSpan)
        if(clearFlag){
          let oldComSum = buttonWrapper[0].parentNode.getElementsByClassName("d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 d3f4x2em iv3no6db jq4qci2q a3bd9o3v b1v8xokw m9osqain")
          if(oldComSum.length !== 0){
            console.log(oldComSum[0])
            buttonWrapper[0].parentNode.removeChild(oldComSum[0])
          }
        }
        buttonWrapper[0].parentNode.insertBefore(comSum, buttonWrapper[0])
        feedunit.setAttribute("summarized", "true")
      }
    }
}

var likeButtonList, shareButtonList, commentButtonList;
var clickLikeTimes = 0;
var clickCommentTimes = 0;
var clickShareTimes = 0;
const body = [];
const storeFBs = {};


function uploadClickDetail(e) {
  var date = new Date();
  var UTCdate = date.toUTCString();

  let address = e.currentTarget.getAttribute("web");
  let type = e.currentTarget.getAttribute("type");

  let poster = storeFBs[address].poster;
  let textContent = storeFBs[address].content;
  let images = storeFBs[address].image_info;
  let outsideLink = storeFBs[address].outside_link;
  body.push({
    "time": UTCdate, "action_type": type, "id": address,
    "poster": poster, "text content": textContent, "image information": images,
    "outside link": outsideLink, "post time": "00:00"
  });


  if (type === "Comment") clickCommentTimes += 1;
  else if (type === "Share") clickShareTimes += 1;
  else if (type === "Like") clickLikeTimes += 1;
  else if (type === "Unlike") clickLikeTimes += 1;
  console.log(body);

}


function Separate() {
  const Posts = [...document.body.querySelectorAll('div[role="article"]')];
  Posts.forEach(Post => {
    if (Post) {
      const uniqueId = Post.querySelectorAll('a[role="link"]')[3];

      if (uniqueId) {
        var event = new FocusEvent('focusin', {
          'view': window,
          'bubbles': true,
          'cancelable': true
        });
        uniqueId.dispatchEvent(event);
        const Uid = uniqueId.getAttribute("href");

        nametemp = Post.querySelector(".oajrlxb2.g5ia77u1.qu0x051f.esr5mh6w.e9989ue4.r7d6kgcz.rq0escxv.nhd2j8a9.nc684nl6.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.jb3vyjys.rz4wbd8a.qt6c0cv9.a8nywdso.i1ao9s8h.esuyzwwr.f1sip0of.lzcic4wl.gpro0wi8.oo9gr5id.lrazzd5p");
        poster = nametemp.innerHTML.replace(/\<.*?\>/g, "");;

        let content = "";
        let link = "";
        let hasImage = [];

        temp = Post.querySelector(".f530mmz5.b1v8xokw.o0t2es00.oo9gr5id");
        if (temp) { //without image
          content = temp.innerHTML.replace(/\<.*?\>/g, "");
          hasImage.push("no image");
          link = "No outside link";
        } else {  //with image
          texttemp = Post.querySelector("span.d2edcug0.hpfvmrgz.qv66sw1b.c1et5uql.lr9zc1uh.a8c37x1j.fe6kdd0r.mau55g9w.c8b282yb.keod5gw0.nxhoafnm.aigsh9s9.d3f4x2em.iv3no6db.jq4qci2q.a3bd9o3v.b1v8xokw.oo9gr5id.hzawbc8m");
          if (texttemp) {
            content = texttemp.innerHTML.replace(/\<.*?\>/g, "");
          } else {
            content = "no text content";
          }

          imgtemp = Post.querySelector("img[alt]");
          if (imgtemp) {
            Images = Post.querySelectorAll('img[alt]');
            Images.forEach(EachImage => {
              address = EachImage.getAttribute("src");
              //if(!address.match("static")){
              hasImage.push(address);
              //}
            });
          }
          if (hasImage.length === 0) {
            hasImage.push("No Image");
          }

          linktemp = Post.querySelector("a.oajrlxb2.g5ia77u1.qu0x051f.esr5mh6w.e9989ue4.r7d6kgcz.rq0escxv.nhd2j8a9.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.jb3vyjys.rz4wbd8a.qt6c0cv9.a8nywdso.i1ao9s8h.esuyzwwr.f1sip0of.lzcic4wl.gmql0nx0.a8c37x1j.p8dawk7l");
          if (linktemp) {
            link = linktemp.getAttribute("href");
          } else {
            linktemp = Post.querySelector("a.oajrlxb2.g5ia77u1.qu0x051f.esr5mh6w.e9989ue4.r7d6kgcz.rq0escxv.nhd2j8a9.nc684nl6.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.jb3vyjys.rz4wbd8a.qt6c0cv9.a8nywdso.i1ao9s8h.esuyzwwr.f1sip0of.lzcic4wl.gmql0nx0.gpro0wi8.datstx6m.pmk7jnqg.j9ispegn.kr520xx4.k4urcfbm.tkr6xdv7");
            if (linktemp) {
              link = linktemp.getAttribute("href");
            } else {
              link = "no outside link";
            }
          }
        }

        storeFBs[Uid] = { "poster": poster, "content": content, "image_info": hasImage, "outside_link": link };


        const LikeButton = Post.querySelector('div[aria-label="Like"]');
        if (LikeButton) {
          LikeButton.setAttribute('web', Uid);
          LikeButton.setAttribute('type', "Like");
          LikeButton.addEventListener("click", uploadClickDetail);
        }

        const UnLikeButton = Post.querySelector('div[aria-label="Remove Like"]');
        if (UnLikeButton) {
          UnLikeButton.setAttribute('web', Uid);
          UnLikeButton.setAttribute('type', "Unlike");
          UnLikeButton.addEventListener("click", uploadClickDetail);
        }

        const CommentButton = Post.querySelector('div[aria-label="Leave a comment"]');
        if (CommentButton) {
          CommentButton.setAttribute('web', Uid);
          CommentButton.setAttribute('type', "Comment");
          CommentButton.addEventListener("click", uploadClickDetail)
        }

        const ShareButton = Post.querySelector('div[aria-label="Send this to friends or post it on your Timeline."]');
        if (ShareButton) {
          ShareButton.setAttribute('web', Uid);
          ShareButton.setAttribute('type', "Share");
          ShareButton.addEventListener("click", uploadClickDetail);
        }
      }

    }
  })

  chrome.storage.local.set({
    curPlatform: 'facebook',
    fblike: clickLikeTimes,
    fbreply: clickCommentTimes,
    fbshare: clickShareTimes,
    body: body
  }, () => {
    console.log("click data stored");
  });

}
//getLikeButtons();
//setTimeout(getLikeButtons, 1100);
//setInterval(getLikeButtons, 1000);

//getLikeButtons();
//setTimeout(getLikeButtons, 1100);
setInterval(Separate, 1000);
