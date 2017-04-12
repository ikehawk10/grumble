var userZiplatitude = "";
var userZiplongitude = "";
var userLatLong = "";
var pins = [];
var pin1 = "";
var pin2 = "";
var pin3 = "";

$(document).ready(function() {
    var zheader, version, url;
    var u = "https://developers.zomato.com/api/" //starter URL
        // var cuisines = cuisineOptions.toString(); //type of foods to search for
    var cuisineNotEliminated;
    //set empty array for desired restaurant results later
    var restaurantResults = [];
    var moreRestaurants = [];

    var userZIP;
    var mileRadius;

    var searchLat = "";
    var searchLong = "";
    var pin1 = $("#result1Back > h3").attr("data-lat", "data-long");   

    getCoords();
    $("#distance-submit").on("click", function(event) {
        event.preventDefault();
        userZIP = $("#zip-input").val().trim();
        mileRadius = $("#distance-select").val();
        $("#location").toggle("slide");
        $("#cuisines").toggle("slide");
        $("#cuisines").show();

        getCoords();

        //convert the miles to search into meters for our API request
        mileSearch = parseInt(mileRadius) * 1609.34;

    });


    //function to store user input zipcode as lat/long variables
    function getCoords() {

        var geocoder = new google.maps.Geocoder();
        var address = userZIP;
        geocoder.geocode({ 'address': address }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                userZiplatitude = results[0].geometry.location.lat();
                userZiplongitude = results[0].geometry.location.lng();
                searchLat = userZiplatitude.toString();
                searchLong = userZiplongitude.toString();
                // console.log("Latitude: " + userZiplatitude + "\nLongitude: " + userZiplongitude);
            } else {
                alert("Request failed.")
            }
            return searchLat;
            return searchLong;
        });

    };



    //user price assigned to an array
    var priceSelected = new Array();
    $('.price').click(function() {
        //user selects what price point they want to search for
        priceSelected.push($(this).val());

        $(this).toggleClass("pricePicked");
        $(this).toggleClass("priceUnpicked");
    })

    $(document).ready(function() {
        $("#zip-input").keypress(function(event) {
            return /\d/.test(String.fromCharCode(event.keyCode));
        });
    });
    //create a function that takes in an array
    function extractString(array) {
        //set the initial value to a empty string
        var finalString = "";
        //loop through the given array 
        array.forEach(function(prop) {
            //for each item in the array, add to finalString
            finalString += "," + prop;
        });
        //return finalString
        return finalString;
    }
    //list of food options to select from
    var cuisineOptions = ["Italian", "American", "BBQ", "Burger", "Asian", "Seafood", "Pizza", "Breakfast", "Sandwich", "Mexican"];
    //array of eliminated cuisine options
    var eliminated = new Array();
    //when food button is clicked
    $('.type').click(function() {
        //push the food type to a new array
        eliminated.push($(this).text());
        //create a new array with the food options that are left
        cuisineNotEliminated = $(cuisineOptions).not(eliminated).get();
        $(this).toggleClass("picked");
        $(this).toggleClass("unpicked");
    });

    //zomato api call
    var Zomato = {
        init: function(key) {
            if (key != null) {
                zheader = {
                    Accept: "text/plain; charset=utf-8",
                    "Content-Type": "text/plain; charset=utf-8",
                    "X-Zomato-API-Key": key
                }
            } else {
                console.error("Enter the key");
            };
            version = key.version || "v2.1";
            url = u + version
        },
        //main search parameters
        search: function(coords, cuisines, count, radius, scb, ecb) {
            if (coords.longitude && coords.latitude == null) {
                console.error("Enter the coordinates correctly");
            } else {
                $.ajax({
                    url: url + "/search",
                    headers: zheader,
                    data: {
                        lat: searchLat,
                        lon: searchLong,
                        count: count,
                        q: extractString(cuisineNotEliminated),
                        radius: mileSearch,
                        sort: "rating",
                        order: "desc"
                    },
                    success: function(response) {
                        console.log(response);
                        //loop through the JSON response of restaurants
                        for (var i = 0; i < response.restaurants.length; i++) {
                            //if the current restaurant has a featured image AND a price range that matches the user input...
                            if (response.restaurants[i].restaurant.featured_image && response.restaurants[i].restaurant.price_range <= priceSelected) {
                                //create a new object
                                var newData = {}
                                    //add current restaurant to the name key
                                newData.name = response.restaurants[i].restaurant.name;
                                //add current restaurant to the average cost for two key
                                newData.avgCost = response.restaurants[i].restaurant.average_cost_for_two;
                                //add current restaurant to the user rating key
                                newData.aggSeat = response.restaurants[i].restaurant.user_rating.aggregate_rating;
                                //add current restaurant to the image key
                                newData.image = response.restaurants[i].restaurant.featured_image;
                                //add current restaurant to the location key
                                newData.address = response.restaurants[i].restaurant.location.address;
                                //add current restaurnt to the info key
                                newData.info = response.restaurants[i].restaurant.cuisines;

                                newData.lat = response.restaurants[i].restaurant.location.latitude;

                                newData.long = response.restaurants[i].restaurant.location.longitude;

                                //push the new object to the restaurantResults array
                                restaurantResults.push(newData);
                            } else {
                                //create an array for non-featured restaurants
                                var otherRestaurants = {};
                                otherRestaurants.name = response.restaurants[i].restaurant.name;
                                otherRestaurants.avgCost = response.restaurants[i].restaurant.average_cost_for_two;
                                otherRestaurants.aggSeat = response.restaurants[i].restaurant.user_rating.aggregate_rating;
                                otherRestaurants.address = response.restaurants[i].restaurant.location.address;
                                otherRestaurants.info = response.restaurants[i].restaurant.cuisines;
                                moreRestaurants.push(otherRestaurants);


                            }

                        } //function that takes in a restaurant and where to place that restaurant
                        function placeOnPage(restaurant, pageElement) {
                            //append the restaurant's image to html node
                            pageElement.append("<img class='restaurant-image' src='" + restaurant.image + "'/>");
                            //append the restaurant's name to html node
                            pageElement.append("<h1 class='restaurant-title'>" + restaurant.name + "</h1>");
                            //append the restaurant's average cost for two to html node
                            pageElement.append("<h3 class='restaurant-price'>Price for Two: $" + restaurant.avgCost + "</h3>");
                            //append the restaurant's average rating to html node
                            pageElement.append("<p class='restaurant-rating'>Rating: " + restaurant.aggSeat + "</p>");
                            pageElement.append("<p class='restaurant-info'>Cuisine Type: " + restaurant.info + "</p>");
                        }
                        //function to display contact info on back of 'card'
                        function placeOnBack(restaurant, pageElement, i) {
                            pins[i] = $("<h3 class='restaurant-address' data-lat='" + restaurant.lat + "' data-long='" + restaurant.long + "'>" + restaurant.address + "</h3>");
                            pageElement.append(pins[i]);
                            
                        }
                        //loop through the new restaurants array
                        for (var n = 0; n < restaurantResults.length; n++) {
                            //make the number the index value plus 1
                            var newNum = n + 1;
                            //select the specific div we want to append to
                            var resultsDiv = $(`#result${newNum}`);
                            var resultsBack = $(`#result${newNum}Back`);
                            // var extraResults = $(`#`);
                            //run the function that takes in the specific restaurant and places it on the page
                            placeOnPage(restaurantResults[n], resultsDiv);
                            placeOnBack(restaurantResults[n], resultsBack, n);
                        }
                       initMap();
                    },
                    //error message function
                    error: function(res) {
                        ecb(res)
                    }
                })
            }
        }
    }

    // coordinates of location
    var coords = {
        latitude: userZiplatitude,
        longitude: userZiplongitude
    }

    var radius = 16093.44;
    //max results to return
    var count = 10;
    //API key
    Zomato.init("0ed57fbb51db1686778d3291c5a24632");
    //call search options with location, cuisine, and count limit
    $("#pricePoint-submit").on("click", function() {
        event.preventDefault();
        Zomato.search(cuisines, count, radius, scb);
        $("#pricePoint").toggle("slide");
        $("#results").toggle("slide");
        $("#results").show();

    })



    function scb(response) {}

    function ecb() {
        console.log("there was an error in zomato.js");
    }

});

//=====================================================
//
//start of app.js
//
//=====================================================


//When page loads hides all content areas except the start screen
$(document).ready(function() {
    $("#location").hide();
    $("#cuisines").hide();
    $("#pricePoint").hide();
    $("#results").hide();


    // $("#slideshow").hide();
});

//This is what causes the background slideshow on page load could be merged into above function. 
$(document).ready(function() {
    $('#slideshow').cycle({
        fx: 'fade',
        pager: '#smallnav',
        pause: 5,
        speed: 2000,
        timeout: 3500
    });
});


//When "Click to Start" button is clicked, this slides away the start button, slides in the location content

$("#start").on("click", function(event) {
    event.preventDefault();
    $("#startScreen").toggle("slide");
    $("#location").toggle("slide");
    $("#location").show();
    $("#slideshow").hide();

});

//when the user submits their location preferences this captures the zip code and radius as a variables to be used by the geocoder and map respectively. Runs geocoder function. Also hides location slide and brings forth the cuisines preferences content.



//When user submits their cuisines preferences this removes and displays the respecitve content

$("#cuisines-submit").on("click", function(event) {
    event.preventDefault();
    $("#cuisines").toggle("slide");
    $("#pricePoint").toggle("slide");
    $("#pricePoint").show();
});
$("#cuisines-back").on("click", function(event) {
    // $(".picked").empty();
    // $("#zip-input").empty();
    $("#cuisines").toggle("slide");
    $("#location").toggle("slide");
    $("#location").show();

})


//Changes display from questions to results
// $("#pricePoint-submit").on("click", function(event) {
//     event.preventDefault();
//     $("#pricePoint").toggle("slide");
//     $("#results").toggle("slide");
//     $("#results").show();
// });



function initMap() {
    // Create a div to hold the control.
   
    

    userLatLong = { lat: parseFloat(userZiplatitude), lng: parseFloat(userZiplongitude) }
    console.dir(userLatLong);
    var myLatlng = new google.maps.LatLng(userLatLong);

     pin1 = { lat: parseFloat(pins[0].attr("data-lat")), lng: parseFloat(pins[0].attr("data-long"))};
     var myPin1 = new google.maps.LatLng(pin1);
     pin2 = { lat: parseFloat(pins[1].attr("data-lat")), lng: parseFloat(pins[1].attr("data-long"))};
     var myPin2 = new google.maps.LatLng(pin2);
     
     pin3 = { lat: parseFloat(pins[2].attr("data-lat")), lng: parseFloat(pins[2].attr("data-long"))};
     var myPin3 = new google.maps.LatLng(pin3);


    var mapOptions1 = {
        zoom: 15,
        center: myPin1,
        disableDefaultUI: true
    };

      var mapOptions2 = {
        zoom: 15,
        center: myPin2,
        disableDefaultUI: true
    };

      var mapOptions3 = {
        zoom: 15,
        center: myPin3,
        disableDefaultUI: true
    };
    var map1 = new google.maps.Map(document.getElementById("map1"),mapOptions1);
    var map2 = new google.maps.Map(document.getElementById("map2"),mapOptions2);
    var map3 = new google.maps.Map(document.getElementById("map3"),mapOptions3);
    // pin1Lat = $('#result1Back').children('.restauraunt-address');

    //for(i < 0 pins.length)

    console.log(pins[0].attr("data-lat"));
    console.log(pins[0].attr("data-long"));

    console.log(pins[1].attr("data-lat"));
    console.log(pins[1].attr("data-long"));

    console.log(pins[2].attr("data-lat"));
    console.log(pins[2].attr("data-long"));


    
     
  


    //var pin1Lat= $('#result1Back < h3').attr('data-lat');
 
    //var pin1Long= $('#result1Back > h3').data('long');
   
   // var pin1drop={lat: parseFloat(pin1Lat), lng: parseFloat(pin1Long)}
    //console.log(pin1drop);

    var marker1 = new google.maps.Marker({
        position: myPin1,
        title: "Hello World!"
    });
   
    var marker2 = new google.maps.Marker({
        position: myPin2,
        title: "Hello World!"
    });
    
    var marker3 = new google.maps.Marker({
        position: myPin3,
        title: "Hello World!"
    });

    // To add the marker to the map, call setMap();
    marker1.setMap(map1);
    marker2.setMap(map2);
    marker3.setMap(map3);


};

//  $("#pricePoint").toggle("slide");
// $("#results").toggle("slide");
// $("#results").show();
// initMap();


$("#pricePoint-back").on("click", function(event) {
    // $(".picked").empty();
    // $("#zip-input").empty();
    $("#pricePoint").toggle("slide");
    $("#cuisines").toggle("slide");
    $("#cuisines").show();

})


//this controls the "flip" animation of the results boxes. 

$(".flipper").flip({
    trigger: "manual",
    background: "#f3ffe2"
})


$("#flip1").on("click", function() {
    $("#flip1").flip(true);
});

$("#flip1").on("dblclick", function() {
    $("#flip1").flip(false);
})


$("#flip2").on("click", function() {
    $("#flip2").flip(true);
})

$("#flip2").on("dblclick", function() {
    $("#flip2").flip(false);
})

$("#flip3").on("click", function() {
    $("#flip3").flip(true);
})

$("#flip3").on("dblclick", function() {
        $("#flip3").flip(false);
    })
    //Weather API for later

//Calls the Wunderground API to pull weather info as a json response for user's zipcode

// var queryWeather = "http://api.wunderground.com/api/88fa17d19b77bfc5/conditions/q/" + userZIP + ".json";

// $.ajax({
//  url: queryWeather,
//  method: "GET",


// }).done(function(weather) {
//  console.log(queryWeather);
//  console.log(weather);
//  });


// $.ajax({
//   url: 'https://maps.googleapis.com/maps/api/js/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood4&key=AIzaSyBfQu6oJU6bPRuUyHqpk8HStkK76-cHBN0',
//  // url: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBfQu6oJU6bPRuUyHqpk8HStkK76-cHBN0&callback=initMap",
//  method: "GET",
//  dataType:"jsonp",
//  crossOrigin:true
// }).done(function(response) {
//  console.log(response);
//  });


// });

// $(document).click(function(){
//  $("#location").toggle("slide");
// });

// $(document).ready(function(){

// // var googleMapsKey = "&key=AIzaSyBfQu6oJU6bPRuUyHqpk8HStkK76-cHBN0";
// // var weatherKey = " 88fa17d19b77bfc5";

// // var origin = "origin=Disneyland&";
// // var destination ="destination=Universal+Studios+Hollywood4";
// // var queryURL = "https://maps.googleapis.com/maps/api/directions/json?&"  + origin + destination +  googleMapsKey;

