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


