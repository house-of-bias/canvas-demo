'use strict';

console.log('\'Allo \'Allo! Popup');

window.onload = function() {
	document.getElementById("button").onclick = function() {
		chrome.extension.sendMessage({
	        type: "hilite"
	    });
	}
}