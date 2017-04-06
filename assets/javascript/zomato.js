$(document).ready(function(){
var zheader,version,url;
var u = "https://developers.zomato.com/api/"//starter URL
// var cuisines = cuisineOptions.toString(); //type of foods to search for
var cuisineNotEliminated;
//set empty array for desired restaurant results later
var restaurantResults = [];

//user price assigned to an array
var priceSelected = new Array();
  $('.price').click(function() {
    //user selects what price point they want to search for
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
          sort: "rating",
          order: "desc"
        },
    success:function (response) {
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
            //push the new object to the restaurantResults array
            restaurantResults.push(newData);
          } 
        } console.log(restaurantResults);
        //function that takes in a restaurant and where to place that restaurant
        function placeOnPage(restaurant,pageElement){
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
        function placeOnBack(restaurant, pageElement){
          pageElement.append("<h3 class='restaurant-address'>" + restaurant.address + "</h3>");
        }
        //loop through the new restaurants array
        for (var n = 0; n < restaurantResults.length; n++){
          //make the number the index value plus 1
          var newNum = n+1;
          //select the specific div we want to append to
          var resultsDiv = $(`#result${newNum}`);
          var resultsBack = $(`#result${newNum}Back`);
          //run the function that takes in the specific restaurant and places it on the page
          placeOnPage(restaurantResults[n],resultsDiv);
// placeOnBack(restaurantResults[n], resultsBack);
        }
      },  
      //error message function
        error:function (res) {
          ecb(res)
        }
      })
    }
  }
}


//coordinates of location
var coords = {
	latitude: "32.776664",
	longitude: "-96.796988"
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
