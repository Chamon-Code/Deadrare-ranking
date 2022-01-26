var matches = ["https://deadrare.io/collection/"]


chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active) {
        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            let url = tabs[0].url;
            matches.forEach(el => {
                if (url.includes(el)){
                    chrome.scripting.executeScript({
                        target: {tabId: tab.id},
                        files : ["./js/script.js"]
                    })
                    return;
                }
            });

        });
    }
  })
