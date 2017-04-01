// $(document).ready(function(){

// // var googleMapsKey = "&key=AIzaSyBfQu6oJU6bPRuUyHqpk8HStkK76-cHBN0";
// // var yelpToken = "";
// // var weatherKey = " 88fa17d19b77bfc5";
	
// // var origin = "origin=Disneyland&";
// // var destination ="destination=Universal+Studios+Hollywood4";
// // var queryURL = "https://maps.googleapis.com/maps/api/directions/json?&"  + origin + destination +  googleMapsKey;


$.ajax({
	 url: 'https://maps.googleapis.com/maps/api/js/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood4&key=AIzaSyBfQu6oJU6bPRuUyHqpk8HStkK76-cHBN0',
	// url: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBfQu6oJU6bPRuUyHqpk8HStkK76-cHBN0&callback=initMap",
	method: "GET",
	dataType:"jsonp",
	crossOrigin:true
}).done(function(response) {
	console.log(response);
	});


// });



