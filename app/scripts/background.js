'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

// TODO: Set badge when info availble
chrome.browserAction.setBadgeText({text: '1'});

console.log('\'Allo \'Allo! Event Page for Browser Action');

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "hilite":
            console.log("you clicked highlight");
            //hiliteTheWords()
        break;
    }
    return true;
});
