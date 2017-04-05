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

// $(document).click(function(){
// 	$("#location").toggle("slide");
// });

$(document).ready(function(){
	$("#location").hide();
	$("#cuisines").hide();
	$("#pricePoint").hide();
	$("#results").hide();
	$(".food-photos").hide();

	// $("#slideshow").hide();
});

$("#start").on("click", function(event){
	event.preventDefault();
	$("#startScreen").toggle("slide");
	$("#location").toggle("slide");
	$("#location").show();
	$("#slideshow").hide();

});

$(document).ready(function() {
	$('#slideshow').cycle({
	fx: 'fade',
	pager: '#smallnav',
	pause:   5,
	speed: 2000,
	timeout:  3500
	});

	console.log("slideshow");
});



$("#distance-submit").on("click", function(event){
	event.preventDefault();
	userZIP = $("#zip-input").val().trim();
	mileRadius = $("#distance-select").val();
	$("#location").toggle("slide");
	$("#cuisines").toggle("slide");
	$("#cuisines").show();


	// $("#location").toggle("slide");


	console.log(userZIP);
	console.log(mileRadius);

 



var queryWeather = "http://api.wunderground.com/api/88fa17d19b77bfc5/conditions/q/" + userZIP + ".json";

// $.ajax({
// 	url: queryWeather,
// 	method: "GET",
	

// }).done(function(weather) {
// 	console.log(queryWeather);
// 	console.log(weather);
// 	});


});

$("#cuisines-submit").on("click", function(event){
	event.preventDefault();
	$("#cuisines").toggle("slide");
	$("#pricePoint").toggle("slide");
	$("#pricePoint").show();
});

$("#pricePoint-submit").on("click", function(event){
	event.preventDefault();
	$("#pricePoint").toggle("slide");
	$("#results").toggle("slide");
	$("#results").show();
});


$("#flip1").on("click", function(){
	$(this).toggleClass("flip-container");
});

$("#flip2").on("click", function(){
	$(this).toggleClass("flip-container");
});

$("#flip3").on("click", function(){
	$(this).toggleClass("flip-container");
});



// });