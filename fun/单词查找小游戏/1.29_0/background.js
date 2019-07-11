chrome.browserAction.onClicked.addListener(function(activeTab) {
    var newURL = "https://www.thewordsearchapp.com/";
    chrome.tabs.create({ url: newURL });
});
