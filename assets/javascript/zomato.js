$(document).ready(function(){
var zheader,version,url;
var u = "https://developers.zomato.com/api/"//starter URL
// var cuisines = cuisineOptions.toString(); //type of foods to search for
var cuisineNotEliminated;

//create a function that takes in an array
function extractString(array){
  //set the initial value to a empty string
    var finalString ="";
    //loop through the given array 
    array.forEach(function(prop){
    //for each item in the array, add to finalString
      finalString+= "," + prop;
    });
    console.log(finalString);
    //return finalString
    return finalString;
  }

var cuisineOptions = ["Italian", "American", "BBQ", "Burger", "Asian", "Seafood", "Pizza", "Breakfast", "Sandwich","Mexican"];
var eliminated = new Array();
    $('.type').click(function() {
       eliminated.push($(this).text());
       console.log(eliminated)
            
  cuisineNotEliminated = $(cuisineOptions).not(eliminated).get();
  console.log(cuisineNotEliminated );

  



//SA
  //array of things to NOT search, start as duplicate of cuisineOptions.
  //if not desired, remove from array.








});


var Zomato = {
  init:function (key) {
    if (key!=null) {
      zheader = {
        Accept : "text/plain; charset=utf-8",
        "Content-Type": "text/plain; charset=utf-8",
        "X-Zomato-API-Key":key
      }
    } else {
      console.error("Enter the key");
    };
    version = key.version||"v2.1";
    url = u + version
  },
  geocode:function (coords,scb,ecb) {
    if (coords.latitude&&coords.longitude==null) {
      console.error("Enter the coordinates correctly");
    } else {
      $.ajax({
        url:url+"/geocode",
        headers:zheader,
        data:{
          lat:coords.latitude,
          lon:coords.longitude
        },
        success:function (response) {
          scb(response);
        },
        error:function (res) {
          ecb(res)
        }
      })
    }
  },
  search: function(coords, cuisines, count, radius, scb, ecb){
    if (coords.latitude&&coords.longitude==null) {
      console.error("Enter the coordinates correctly");
    } else {
      $.ajax({
        url:url+"/search",
        headers:zheader,
        data:{
          lat:coords.latitude,
          lon:coords.longitude,
          count: count,
          q: extractString(cuisineNotEliminated),
          radius: radius
        },
        success:function (response) {

          //first restaurant to be returned
        	var restaurantNameOne = response.restaurants[0].restaurant.name;
        	var restaurantPriceOne = response.restaurants[0].restaurant.price_range;
        	var restaurantRatingOne = response.restaurants[0].restaurant.user_rating.aggregate_rating + " stars";
        	var restaurantLocationOne = response.restaurants[0].restaurant.location.address;
          var restaurantPhotoOne = response.restaurants[0].restaurant.featured_image;

          $("#restaurant-one").html("<img src='" + restaurantPhotoOne + "' alt='image of " + cuisines + " food' />");
          console.log(restaurantNameOne);

          //second returned restaurant
          var restaurantNameTwo = response.restaurants[1].restaurant.name;
          var restaurantPriceTwo = response.restaurants[1].restaurant.price_range;
          var restaurantRatingTwo = response.restaurants[1].restaurant.user_rating.aggregate_rating + " stars";
          var restaurantLocationTwo = response.restaurants[1].restaurant.location.address;
          var restaurantPhotoTwo = response.restaurants[1].restaurant.featured_image;

          $("#restaurant-two").html("<img src='" + restaurantPhotoTwo + "' alt='image of " + cuisines + " food' />");


          //third returned restaurant
          var restaurantNameThree = response.restaurants[2].restaurant.name;
          var restaurantPriceThree = response.restaurants[2].restaurant.price_range;
          var restaurantRatingThree = response.restaurants[2].restaurant.user_rating.aggregate_rating + " stars";
          var restaurantLocationThree = response.restaurants[2].restaurant.location.address;
          var restaurantPhotoThree = response.restaurants[2].restaurant.featured_image;
          $("#restaurant-three").html("<img src='" + restaurantPhotoThree + "' alt='image of " + cuisines + " food' />");

        	
          //fourth returned restaurant
          var restaurantNameFour = response.restaurants[3].restaurant.name;
          var restaurantPriceFour = response.restaurants[3].restaurant.price_range;
          var restaurantRatingFour = response.restaurants[3].restaurant.user_rating.aggregate_rating + " stars";
          var restaurantLocationFour = response.restaurants[3].restaurant.location.address;
          var restaurantPhotoFour = response.restaurants[3].restaurant.featured_image;
          $("#restaurant-four").html("<img src='" + restaurantPhotoFour + "' alt='image of " + cuisines + " food' />");


          //log each restaurant to the console with name, price, rating, and location
        	console.log(restaurantNameOne + " " + restaurantPriceOne + " " + restaurantRatingOne + " " + restaurantLocationOne);
        	console.log(restaurantNameTwo + " " + restaurantPriceTwo + " " + restaurantRatingTwo + " " + restaurantLocationTwo);
        	console.log(restaurantNameThree + " " + restaurantPriceThree + " " + restaurantRatingThree + " " + restaurantLocationThree);
        	console.log(restaurantNameFour + " " + restaurantPriceFour + " " + restaurantRatingFour + " " + restaurantLocationFour);
        	console.log(response)
          scb(response);
        },
        error:function (res) {
          ecb(res)
        }
      })
    }
  }
}
// $("#pricePoint-submit").on("click", function(){
//   Zomato.search(coords, cuisines, count, radius, scb);
// }) 


//coordinates of location
var coords = {
	latitude: "30.232300",
	longitude: "-97.739868"
}

var radius = 16093.44;
//max results to return
var count = 15;
//API key
Zomato.init("0ed57fbb51db1686778d3291c5a24632");
//call search options with location, cuisine, and count limit

  $("#pricePoint-submit").on("click", function(){
    console.log(cuisineNotEliminated);
    //extractString(cuisineNotEliminated);
    Zomato.search(coords, cuisines, count, radius, scb);
    
}) 



function scb(response) {
}

function ecb(){
  console.log("there was an error in zomato.js");
}

})
