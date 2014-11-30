'use strict';

console.log('\'Allo \'Allo! Content script');

window.onload = function() {

	// Al-jazeera
	if ( window.location.href.indexOf( "aljazeera.com" ) > -1 ) {
		var authorName = $( '.author-name', '#dvAuthorInfo' ).find( 'a' ).html();
		console.log('Al Jazeera detected.', authorName);
		chrome.runtime.sendMessage( {authorName: authorName.trim()} );
	}

};


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	switch (request.type){
  		case "hilite-content":
  			console.log("content hilite request recieved");
			// Update wordlist with space separated string containing trigger words 
			console.log(wordlist);
			myHilitor.apply(wordlist); 
			break;
		case "unhilite-content":
			console.log("content unhilite request recieved");
			myHilitor.remove();
		default:
			break;
  	}

    if (request.type == "hilite-content"){
      
  }

 });