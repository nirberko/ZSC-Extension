chrome.tabs.onUpdated.addListener(function(tabId , info) {
    if (info.status == "complete") {
        chrome.tabs.executeScript(null, {file: "notification.js"});
    }
});