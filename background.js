function scrapeText() {
    function modifyDOM() {
        //You can play with your DOM here or check URL against your regex
        console.log('Tab script:');
        console.log(document.body);
        return document.body.innerText;
    }

    //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
    chrome.tabs.executeScript({
        code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
        //Here we have just the innerHTML and not DOM structure
        console.log('Popup script:')
        console.log(results[0]);
    });
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log("OnUpdated")
    scrapeText()
});

chrome.tabs.onCreated.addListener(function(tab) {        
    console.log("HELLO")
    /* var timestamp = new Date().getTime();
    var id = 'myid' + timestamp;
    chrome.notifications.create(id, {
        type: 'basic',
        iconUrl: './robot.jpeg',
        title: 'notification title',
        message: 'notification message',
        priority: 2
    },
    function () {}) */
    scrapeText()
});