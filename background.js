chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log("OnUpdated")
});

chrome.tabs.onCreated.addListener(function(tab) {        
    console.log("HELLo") 
    chrome.notifications.create(2, {
        type: 'basic',
        title: 'notification title',
        message: 'notification message',
        priority: 2
    })
});