'use strict';

console.log( 'background.js has been loaded.' );

chrome.runtime.onInstalled.addListener( function( details ) {
  console.log( 'previousVersion', details.previousVersion );
} );

// TODO: Set badge when info availble
var authorName;
var score;

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

      if (request.type == "score"){
        console.log("Score Request Recieved by background");
        console.log(request.score);
        score = request.score;
        // send this score to popup
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {
              type: "score-content",
              score: score
            }, function(response) {
              console.log(response);
            });
          });
        chrome.extension.sendMessage({
           type: "score-content",
           score: score,
           
        });
        console.log('sent score from background');
      }

      if(request.type == "popup-loaded"){
        console.log("Background heard popup loaded")
        console.log(score);
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {
              type: "score-content",
              score: score
            }, function(response) {
              console.log(response);
            });
          });
        chrome.extension.sendMessage({
           type: "score-content",
           score: score,
           
        });
        console.log('sent score from background');
      }
      

  } );