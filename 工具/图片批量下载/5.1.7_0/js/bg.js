function insertCt(e,t,n){["lib/jQuery.js","js/utils.js","js/parsers.js","js/tj.js","js/config.js","js/appConfig.js","js/item.js","js/dragdownload.js","js/bigImgParser.js"].forEach(function(n){chrome.tabs.executeScript(e.id,{file:n,frameId:t||0})}),chrome.tabs.executeScript(e.id,{file:"js/ct.js",frameId:t||0},function(){n&&n(e)}),chrome.tabs.insertCSS(e.id,{file:"css/ct.css",frameId:t||0})}function initAdvanceMode(){var e=[],t=[];function n(n){n.url;var o=n.tabId;-1!=o&&-1!=t.indexOf(o)&&e.push({src:n.url,tabId:o})}function o(t){chrome.tabs.query({},function(n){var o=n.map(function(e){return e.id}),a=[];e.forEach(function(e){o.indexOf(e.tabId)>=0&&-1==a.indexOf(e)&&a.push(e)}),t(a)})}function a(n,o,a){if(o&&o.url){t.push(a.id);var s=[];e.forEach(function(e){e.tabId!=n&&s.push(e)}),e=s}}return{status:"disabled",enable:function(){"disabled"==this.status&&(chrome.webRequest.onBeforeRequest.addListener(n,{urls:["<all_urls>"],types:["image"]}),chrome.tabs.onUpdated.addListener(a),this.status="enabled")},disable:function(){"enabled"==this.status&&(chrome.webRequest.onBeforeRequest.removeListener(n),chrome.tabs.onUpdated.removeListener(a),this.status="disabled")},getOneTabImages:function(e,t,n){var a=[];o(function(e){e.forEach(function(e,n){e.tabId==t&&a.push(e)}),n(a)})},getAllTabImages:function(e){o(function(e){var t=[];e.forEach(function(e,n){t.push(e)}),cb(t)})}}}chrome.runtime.onMessage.addListener(function(e,t,n){switch(e.cmd){case"INSERT_CT":insertCt(t.tab,t.frameId,n)}return!0});var _config,advancedMode=initAdvanceMode();appConfig.init(function(e){function t(e){var t=e.map(function(e){return e.id});chrome.tabs.query({url:chrome.extension.getURL("output/output.html")},function(e){0==e.length?(localStorage.imageTabIds=JSON.stringify(t),chrome.tabs.create({url:chrome.extension.getURL("output/output.html")})):(localStorage.imageTabIds=JSON.stringify(JSON.parse(localStorage.imageTabIds||"[]").concat(t)),chrome.tabs.update(e[0].id,{active:!0}))})}function n(e){e.forEach(function(e){var t="output/output.html",n=[];n.push("tabId="+e.id),n.length>0&&(t+="?"+n.join("&")),chrome.tabs.create({url:t})})}function o(o){e.singleOutput?t([o]):n([o])}var a;function s(e){e?a=chrome.contextMenus.create({title:"批量下载",type:"normal",contexts:["all"],onclick:function(e,t){o(t),tj.send("dl",{tab:"one",from:"contextmenu"})}}):chrome.contextMenus.remove(a)}_config=e,e.advancedMode&&advancedMode.enable(),downloader.init(e,function(e){}),chrome.runtime.onMessage.addListener(function(a,i,c){switch(a.cmd){case"GET_CURRENT_TAB_IMAGE":"popup"==a.from&&tj.send("dl",{tab:"one",from:"popup"}),chrome.tabs.query({active:!0,windowId:chrome.windows.WINDOW_ID_CURRENT},function(e){o(e[0])});break;case"GET_ALL_TAB_IMAGE":"popup"==a.from&&tj.send("dl",{tab:"all",from:"popup"}),chrome.tabs.query({windowId:chrome.windows.WINDOW_ID_CURRENT},function(o){e.singleOutput?t(o):n(o)});break;case"GET_ADVANCEC_IMGS":a.tabId?advancedMode.getOneTabImages(i.tab.id,a.tabId,c):advancedMode.getAllTabImages(i.tab.id,c);break;case"DOWNLOAD_BY_DRAG":downloader.downloadSingle(a.item);break;case"SWITCH_CONTEXTMENU":s(a.enabled)}return!0}),e.enableContextmenu&&s(!0),tj.send("config",e)},function(e){e.advancedMode?advancedMode.enable():advancedMode.disable()}),bigImgParser.init(function(e){}),chrome.browserAction.setPopup({popup:"popup/popup.html"}),$.ajax({url:chrome.extension.getURL("dropPanel.html"),success:function(e){chrome.storage.local.set({dropPanelHtml:e})}}),chrome.runtime.onMessage.addListener(function(e,t,n){if("GET_STORAGE"==e.cmd)chrome.storage.local.get(e.key,function(t){n(utils.parseJSON(t[e.key]))});else if("SET_STORAGE"==e.cmd){var o={};o[e.key]=e.value,chrome.storage.local.set(o)}else"NET"==e.cmd?$.ajax($.extend({},e.settings,{success:function(e){n({status:"ok",data:e})},error:function(){n({status:"error"})}})):"SILENT_DOWNLOAD"==e.cmd&&e.imgs.forEach(function(e){var t={url:e.url,saveAs:!1,conflictAction:"uniquify"};e.filename&&(t.filename=e.filename),chrome.downloads.download(t)});return!0}),chrome.tabs.query({},function(e){e.forEach(function(e){chrome.tabs.sendMessage(e.id,{cmd:"CHECK_INIT_CT"},function(t){!chrome.runtime.lastError&&t||chrome.tabs.executeScript(e.id,{file:"js/initCt.js"},function(){})})})}),setTimeout(function(){tj.send("active")},5e3),chrome.storage.local.get("aiscripts2",function(e){var t=[];e.aiscripts2&&(t=t.concat(e.aiscripts2)),$.ajax({url:gConfig.staticServer+"/aiscripts2/scripts.json?_="+Date.now(),dataType:"json",success:function(e){e.forEach(function(e,n){var o=t[n];o?o.text?utils.compareVersion(e.version,o.version)>0&&(o.latestVersion=e.version,o.latest=e):t[n]=e:t.push(e)}),chrome.storage.local.set({aiscripts2:t})}})});