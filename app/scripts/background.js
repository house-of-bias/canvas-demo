'use strict';

console.log( 'background.js has been loaded.' );

chrome.runtime.onInstalled.addListener( function( details ) {
  console.log( 'previousVersion', details.previousVersion );
} );

// TODO: Set badge when info availble
var authorName;

chrome.runtime.onMessage.addListener(
  function( request, sender, sendResponse ) {

      console.log(request);
      if (request.authorName) {
          authorName = request.authorName;
          chrome.browserAction.setBadgeText( {text: '1'} );
      }

      if (request.requestAuthor) {
          sendResponse(authorName);
      }

      if (request.type == "hilite"){
        console.log("Hilite Request Recieved by background");
        // Send message to content listener
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {
              type: "hilite-content"
            }, function(response) {
              console.log(response);
            });
          });

      }
      if (request.type == "unhilite"){
        console.log("Hilite Request Recieved by background");
        // Send message to content listener
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {
              type: "unhilite-content"
            }, function(response) {
              console.log(response);
            });
          });

      }

  } );