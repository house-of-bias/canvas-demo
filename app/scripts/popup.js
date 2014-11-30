'use strict';

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
    chrome.extension.sendMessage({
      type: "hilite"
    });
  }
};