'use strict';

var width = 100;
var height = 25;
var x = d3.scale.linear().range([0, width - 2]);
var y = d3.scale.linear().range([height - 4, 0]);
var parseDate = d3.time.format("%b %d, %Y").parse;
var line = d3.svg.line()
  .interpolate("basis")
  .x(function(d) { return x(d.date); })
  .y(function(d) { return y(d.retweets); });

function sparkline(elemId, data) {
  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.retweets = + d.retweets;
  });
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.retweets; }));

  var svg = d3.select(elemId)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(0, 2)');
  svg.append('path')
    .datum(data)
    .attr('class', 'sparkline')
    .attr('d', line);
  svg.append('circle')
    .attr('class', 'sparkcircle')
    .attr('cx', x(data[0].date))
    .attr('cy', y(data[0].retweets))
    .attr('r', 1.5);
}

d3.json("data/retweets.json", function(error, data) {
  sparkline('.spark-tweets', data);
  // Max: d3.max(_.pluck(data, 'retweets'))
  d3.select('.retweets', data ).html( data[data.length - 1].retweets) ;

});


window.onload = function() {
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