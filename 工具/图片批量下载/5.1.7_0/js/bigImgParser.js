var bigImgParser=function(){var commonRules,userRules;return chrome.storage.onChanged.addListener(function(e){var r=e.commonRules,u=e.userRules;r&&(commonRules=r.newValue),u&&(userRules=u.newValue)}),{commonRuleUrl:gConfig.staticServer+"/aiscripts/rules.json?_="+Date.now(),getRules:function(){return commonRules.concat(userRules)},getEnabledRules:function(){var e=[];return this.getRules().forEach(function(r){r.enabled&&e.push(r)}),e},getCommonRules:function(){return commonRules},getUserRules:function(){return userRules},saveUserRule:function(e){var r=JSON.stringify(e,null,null);localStorage.userRules=r,u2()},init:function(e){var r=this;chrome.storage.local.get(["commonRules","userRules"],function(u){commonRules=u.commonRules||[],userRules=u.userRules||[],location.href.match(/^chrome-extension:|^moz-extension:/)?fetch(r.commonRuleUrl).then(function(e){return e.json()}).then(function(u){u.forEach(function(e){var r=_.find(commonRules,{site:e.site});e.enabled=r?void 0===r.enabled?!!e.defaultEnabled:r.enabled:!!e.defaultEnabled}),commonRules=u;var n=JSON.parse(localStorage.userRules||"[]"),s=userRules.map(function(e){return e.site});n.forEach(function(e){-1==s.index(e.site)&&userRules.push(e)}),chrome.storage.local.set({commonRules:commonRules,userRules:userRules}),e(r.getRules())}):e(r.getRules())})},parse:function(src){for(var rules=this.getEnabledRules(),i=0;i<rules.length;i++){var rule=rules[i],srcPattern=new RegExp(rule.srcPattern),replaceRule=rule.replaceRule;if(srcPattern&&srcPattern.test(src)){var ret=src;try{return ret=eval(replaceRule.replace(/@/g,src)),ret}catch(e){}}}return src}}}();