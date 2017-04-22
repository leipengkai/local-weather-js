//jQuery Document Ready
$(document).ready(function() {

    //Autocomplete using Google Maps Api
    var input = document.getElementById('form_city');
    var options = {
        types: ['(cities)']
    };

    autocomplete = new google.maps.places.Autocomplete(input, options);



    //Function to get icon
    function getIcon(dayornight, getid) {
        var finalicon;

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
    $("#more").click(function() {
        $(".div_more").hide();
        $(".search").show().addClass("animated bounceInRight");
    });

    //Hide elements from the beginning
    $(".search").hide();
    $(".newsearch").hide();


    //Animations
    $(".social a, button").hover(
        function() {
            $(this).addClass("animated pulse");
        },
        function() {
            $(this).removeClass("animated pulse");
        }
    );

    //Initialize tooltips
    $(function() {
        $('[data-toggle="tooltip"]').tooltip()
    })

    //Enter key function when enter
    $("#form_city").keyup(function(event) {
        if (event.keyCode == 13) {
            $("#startsearch").click();
            $(".newsearch").show().addClass("animated bounceInLeft");

        }
    });


    //API Functionality
    //API KEY: ec83fdc708f434c54152ef547f1a4f8b
    //GEOLOCATION
    var location = "http://ipinfo.io";
    
    var lat, long;
    var geolocation, city, region;

    //Pull your location
    $.getJSON(location, function(data1) {

        geolocation = data1.loc.split(',');
        var city = data1.city;
        var region = data1.region;
        var lat = geolocation[0];
        var long = geolocation[1];
        var country = data1.country.toLowerCase();


        $("#latitude").html(lat + " , " + long);
        $("#longitude").html(long);
        $("#region").html(city + ", " + region);
        console.log(country);

        var flag = 'images/48/' + country + '.png';

        //var flag =  'https://flagpedia.net/data/flags/normal/' +        country + '.png';

        $("#yourflag").attr('src', flag);

        //WEATHER
        var api = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=ec83fdc708f434c54152ef547f1a4f8b";





        $.getJSON(api, function(data2) {

            //Celsius
            var cTemp = (data2.main.temp - 273).toFixed(0);
            var fTemp = (cTemp * 9 / 5 + 32).toFixed(0);
            var pressure = data2.main.pressure;
            var humidity = data2.main.humidity;
            var desc = data2.weather.id;
            var toggletemp = true;

            $("#temp").html(cTemp + " C°");

            $("#temp").click(function() {

                if (toggletemp) {
                    $("#temp").html(fTemp + " F°");
                    toggletemp = false;
                    $("#changetemp").html("Click to change to C°");
                } else {

                    $("#temp").html(cTemp + " C°");
                    toggletemp = true;
                    $("#changetemp").html("Click to change to F°");

                }

            });

            var final_icon = getIcon(data2.weather[0].icon.charAt(2), data2.weather[0].id);
            $("#firsticon").attr("src", "images/weather/" + final_icon);
            $("#pressure").html(pressure + " hPa");
            $("#humidity").html(humidity + "%");

        });

    },"jsonp");



    //SEARCH FUNCTIONALITY
    $("#startsearch").click(function() {

        $(".newsearch").show().addClass("animated bounceInLeft");

        var searchvalue = $("input:text").val();
        var api2 = "http://api.openweathermap.org/data/2.5/weather?q=" + searchvalue + "&appid=ec83fdc708f434c54152ef547f1a4f8b";



        $.getJSON(api2, function(data3) {

            var yourcity = data3.name;
            var yourcountry = data3.sys.country.toLowerCase();
            var yourtemp = (data3.main.temp - 273).toFixed(0);
            var yourforecast = data3.weather[0].description;
            var icon = data3.weather[0].icon;
            var extraflag = 'images/48/' + yourcountry + '.png';
            var getid = data3.weather[0].id;
            var dayornight = data3.weather[0].icon.charAt(2);
            var finalicon = getIcon(dayornight, getid);




            $("#anothercountry").attr('src', extraflag);
            $("#yourcity").html(yourcity + " , " + yourcountry.toUpperCase());
            $("#yourtemp").html(yourtemp + " C°");

            var toggletemp2 = true;




            $("#yourtemp").click(function() {

                if (toggletemp2) {
                    $("#yourtemp").html((yourtemp * 9 / 5 + 32).toFixed(0) + " F°");
                    toggletemp2 = false;
                } else {
                    $("#yourtemp").html(yourtemp + " C°");
                    toggletemp2 = true;
                }

            });


            $("#yourforecast").html(yourforecast);
            $("#yourpressure").html(data3.main.pressure + " hPa");
            $("#yourhumidity").html(data3.main.humidity + "%");
            $("#newicon").attr("src", "images/weather/" + finalicon);

        });

    });





});
