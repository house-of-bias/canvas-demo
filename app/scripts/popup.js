'use strict';
console.log('popup');
window.onload = function() {

  canvasbias.author.init();
  canvasbias.audience.init();

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

  chrome.extension.sendMessage({
           type: "popup-loaded"
         });
    
}; 

chrome.runtime.onMessage.addListener(
  function( request, sender, sendResponse ) {
      console.log('message recieved');
      console.log(request);
       if (request.type == "score-content"){
      console.log('recieved score!!!');
      console.log(request.score);
      var adjusted_score = (40+(450*request.score));
      if (adjusted_score > 125){
        adjusted_score = 125;
      } else if (adjusted_score < 20){
        adjusted_score = 20;
      }
      console.log(adjusted_score);
      document.getElementsByClassName("this-sentiment")[0].innerHTML = "<p class='this-sentiment' style='position: absolute; bottom: " + adjusted_score + "px; font-size:36px'>→</p>";
    }
  });


/*console.log(document.getElementsByClassName("this-sentiment")[0]);
console.log(score);
document.getElementsByClassName("this-sentiment")[0].innerHTML = "<p class='this-sentiment' style='position: absolute; bottom: " + (40+(1000*request.score))+ "px; font-size:36px'>→</p>";
*/
