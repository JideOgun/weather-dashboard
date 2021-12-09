let currentDayEl = document.getElementById("currentday")
const time = moment().format('LLL');
 let currentHour = time;


var searchbtn = document.querySelector('.search-btn')
var citydiv = document.getElementById('city-div')
var statsdiv = document.getElementById('stats-div')
var carddiv = document.getElementById('card-div-id');



// // search history persistence - getting the data
for (var i = 0; i < localStorage.length; i++) {

    var city = localStorage.getItem(i);
    var cityName = document.getElementById('city-list-id')
 var newlist = document.createElement('button');
 newlist.textContent = city;
    cityName.appendChild(newlist);
}
// Key count for local storage 
var key = 0;

// Retreiving the open weather API url and using json() to parse it
var getApi = function() {
    var searchFormInput = document.getElementById('form-input').value;
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+searchFormInput+'&appid=640fe4f6b319bdea19e40e5ba9e99f7e';
  
    fetch(requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);

        var Lon = data.coord.lon;
        var Lat = data.coord.lat;

    
// search history persistence - setting the data
var city = document.getElementById('city-list-id');
var btnEl = document.createElement('button');
btnEl.textContent = data.name;
btnEl.setAttribute("name", data.name)
city.appendChild(btnEl);

var localStorageVar = localStorage.setItem(key, data.name);
key = key + 1;


// stops elements from appending to container continuously when the search button is clicked by first emptying whatever is in there and generating new data
$('#stats-div').empty();
// create a new div, set the textcontext to data.name and append to statsdiv
var cityName = document.createElement('h2');

cityName.textContent = `${currentHour} `+data.name;
statsdiv.append(cityName);


// create a new div, set the textcontext to data.main.temp and append to statsdiv
var tempValue = document.createElement('h5');
tempValue.textContent = 'temp: '+data.main.temp+'K';
statsdiv.append(tempValue);

// create a new div, set the textcontext to data.name and append to statsdiv
var humValue = document.createElement('h5');
humValue.textContent = 'Humidity: '+data.main.humidity+'%';
statsdiv.append(humValue);

// create a new div, set the textcontext to data.name and append to statsdiv
var windValue = document.createElement('h5');
windValue.textContent = 'Wind Speed: '+data.wind.speed+'mph';
statsdiv.append(windValue);



var url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+Lat+'&'+'lon='+Lon+'&exclude=hourly,daily&appid=640fe4f6b319bdea19e40e5ba9e99f7e';
fetch(url)
.then(function(res) {
    return res.json();
})
.then(function(dat)
{console.log(dat)
// create a new div, set the textcontext to data.name and append to statsdiv
var uvValue = document.createElement('div');
uvValue.textContent = 'UV Index: '+dat.current.uvi;
statsdiv.appendChild(uvValue);
    })




var url_link = 'https://api.openweathermap.org/data/2.5/forecast?q='+data.name+'&appid=640fe4f6b319bdea19e40e5ba9e99f7e';
fetch(url_link)
.then(function(resp) {
    return resp.json();
})
.then(function(forecastdata)
{
    console.log(forecastdata);

    $('#card-div-id').empty();


    // creating an array of days I want to loop over because the api give trhe forecast in 3 hour increments so using a regular for loop will return the wrong data
var day = [0, 8, 16, 24, 32];
day.forEach(function(i) {
    // create a new div, set the textcontext to data.name and append to card-div
    var forecastInfo = document.createElement('card');
    forecastInfo.className = "newcard";
    forecastInfo.textContent = forecastdata.list[i].dt_txt;
    carddiv.appendChild(forecastInfo);

    // creating the weather icon element and appending it to the forecast container
    var icon = forecastdata.list[i].weather[0].icon;
    console.log(icon);
    var img = document.createElement("img");
    img.src =  `http://openweathermap.org/img/wn/${icon}@2x.png`
    forecastInfo.append(img);

    // creating the temperature element and appending it to the forecast container
    var tempVal = document.createElement('p');
    tempVal.className = "newcard";
    tempVal.textContent = 'Temp: '+forecastdata.list[i].main.temp+'K';
    forecastInfo.appendChild(tempVal);

    // creating the wind speed element and appending it to the forecast container
    var windVal = document.createElement('p');
    windVal.className = "newcard";
    windVal.textContent = 'Wind: '+forecastdata.list[i].wind.speed+' mph';
    forecastInfo.appendChild(windVal);

    // creating the humidity element and appending it to the forecast container
    var humVal = document.createElement('p');
    humVal.className = "newcard";
    humVal.textContent = 'Humidity: '+forecastdata.list[i].main.humidity+'%';
    forecastInfo.appendChild(humVal);
        });
    });
});
}
searchbtn.addEventListener('click', getApi);