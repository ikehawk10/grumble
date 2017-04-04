var zheader,version,url;
var u = "https://developers.zomato.com/api/"//starter URL
var cuisineOptions = ["American", "BBQ", "Burger", "Asian", "Seafood", "Pizza", "Breakfast", "Sandwich", "Mexican", "Chinese", "Steak"]
// var cuisines = cuisineOptions.toString(); //type of foods to search for
var cuisines = cuisineOptions.toString();


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
          q: cuisines,
          radius: radius
        },
        success:function (response) {

          //first restaurant to be returned
        	var restaurantNameOne = response.restaurants[0].restaurant.name;
        	var restaurantPriceOne = response.restaurants[0].restaurant.price_range;
        	var restaurantRatingOne = response.restaurants[0].restaurant.user_rating.aggregate_rating + " stars";
        	var restaurantLocationOne = response.restaurants[0].restaurant.location.address;
          var restaurantPhotoOne = response.restaurants[0].restaurant.featured_image;

          $("#restaurant-one").html("<img src='" + restaurantPhotoOne + "' alt='image of food' />");

          //second returned restaurant
          var restaurantNameTwo = response.restaurants[1].restaurant.name;
          var restaurantPriceTwo = response.restaurants[1].restaurant.price_range;
          var restaurantRatingTwo = response.restaurants[1].restaurant.user_rating.aggregate_rating + " stars";
          var restaurantLocationTwo = response.restaurants[1].restaurant.location.address;
          var restaurantPhotoTwo = response.restaurants[1].restaurant.featured_image;

          $("#restaurant-two").html("<img src='" + restaurantPhotoTwo + "' alt='image of food' />");


          //third returned restaurant
          var restaurantNameThree = response.restaurants[2].restaurant.name;
          var restaurantPriceThree = response.restaurants[2].restaurant.price_range;
          var restaurantRatingThree = response.restaurants[2].restaurant.user_rating.aggregate_rating + " stars";
          var restaurantLocationThree = response.restaurants[2].restaurant.location.address;
          var restaurantPhotoThree = response.restaurants[2].restaurant.featured_image;
          $("#restaurant-three").html("<img src='" + restaurantPhotoThree + "' alt='image of food' />");

        	
          //fourth returned restaurant
          var restaurantNameFour = response.restaurants[3].restaurant.name;
          var restaurantPriceFour = response.restaurants[3].restaurant.price_range;
          var restaurantRatingFour = response.restaurants[3].restaurant.user_rating.aggregate_rating + " stars";
          var restaurantLocationFour = response.restaurants[3].restaurant.location.address;
          var restaurantPhotoFour = response.restaurants[3].restaurant.featured_image;
          $("#restaurant-four").html("<img src='" + restaurantPhotoFour + "' alt='image of food' />");


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

//coordinates of location
var coords = {
	latitude: "30.304020",
	longitude: "-97.718652"
}

var radius = 3218.69;
//max results to return
var count = 5;
//API key
Zomato.init("0ed57fbb51db1686778d3291c5a24632");
//call search options with location, cuisine, and count limit
Zomato.search(coords, cuisines, count, radius, scb);

function scb(response) {
}

function ecb(){
  console.log("there was an error in zomato.js");
}
