window.canvasbias = window.canvasbias || {};
canvasbias.audience = {

  init: function() {

    console.log('Initializing audience.');
    var self = this;

    var tweetLocations = [];
    d3.json("data/sampletweets.json", function(error, tweets) {
      d3.json("data/world-110m.json", function(err, world) {
        self.drawMap(world, _.pluck(tweets.features, 'center'))
      });

    })

  },

  drawMap: function(world, tweets) {

    var width = 490,
      height = 450,
      self = this;

    var projection = d3.geo.orthographic()
      .scale(200)
      .translate([width / 2, height / 2])
      .clipAngle(90)
      .rotate([0,0,0])
      .precision(.1);

    var path = d3.geo.path()
      .projection(projection);

    var svg = d3.select("#map-container").append("svg")
      .attr("width", width)
      .attr("height", height);

    svg.append("defs").append("path")
      .datum({type: "Sphere"})
      .attr("id", "sphere")
      .attr("d", path);

    svg.append("use")
      .attr("class", "stroke")
      .attr("xlink:href", "#sphere");

    svg.append("use")
      .attr("class", "fill")
      .attr("xlink:href", "#sphere");

    var land = svg.insert("path", ".graticule")
      .datum(topojson.feature(world, world.objects.land))
      .attr("class", "land")
      .attr("d", path);

    var boundaries = svg.insert("path", ".graticule")
      .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
      .attr("class", "boundary")
      .attr("d", path);

    var dots = svg.selectAll('.tweet')
      .data(tweets)
        .enter().append('circle')
        .attr('class', 'tweet')
        .attr('cx', function(d) {
          return projection(d)[0];
        })
        .attr('cy', function(d) {
          return projection(d)[1];
        })
        .attr('r', 2);

    var lastTick;
    setInterval(function() {

      var rotation = projection.rotate();
      rotation[0] += 1;
      if (rotation[0] >= 180) rotation[0] -= 360;
      projection.rotate(rotation);

      land.attr("d", path);
      boundaries.attr("d", path);
      dots
        .attr('cx', function(d) {
          return projection(d)[0];
        })
        .attr('cy', function(d) {
          return projection(d)[1];
        });

    }, 100);

  }

};
