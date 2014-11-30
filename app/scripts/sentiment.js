console.log('analyzing');

// Pull text to be analyzed
// This pulls all p tags - seems align well with articles and editorials from New York Times, Al Jazeera English, CNN (test more)

var pElements = document.getElementsByTagName('p');
var pText = "";

// pElements will typically contain extra footer - think about how to deal with this
for (var i = 0; i < pElements.length; i++){
	pText += (pElements[i].innerText);
}

console.log(pText)


// Analyze text

var score = null;
var scoreType = null;

$.ajax({
	type: 'POST',
	url: "https://twinword-sentiment-analysis.p.mashape.com/analyze/",
	data: "text="+pText,
	headers: {
		"X-Mashape-Key": "SFtbVbITO1msha4G6f3IqAJlY8sEp1pnElMjsnmfmB6w3alR0r",
		"Content-Type": "application/x-www-form-urlencoded"
	}
}).done(function(data) {
	console.log(data);
	// figure out right way to wait for return
	// sleep(2000);
	data = JSON.parse(data);
	score = data.score;
	scoreType = data.type;

	console.log(scoreType);
	console.log(score);

}).done(function (){
	// put usage here?
});
// Cannot use score immediately - need to wait for API return
//console.log(score);
//console.log(scoreType);

// Display sentiment - in here or out?


// Sleep is a hacky way to deal with waiting for return - do this better

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}