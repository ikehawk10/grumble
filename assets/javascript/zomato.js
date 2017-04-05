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
            // console.log(response);
            for (var i = 0; i < response.restaurants.length; i++) {
              if (response.restaurants[i].restaurant.featured_image && response.restaurants[i].restaurant.price_range == priceSelected) {

                var newData = {}
                newData.name = response.restaurants[i].restaurant.name;
                newData.avgCost = response.restaurants[i].restaurant.average_cost_for_two;
                newData.aggSeat = response.restaurants[i].restaurant.user_rating.aggregate_rating;
                newData.image = response.restaurants[i].restaurant.featured_image;
                restaurantResults.push(newData);
                console.log(restaurantResults);
              }
            }

            function placeOnPage(restaurant,pageElement){
                  pageElement.append("<img class='restaurant-image' src='" + restaurant.image + "'/>");
                  pageElement.append("<h1 class='restaurant-title'>" + restaurant.name + "</h1>");
                  pageElement.append("<h3 class='restaurant-price'>Price for Two: $" + restaurant.avgCost + "</h3>");
                  pageElement.append("<p class='restaurant-rating'>Rating: " + restaurant.aggSeat + "</p>")
            }

            for (var n=0;n<restaurantResults.length;n++){
              var newNum = n+1;
              var newDiv = $(`#result${newNum}`);
              placeOnPage(restaurantResults[n],newDiv);
            }
          },  
           
          // scb(response);

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
var count = 30;
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

});
