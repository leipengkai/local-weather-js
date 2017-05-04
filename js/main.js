
document.addEventListener('DOMContentLoaded', function(){


    //Autocomplete using Google Maps Api
    const input = document.getElementById('form_city');
    let options = {
        types: ['(cities)']
    };

    autocomplete = new google.maps.places.Autocomplete(input, options);



    //Function to get icon
    function getIcon(dayornight, getid) {
        let finalicon;

        if (dayornight == "d") {
            extension = ".png";
        } else if (dayornight == "n") {
            extension = "_night.png";
        } else {
            extension = ".png";
        }


        //Thunderstorm
        if (getid == 200 || getid == 211 || getid == 230) {
            finalicon = "tstorm1" + extension;
        } else if (getid == 201 || getid == 210 || getid == 231) {
            finalicon = "tstorm2" + extension;
        } else if (getid == 202 || getid == 212 || getid == 232 || getid == 221) {
            finalicon = "tstorm3.png";
        }
        //Drizzle
        else if (getid >= 300 && getid <= 321) {
            finalicon = "light_rain.png";
        }
        //Rain
        else if (getid == 500 || getid == 520) {
            finalicon = "shower1" + extension;
        } else if (getid == 521 || getid == 501) {
            finalicon = "shower2" + extension;
        } else if (getid == 504 || getid == 522 || getid == 531 || getid == 503) {
            finalicon = "shower3.png";
        } else if (getid == 511) {
            finalicon = "hail.png";
        }
        //Snow
        else if (getid >= 611 && getid <= 620) {
            finalicon = "sleet.png";
        } else if (getid == 600) {
            finalicon = "snow1" + extension;
        } else if (getid == 601) {
            finalicon = "snow2" + extension;
        } else if (getid == 602) {
            finalicon = "snow3" + extension;
        } else if (getid == 621) {
            finalicon = "snow4.png";
        } else if (getid == 622) {
            finalicon = "snow5.png";
        }
        //Atmosphere
        else if (getid >= 701 && getid <= 781) {
            finalicon = "fog" + extension;
        }
        //Clear
        else if (getid == 800) {
            finalicon = "sunny" + extension;
        }
        //Clouds
        else if (getid == 801) {
            finalicon = "cloudy1" + extension;
        } else if (getid == 802) {
            finalicon = "cloudy2" + extension;
        } else if (getid == 803) {
            finalicon = "cloudy3" + extension;
        } else if (getid == 804) {
            finalicon = "cloudy4" + extension;
        }
        //Extreme
        else if (getid >= 900 && getid <= 905) {
            finalicon = "dunno" + extension;
        } else if (getid == 906 || getid == 511) {
            finalicon = "hail.png";
        }
        //Additional
        else if (getid >= 951 && getid <= 962) {
            finalicon = "dunno" + extension;
        }

        return finalicon;


    }

    //Clicking for more info
    const moreInfoButton = document.getElementById('more');
    const moreInfoContainer = document.querySelector(".div_more");
    const searchBar = document.querySelector('.search');
    const newSearchBar = document.querySelector('.newsearch');

    moreInfoButton.addEventListener('click', function() {
        moreInfoContainer.style.display = 'none';
        searchBar.style.display = '';
        searchBar.classList.add("animated","bounceInRight");
    });

    //Hide elements from the beginning
    searchBar.style.display = 'none';
    newSearchBar.style.display = 'none';

    //Animations
    const socialIcons = document.querySelectorAll('.social a');
    const allButtons = document.querySelectorAll('button');
    
    socialIcons.forEach(icon => icon.addEventListener('mouseover',function(){
        icon.classList.add('animated','pulse');
    }));
    socialIcons.forEach(icon => icon.addEventListener('mouseout',function(){
        icon.classList.remove('animated','pulse');
    }));
    allButtons.forEach(button => button.addEventListener('mouseover',function(){
        button.classList.add('animated','pulse');
    }));
    allButtons.forEach(button => button.addEventListener('mouseout',function(){
        button.classList.remove('animated','pulse');
    }));

    //Initialize tooltips for Bootstrap this requires jQuery sadly :(
    $(function() {
        $('[data-toggle="tooltip"]').tooltip()
    })

    const startSearch = document.getElementById('startsearch');
    const cityInput = document.getElementById('form_city');
 
    //Enter key function when enter
    document.addEventListener('keypress',function(e){
    if(e.key == "Enter" && cityInput.value !== ''){
        startSearch.click();
        newSearchBar.style.display = '';
        newSearchBar.classList.add("animated" ,"bounceInRight");
    }
    });

  
    //API Functionality
    //API KEY: ec83fdc708f434c54152ef547f1a4f8b
    //GEOLOCATION
    let location = "http://ipinfo.io";
    
    let lat, long;
    let geolocation, city, region;

/*
    axios.get(location)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
*/
    //Pull your location
    axios.get(location)
    .then(function(response) {
        console.log(response);
        geolocation = response.data.loc.split(',');
        let city = response.data.city;
        let region = response.data.region;
        let lat = geolocation[0];
        let long = geolocation[1];
        let country = response.data.country.toLowerCase();


        $("#latitude").html(lat + " , " + long);
        $("#longitude").html(long);
        $("#region").html(city + ", " + region);
        console.log(country);

        let flag = 'images/48/' + country + '.png';

        //var flag =  'https://flagpedia.net/data/flags/normal/' +        country + '.png';

        $("#yourflag").attr('src', flag);

        //WEATHER
        let api = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=ec83fdc708f434c54152ef547f1a4f8b";



        

        axios.get(api)
        .then(function (response) {

            //Celsius
            let cTemp = (response.data.main.temp - 273).toFixed(0);
            let fTemp = (cTemp * 9 / 5 + 32).toFixed(0);
            let pressure = response.data.main.pressure;
            let humidity = response.data.main.humidity;
            let desc = response.data.weather.id;
            let toggletemp = true;

            const temp = document.getElementById('temp');
            const changeTemp = document.getElementById('changetemp');
            temp.innerHTML = cTemp + " C°";

            temp.addEventListener("click", function() {

                if (toggletemp) {
                    temp.innerHTML = fTemp + " F°";
                    toggletemp = false;
                    changeTemp.innerHTML = "Click to change to C°";
                } else {
                    temp.innerHTML = cTemp + " C°";
                    toggletemp = true;
                    changeTemp.innerHTML = "Click to change to F°";
                }

            });

            var final_icon = getIcon(response.data.weather[0].icon.charAt(2), response.data.weather[0].id);
            const firstIcon = document.getElementById('firsticon');
            const pressureH = document.getElementById('pressure');
            const humidityH = document.getElementById('humidity');

            firstIcon.setAttribute('src', "images/weather/" + final_icon);
            pressureH.innerHTML = pressure + " hPa";
            humidityH.innerHTML = humidity + "%";

        })
        .catch(function (error) {
            console.log(error);
        });

    })
    .catch(function (error) {
        console.log(error);
    });



    //SEARCH FUNCTIONALITY
    startSearch.addEventListener('click',function() {

        newSearchBar.style.display = '';
        newSearchBar.classList.add('animated','bounceInLeft');

        let searchvalue = document.getElementById('form_city').value;
        console.log(searchvalue);
        let api2 = "http://api.openweathermap.org/data/2.5/weather?q=" + searchvalue + "&appid=ec83fdc708f434c54152ef547f1a4f8b";


    axios.get(api2)
        .then(function (response) {

            let yourcity = response.data.name;
            let yourcountry = response.data.sys.country.toLowerCase();
            let yourtemp = (response.data.main.temp - 273).toFixed(0);
            let yourforecast = response.data.weather[0].description;
            let icon = response.data.weather[0].icon;
            let extraflag = 'images/48/' + yourcountry + '.png';
            let getid = response.data.weather[0].id;
            let dayornight = response.data.weather[0].icon.charAt(2);
            let finalicon = getIcon(dayornight, getid);

            const secondIcon = document.getElementById('anothercountry');
            const cityH = document.getElementById('yourcity');
            const tempH = document.getElementById('yourtemp');

            secondIcon.setAttribute('src', extraflag);
            cityH.innerHTML = yourcity + " , " + yourcountry.toUpperCase();
            tempH.innerHTML = yourtemp + " C°";

            let toggletemp2 = true;


            yourTemp = document.getElementById('yourtemp');
            yourTemp.addEventListener('click', function() {

                if (toggletemp2) {
                    yourTemp.innerHTML = (yourtemp * 9 / 5 + 32).toFixed(0) + " F°";
                    toggletemp2 = false;
                } else {
                    yourTemp.innerHTML = yourtemp + " C°";
                    toggletemp2 = true;
                }

            });

            let yourForecast = document.getElementById('yourforecast');
            let yourPressure = document.getElementById('yourpressure');
            let yourHumidity = document.getElementById('yourhumidity');
            let newIcon = document.getElementById('newicon');

            yourForecast.innerHTML = yourforecast;
            yourPressure.innerHTML = response.data.main.pressure + " hPa";
            yourHumidity.innerHTML = response.data.main.humidity + "%";
            newIcon.setAttribute('src', "images/weather/" + finalicon);

        })
        .catch(function (error) {
            console.log(error);
        });

    });





});
