function ScriptItem(t){for(var n in this.latest=null,this.latestVersion="",this.updated=!1,t)this[n]=t[n]}var aiscripts=function(){var t=gConfig.staticServer+"/aiscripts2/scripts.json",n=[];return{init:function(t){chrome.storage.local.get("aiscripts2",function(e){temp=e.aiscripts2||[];for(var i=0;i<temp.length;i++)n.push(new ScriptItem(temp[i]));t(n)})},getAll:function(){return n},getById:function(t){return _.find(n,{id:t})},getByUrl:function(t){for(var e=0;e<n.length;e++)if(t.match(n[e].reg))return n[e];return null},checkUpdate:function(e,i){fetch(t+"?_="+Date.now()).then(function(t){return t.json()}).then(function(t){var s=_.find(n,{id:e}),r=_.find(t,{id:e});i({needUpdate:utils.compareVersion(s.version,r.version)<0,newItem:r})})},update:function(t,e){var i=this;fetch(t.url+"?_="+Date.now()).then(function(t){return t.text()}).then(function(s){var r=i.getById(t.id);for(var c in t)r[c]=t[c];r.text=s,r.latest=null,r.latestVersion="",chrome.storage.local.set({aiscripts2:n},function(){e&&e({success:!0})})})},install:function(t,e){var i=_.find(n,{id:t});fetch(i.url+"?_="+Date.now()).then(function(t){return t.text()}).then(function(t){i.text=t,chrome.storage.local.set({aiscripts2:n},function(){e(i)})})},remove:function(t,e){var i=_.find(n,{id:t});delete i.text,chrome.storage.local.set({aiscripts2:n},function(){e(i)})},enable:function(t,e){var i=_.find(n,{id:t});i.text?(i.status="enabled",chrome.storage.local.set({aiscripts2:n},function(){e&&e({success:!0})})):this.install(t,function(){i.status="enabled",chrome.storage.local.set({aiscripts2:n},function(){e&&e({success:!0})})})},disable:function(t,e){var i=_.find(n,{id:t});i.status="disabled",chrome.storage.local.set({aiscripts2:n},function(){e&&e(i)})}}}();