window.canvasbias = _.isObject(window.canvasbias) || {};
window.canvasbias.author = {

  init: function() {

    console.log('Initializing author.');
    var self = this;

    var authorTemplate = $('#template-author').html();
    var publisherTemplate = $('#template-publisher').html();

    chrome.runtime.sendMessage( { requestAuthor: true }, function(response) {

      d3.json("data/news-agencies.json", function(error, data) {
        // Agency info.
        // TODO: make dynamic
        var publisherName = "Al Jazeera";
        var pub = _.filter(data, function(pub) {
          return pub.Name == publisherName;
        }).pop();
        $('#publisher-container').html(_.template(publisherTemplate)(pub));
      });

      d3.json("data/chrisbuckley.json", function(error, data) {
        // Sparkline.
        // Max: d3.max(_.pluck(data, 'retweets'))
        $('#author-container').html(_.template(authorTemplate)(data));

        var retweets = data.twitter.retweets;
        self.createSparkline('.spark-tweets', retweets);
        d3.select('.retweets', retweets ).html( retweets[0].retweets ) ;

      });
    }  );

  },

  createSparkline: function(elemId, data) {

    var self = this;
    var width = 100;
    var height = 25;
    var x = d3.scale.linear().range([0, width - 2]);
    var y = d3.scale.linear().range([height - 4, 0]);
    var parseDate = d3.time.format("%b %d, %Y").parse;
    var line = d3.svg.line()
      .interpolate("basis")
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.retweets); });

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

};
