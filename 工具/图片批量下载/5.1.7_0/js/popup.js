var chromeSender=chrome.extension.sendMessage;"function"!=typeof chromeSender&&(chromeSender=chrome.extension.sendRequest),$("#btnGetCurrentTab").click(function(){chromeSender({cmd:"GET_CURRENT_TAB_IMAGE"})}),$("#btnGetAllTab").click(function(){chromeSender({cmd:"GET_ALL_TAB_IMAGE"})}),$("#btnOpenPage").click(function(){var e=$("#textPage").val().split("\n");localStorage.pageUrls=$("#textPage").val(),chromeSender({cmd:"OPEN_PAGE",pageUrls:e})}),$(function(){$("#textPage").val(localStorage.pageUrls)});var isZh=navigator.language.match("^zh"),currentI18n=i18n.en;isZh&&(document.querySelector(".feedback h5").innerText="问题反馈",currentI18n=i18n.zh),document.getElementById("email").addEventListener("click",function(e){window.open("mailto:aituxiu@gmail.com?subject=Fatkun "+(isZh?"问题反馈":"Feedback")),e.preventDefault()}),document.getElementById("qq").addEventListener("click",function(e){window.open("tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=2141740095"),e.preventDefault()}),isZh?$(".zh").show():$(".en").show(),localStorage.bg_more&&$("#bg_more input").attr("checked",!0),chrome.storage.local.get("options_config",function(e){var t=e.options_config;t&&0===t.dragDownload||$("#drag_download input").attr("checked","checked")}),$("#bg_more input").click(function(){$(this).prop("checked")?(localStorage.setItem("bg_more",1),chrome.runtime.sendMessage({cmd:"ENABLE_BG_MORE"})):(localStorage.removeItem("bg_more"),chrome.runtime.sendMessage({cmd:"DISABLE_BG_MORE"}))}),$("#drag_download input").click(function(){var e=$(this).attr("checked")?1:0;chrome.storage.local.set({options_config:{dragDownload:e}},function(){chrome.tabs.query({},function(t){t.forEach(function(t){chrome.tabs.sendMessage(t.id,{topic:"set-drag-download",data:e})})})})}),function(){for(var e=[],t="A";t<="Z";)e.push('<option value="'+t+'">'+t+"</option>"),t=String.fromCharCode(t.charCodeAt(0)+1);var o=localStorage.hotKey||"Z";$(".hotkey").append(e.join("")).val(o).change(function(){localStorage.hotKey=$(this).val()})}(),chrome.tabs.query({active:!0},function(e){for(var t,o=aidownload.sites,n=0;n<o.length;n++)if(e[0].url.match(o[n].reg)){t=o[n];break}if(t){$("#aidownload").show(),$(".current-domain").text(t.title);var a=!1;1==localStorage["disabledAidownload_"+t.id]&&(a=!0),$(".aidownload-status").text(a?currentI18n.popup.aidownload_status_disabled:currentI18n.popup.aidownload_status_enabeld),$("#aidownload input").prop("checked",!a).click(function(){localStorage["disabledAidownload_"+t.id]=this.checked?0:1,$(".aidownload-status").text(this.checked?currentI18n.popup.aidownload_status_enabeld:currentI18n.popup.aidownload_status_disabled)}),$(".aidownload-text").text(currentI18n.popup.aidownload_text)}var c=e[0].url;chrome.storage.local.get("aiscripts",function(e){var t=e.aiscripts;if(t)for(var o=0;o<t.length;o++)if(c.match(t[o].reg)){$("#aiscript").show(),t[o];break}}),new Vue({el:"#app",data:{aiscripts:[],i18n:currentI18n.popup,version:chrome.runtime.getManifest().version,showSwitchMsg:!1,switchedFromNew:!1},mounted:function(){var e=this;chrome.runtime.sendMessage({cmd:"GET_AISCRIPTS"},function(t){t.forEach(function(t){c.match(t.reg)&&(t.text=t.text||"",e.aiscripts.push(t))})}),chrome.storage.local.get("switchedFromNew",function(t){e.switchedFromNew=!!t.switchedFromNew})},methods:{installScript:function(e){$.ajax({url:e.url+"?_="+Date.now(),success:function(t){e.text=t,chrome.runtime.sendMessage({cmd:"INSTALL_SCRIPT",script:e},function(){chrome.tabs.query({active:!0},function(e){chrome.tabs.reload(e[0].id)})})}})},updateScript:function(e){$.ajax({url:e.url+"?_="+Date.now(),success:function(t){e.latest.text=t,chrome.runtime.sendMessage({cmd:"UPDATE_SCRIPT",script:e},function(){$.extend(e,e.latest),e.updated=!0,delete e.latest,chrome.tabs.query({active:!0},function(e){chrome.tabs.reload(e[0].id)})})}})},removeScript:function(e){chrome.runtime.sendMessage({cmd:"REMOVE_SCRIPT",script:e},function(){e.text="",chrome.tabs.query({active:!0},function(e){chrome.tabs.reload(e[0].id)})})},switchToNew:function(){var e=this;chrome.storage.local.set({use_old_view:!1},function(){e.showSwitchMsg=!0})}}})});