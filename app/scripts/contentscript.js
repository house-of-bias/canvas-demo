'use strict';

console.log('\'Allo \'Allo! Content script');

chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
	switch(message.type) {
		case "hilite":
			console.log("wow youre really hiliting");
		break;
	}
});

