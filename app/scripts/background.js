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

  } );