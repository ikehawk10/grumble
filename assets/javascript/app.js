// $(document).ready(function(){

// // var googleMapsKey = "&key=AIzaSyBfQu6oJU6bPRuUyHqpk8HStkK76-cHBN0";
// // var weatherKey = " 88fa17d19b77bfc5";
	
// // var origin = "origin=Disneyland&";
// // var destination ="destination=Universal+Studios+Hollywood4";
// // var queryURL = "https://maps.googleapis.com/maps/api/directions/json?&"  + origin + destination +  googleMapsKey;
var userZIP;
var mileRadius;





// $.ajax({
// 	 url: 'https://maps.googleapis.com/maps/api/js/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood4&key=AIzaSyBfQu6oJU6bPRuUyHqpk8HStkK76-cHBN0',
// 	// url: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBfQu6oJU6bPRuUyHqpk8HStkK76-cHBN0&callback=initMap",
// 	method: "GET",
// 	dataType:"jsonp",
// 	crossOrigin:true
// }).done(function(response) {
// 	console.log(response);
// 	});


// });



$("#distance-submit").on("click", function(event){
	event.preventDefault();
	userZIP = $("#zip-input").val().trim();
	mileRadius = $("#distance-select").val();
	console.log(userZIP);
	console.log(mileRadius);



var queryWeather = "http://api.wunderground.com/api/88fa17d19b77bfc5/conditions/q/" + userZIP + ".json";

$.ajax({
	url: queryWeather,
	method: "GET",
	

}).done(function(weather) {
	console.log(queryWeather);
	console.log(weather);
	});


});








// });