var unirest = require("unirest");

var req = unirest("GET", "https://covid-19-data.p.rapidapi.com/totals");

req.query({
	"format": "undefined"
});

req.headers({
	"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
	"x-rapidapi-key": "SIGN-UP-FOR-KEY"
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});