'use strict';
console.log('content');
window.onload = function() {

  canvasbias.author.init();

  var $tabs = $( 'ul.tabs' ).find( 'li' );
  var $panels = $( '.tab-panels' );
  $tabs.click( function() {
    $tabs.removeClass( 'active' );
    var $t = $( this ).addClass( 'active' );
    $panels.find( '.panel' ).removeClass( 'active' );
    console.log($t.data('panel'));
    $panels.find( '.' + $t.data( 'panel' ) ).addClass( 'active' );
  } );

document.getElementById("button").onclick = function() {
  console.log(document.getElementById("button").innerText);
  if (document.getElementById("button").innerText == "Highlight Weasel Words"){
    chrome.extension.sendMessage({
           type: "hilite"
         });
          document.getElementById("button").innerText = "Remove Highlights";
    }
   else if (document.getElementById("button").innerText == "Remove Highlights"){
    chrome.extension.sendMessage({
           type: "unhilite"
         });
          document.getElementById("button").innerText = "Highlight Weasel Words";
    }
  }
}; 