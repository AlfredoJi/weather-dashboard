//Inputting the user typed city into a variable
var cityInput = $("input");
//Using dayjs to get the current date into a variable
var currentDate = dayjs().format("MM/DD/YYYY");
//Declaring the needed variables we are going to use
var cityContainer;
var fiveDay;
var dayOne;
var dayTwo;
var dayThree;
var dayFour;
var dayFive;

//Using a click function to start the fetch call
$("#search-button").click(function (event) {
    event.preventDefault();
    var cityText = cityInput.val();

    //Putting the api url into a named variable
    var cityfinderUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityText + "&appid=5e7e2647fcca19999e4ac3f12792e3be";

    //Fetching that api
    fetch(cityfinderUrl)
        .then(function (respone) {
            return respone.json();
        })
        .then(function (data) {
            //Putting the location of that city into two variables
            var cityLat = data[0].lat;
            var cityLon = data[0].lon;

            //Adding the location variables into the two api urls
            var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=5e7e2647fcca19999e4ac3f12792e3be";
            var fivedayUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=5e7e2647fcca19999e4ac3f12792e3be";

            //Calling the weather api for current weather
            fetch(weatherUrl)
                .then(function (respone) {
                    return respone.json();
                })
                .then(function (data) {
                    //Creating the textnode that will hold the current date
                    var dateText = document.createTextNode(" (" + currentDate + ")");

                    //Creating the past city into buttons 
                    var cityName = data.name;
                    var nameButton = document.createElement("button");
                    var cityNode = document.createTextNode(cityName);
                    nameButton.setAttribute("class", "btn btn-outline-primary");
                    nameButton.appendChild(cityNode);
                    document.getElementById("past-city").appendChild(nameButton);

                    //Creating the element that will hold the current weather
                    cityContainer = document.createElement("h2");
                    var presentCity = document.createTextNode(cityName);
                    cityContainer.setAttribute("class", "container");
                    cityContainer.appendChild(presentCity);
                    cityContainer.appendChild(dateText);
                    document.getElementById("test").appendChild(cityContainer);

                    //Grabbing the icon from the api call and putting it into a img element
                    var icon = data.weather[0].icon;
                    var iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
                    var iconImage = document.createElement("img");
                    iconImage.setAttribute("src", iconUrl);
                    cityContainer.appendChild(iconImage);

                    //Grabbing the temperature from the api call and putting it into a div element
                    var tempVal = data.main.temp;
                    var tempvalText = document.createTextNode(tempVal + " F");
                    var temp = document.createElement("div");
                    var tempText = document.createTextNode("Temp: ");
                    temp.appendChild(tempText);
                    temp.appendChild(tempvalText);
                    cityContainer.appendChild(temp);

                    //Grabbing the wind speed from the api call and putting it into a div element
                    var windVal = data.wind.speed;
                    var windvalText = document.createTextNode(windVal + " MPH");
                    var wind = document.createElement("div");
                    var windText = document.createTextNode("Wind: ");
                    wind.appendChild(windText);
                    wind.appendChild(windvalText);
                    cityContainer.appendChild(wind);

                    //Grabbing the humidity from the api call and putting it into a div element
                    var humVal = data.main.humidity;
                    var humvalText = document.createTextNode(humVal + " %");
                    var humidity = document.createElement("div");
                    var humText = document.createTextNode("Humidity: ");
                    humidity.appendChild(humText);
                    humidity.appendChild(humvalText);
                    cityContainer.appendChild(humidity);

                })

            //Calling the weather api for future weather
            fetch(fivedayUrl)
                .then(function (respone) {
                    return respone.json();
                })
                .then(function (data) {

                    //Creating a header element to hold the 5-day forecast text
                    fiveDay = document.createElement("h3");
                    var fiveText = document.createTextNode("5-Day Forecast:");
                    fiveDay.appendChild(fiveText);
                    document.getElementById("test").appendChild(fiveDay);

                    //Grabbing the first date from the api call
                    var firstDate = dayjs.unix(data.list[5].dt).format("MM/DD/YYYY");

                    //Putting the date into a div element
                    dayOne = document.createElement("div");
                    var oneDate = document.createTextNode(firstDate);
                    dayOne.setAttribute("class", "first-container");
                    dayOne.appendChild(oneDate);
                    document.getElementById("test").appendChild(dayOne);

                    //Grabbing the icon from the api call and putting it into a img element
                    var icon = data.list[5].weather[0].icon;
                    var iconImage = document.createElement("img");
                    iconImage.setAttribute("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");
                    dayOne.appendChild(iconImage);

                    //Grabbing the temperature from the api call and putting it into a div element
                    var oneTemp = document.createElement("div");
                    var tempVal = data.list[5].main.temp;
                    var tempText = document.createTextNode("Temp: " + tempVal + " F");
                    oneTemp.appendChild(tempText);
                    dayOne.appendChild(oneTemp);

                    //Grabbing the wind speed from the api call and putting it into a div element
                    var oneWind = document.createElement("div");
                    var windVal = data.list[5].wind.speed;
                    var windText = document.createTextNode("Wind: " + windVal + " MPH");
                    oneWind.appendChild(windText);
                    dayOne.appendChild(oneWind);

                    //Grabbing the humidity from the api call and putting it into a div element
                    var oneHum = document.createElement("div");
                    var humVal = data.list[5].main.humidity;
                    var humText = document.createTextNode("Humidity: " + humVal + " %");
                    oneHum.appendChild(humText);
                    dayOne.appendChild(oneHum);


                    var secondDate = dayjs.unix(data.list[13].dt).format("MM/DD/YYYY");

                    dayTwo = document.createElement("div");
                    var twoDate = document.createTextNode(secondDate);
                    dayTwo.setAttribute("class", "second-container");
                    dayTwo.appendChild(twoDate);
                    document.getElementById("test").appendChild(dayTwo);

                    var iconTwo = data.list[13].weather[0].icon;
                    var imageTwo = document.createElement("img");
                    imageTwo.setAttribute("src", "https://openweathermap.org/img/wn/" + iconTwo + "@2x.png");
                    dayTwo.appendChild(imageTwo);

                    var twoTemp = document.createElement("div");
                    var tempValTwo = data.list[13].main.temp;
                    var tempTextTwo = document.createTextNode("Temp: " + tempValTwo + " F");
                    twoTemp.appendChild(tempTextTwo);
                    dayTwo.appendChild(twoTemp);

                    var twoWind = document.createElement("div");
                    var windValTwo = data.list[13].wind.speed;
                    var windTextTwo = document.createTextNode("Wind: " + windValTwo + " MPH");
                    twoWind.appendChild(windTextTwo);
                    dayTwo.appendChild(twoWind);

                    var twoHum = document.createElement("div");
                    var humValTwo = data.list[13].main.humidity;
                    var humTextTwo = document.createTextNode("Humidity: " + humValTwo + " %");
                    twoHum.appendChild(humTextTwo);
                    dayTwo.appendChild(twoHum);

                    var thirdDate = dayjs.unix(data.list[21].dt).format("MM/DD/YYYY");

                    dayThree = document.createElement("div");
                    var threeDate = document.createTextNode(thirdDate);
                    dayThree.setAttribute("class", "third-container");
                    dayThree.appendChild(threeDate);
                    document.getElementById("test").appendChild(dayThree);

                    var iconThree = data.list[21].weather[0].icon;
                    var imageThree = document.createElement("img");
                    imageThree.setAttribute("src", "https://openweathermap.org/img/wn/" + iconThree + "@2x.png");
                    dayThree.appendChild(imageThree);

                    var threeTemp = document.createElement("div");
                    var tempValThree = data.list[21].main.temp;
                    var tempTextThree = document.createTextNode("Temp: " + tempValThree + " F");
                    threeTemp.appendChild(tempTextThree);
                    dayThree.appendChild(threeTemp);

                    var threeWind = document.createElement("div");
                    var windValThree = data.list[21].wind.speed;
                    var windTextThree = document.createTextNode("Wind: " + windValThree + " MPH");
                    threeWind.appendChild(windTextThree);
                    dayThree.appendChild(threeWind);

                    var threeHum = document.createElement("div");
                    var humValThree = data.list[21].main.humidity;
                    var humTextThree = document.createTextNode("Humidity: " + humValThree + " %");
                    threeHum.appendChild(humTextThree);
                    dayThree.appendChild(threeHum);

                    var fourthDate = dayjs.unix(data.list[29].dt).format("MM/DD/YYYY");

                    dayFour = document.createElement("div");
                    var fourDate = document.createTextNode(fourthDate);
                    dayFour.setAttribute("class", "fourth-container");
                    dayFour.appendChild(fourDate);
                    document.getElementById("test").appendChild(dayFour);

                    var iconFour = data.list[29].weather[0].icon;
                    var imageFour = document.createElement("img");
                    imageFour.setAttribute("src", "https://openweathermap.org/img/wn/" + iconFour + "@2x.png");
                    dayFour.appendChild(imageFour);

                    var fourTemp = document.createElement("div");
                    var tempValFour = data.list[29].main.temp;
                    var tempTextFour = document.createTextNode("Temp: " + tempValFour + " F");
                    fourTemp.appendChild(tempTextFour);
                    dayFour.appendChild(fourTemp);

                    var fourWind = document.createElement("div");
                    var windValFour = data.list[29].wind.speed;
                    var windTextFour = document.createTextNode("Wind: " + windValFour + " MPH");
                    fourWind.appendChild(windTextFour);
                    dayFour.appendChild(fourWind);

                    var fourHum = document.createElement("div");
                    var humValFour = data.list[29].main.humidity;
                    var humTextFour = document.createTextNode("Humidity: " + humValFour + " %");
                    fourHum.appendChild(humTextFour);
                    dayFour.appendChild(fourHum);

                    var fifthDate = dayjs.unix(data.list[37].dt).format("MM/DD/YYYY");

                    dayFive = document.createElement("div");
                    var fiveDate = document.createTextNode(fifthDate);
                    dayFive.setAttribute("class", "fifth-container");
                    dayFive.appendChild(fiveDate);
                    document.getElementById("test").appendChild(dayFive);

                    var iconFive = data.list[37].weather[0].icon;
                    var imageFive = document.createElement("img");
                    imageFive.setAttribute("src", "https://openweathermap.org/img/wn/" + iconFive + "@2x.png");
                    dayFive.appendChild(imageFive);

                    var fiveTemp = document.createElement("div");
                    var tempValFive = data.list[37].main.temp;
                    var tempTextFive = document.createTextNode("Temp: " + tempValFive + " F");
                    fiveTemp.appendChild(tempTextFive);
                    dayFive.appendChild(fiveTemp);

                    var fiveWind = document.createElement("div");
                    var windValFive = data.list[37].wind.speed;
                    var windTextFive = document.createTextNode("Wind: " + windValFive + " MPH");
                    fiveWind.appendChild(windTextFive);
                    dayFive.appendChild(fiveWind);

                    var fiveHum = document.createElement("div");
                    var humValFive = data.list[37].main.humidity;
                    var humTextFive = document.createTextNode("Humidity: " + humValFive + " %");
                    fiveHum.appendChild(humTextFive);
                    dayFive.appendChild(fiveHum);


                })

            //Removing the elements after the button is pressed
            cityContainer.remove();
            fiveDay.remove();
            dayOne.remove();
            dayTwo.remove();
            dayThree.remove();
            dayFour.remove();
            dayFive.remove();
        })

    $("#past-city").click(function (event) {
        event.preventDefault();
        localStorage.getItem(cityName);
        console.log("work");
    })

})
