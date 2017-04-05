$(document).ready(function(){
var zheader,version,url;
var u = "https://developers.zomato.com/api/"//starter URL
// var cuisines = cuisineOptions.toString(); //type of foods to search for
var cuisineNotEliminated;
var restaurantResults = [];

//user price assigned to an array
var priceSelected = new Array();
  $('.price').click(function() {
     priceSelected.push($(this).val());

  $(this).toggleClass("unpicked");
  $(this).toggleClass("picked");
})

//create a function that takes in an array
function extractString(array){
  //set the initial value to a empty string
    var finalString ="";
    //loop through the given array 
    array.forEach(function(prop){
    //for each item in the array, add to finalString
      finalString+= "," + prop;
    });
    //return finalString
    return finalString;
  }
//list of food options to select from
var cuisineOptions = ["Italian", "American", "BBQ", "Burger", "Asian", "Seafood", "Pizza", "Breakfast", "Sandwich","Mexican"];
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
  //main search parameters
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
          radius: radius,
          sort: "rating"
        },
        success:function (response) {
          
            for (var i = 0; i < count; i++) {
              if (response.restaurants[i].restaurant.featured_image && response.restaurants[i].restaurant.price_range <= priceSelected) {
                restaurantResults.push(response.restaurants[i]);
                console.log(restaurantResults);
                if(i === 0) {

                  $("#result1").append("<img class='restaurant-image' src='" + response.restaurants[i].restaurant.featured_image + "'/>");

                  $("#result1").append("<h1 class='restaurant-title'>" + response.restaurants[i].restaurant.name + "</h1>");
                  $("#result1").append("<h3 class='restaurant-price'>Price for Two: $" + response.restaurants[i].restaurant.average_cost_for_two + "</h3>");
                  $("#result1").append("<p class='restaurant-rating'>Rating: " + response.restaurants[i].restaurant.user_rating.aggregate_rating + "</p>")


                }
                if (i === 1){

                  $("#result2").append("<img class='restaurant-image'  src='" + response.restaurants[i].restaurant.featured_image + "'/>");

                  $("#result2").append("<h1 class='restaurant-title'>" + response.restaurants[i].restaurant.name + "</h1>");
                  $("#result2").append("<h3 class='restaurant-price'>Price for Two: $" + response.restaurants[i].restaurant.average_cost_for_two + "</h3>");
                  $("#result2").append("<p class='restaurant-rating'>Rating: " + response.restaurants[i].restaurant.user_rating.aggregate_rating + "</p>")

                }
                if (i === 2) {

                  $("#result3").append("<img class='restaurant-image'  src='" + response.restaurants[i].restaurant.featured_image + "'/>");

                  $("#result3").append("<h1 class='restaurant-title'>" + response.restaurants[i].restaurant.name + "</h1>");
                  $("#result3").append("<h3 class='restaurant-price'>Price for Two: $" + response.restaurants[i].restaurant.average_cost_for_two + "</h3>");
                  $("#result3").append("<p class='restaurant-rating'>Rating: " + response.restaurants[i].restaurant.user_rating.aggregate_rating + "</p>")
                }

              }
            }
                
          scb(response);
        },
        error:function (res) {
          ecb(res)
        }
      })
    }
  }
}


//coordinates of location
var coords = {
	latitude: "39.278444",
	longitude: "-76.613159"
}

var radius = 16093.44;
//max results to return
var count = 15;
//API key
Zomato.init("0ed57fbb51db1686778d3291c5a24632");
//call search options with location, cuisine, and count limit

  $("#pricePoint-submit").on("click", function(){
    Zomato.search(coords, cuisines, count, radius, scb);
    console.log(priceSelected.toString());
    
}) 



function scb(response) {
}

function ecb(){
  console.log("there was an error in zomato.js");
}

})
