var app=new Vue({el:"#app",data:{commonRules:[],userRules:[]},mounted:function(){var e=this;bigImgParser.init(function(){e.commonRules=bigImgParser.getCommonRules(),e.userRules=bigImgParser.getUserRules()})},computed:{},methods:{addRule:function(){this.userRules.push({site:"",srcPattern:"",replaceRule:""})},saveRules:function(){var e=[];this.userRules.forEach(function(r){r.site&&r.srcPattern&&r.replaceRule&&e.push(r)}),this.userRules=e,chrome.storage.local.set({userRules:this.userRules})},saveCommonRules:function(){chrome.storage.local.set({commonRules:this.commonRules})},deleteRule:function(e){this.userRules.splice(this.userRules.indexOf(e),1),chrome.storage.local.set({userRules:this.userRules})},test:function(rule){if(rule.site&&rule.srcPattern&&rule.replaceRule){var thumb_url=prompt("缩略图的网址","");if(thumb_url){var srcPattern=new RegExp(rule.srcPattern),replaceRule=rule.replaceRule,bigUrl;if(srcPattern&&srcPattern.test(thumb_url))try{bigUrl=eval(replaceRule.replace(/@/g,thumb_url)),window.open(bigUrl)}catch(e){alert("请检查图片链接替换代码")}else alert("图片链接匹配不正确")}}else alert("请先填写完整")}}});setTimeout(function(){tj.send("page",{p:"big-parser-rule"})},2e3);