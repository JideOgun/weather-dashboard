let currentDayEl = document.getElementById("currentday")
const time = moment().format('LLL');
 let currentHour = time;


var searchbtn = document.querySelector('.search-btn')
var citydiv = document.getElementById('city-div')
var statsdiv = document.getElementById('stats-div')



// Forloop for persisting the data onto HMTL page
for (var i = 0; i < localStorage.length; i++) {

    var city = localStorage.getItem(i);
    // console.log(localStorage.getItem("City"));
    var cityName = $(".city-list");
 var newlist = document.createElement('button');
    cityName.append(newlist).text(city);
}
// Key count for local storage 
var key = 0;






var getApi = function() {
    var searchFormInput = document.getElementById('form-input').value

console.log(searchFormInput)
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+searchFormInput+'&appid=640fe4f6b319bdea19e40e5ba9e99f7e';
  
    fetch(requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);

        var Lon = data.coord.lon;
        var Lat = data.coord.lat;

    
// search history persistence
var city = document.getElementById('city-list-id');
var btnEl = document.createElement('button');
btnEl.textContent = data.name;
btnEl.setAttribute("name", data.name)
city.appendChild(btnEl);

var localStorageVar = localStorage.setItem(key, data.name);
key = key + 1;



        $('#stats-div').empty();
        // create a new div, set the textcontext to data.name and append to statsdiv
        var cityName = document.createElement('h2');
        
            cityName.textContent = `${currentHour} `+data.name;
            statsdiv.append(cityName);


                    // create a new div, set the textcontext to data.main.temp and append to statsdiv
        var tempValue = document.createElement('h5');
        tempValue.textContent = 'temp: '+data.main.temp;
        statsdiv.append(tempValue);

        // create a new div, set the textcontext to data.name and append to statsdiv
        var humValue = document.createElement('h5');
        humValue.textContent = 'Humidity: '+data.main.humidity+'%';
        statsdiv.append(humValue);

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
      



      
    })
}

searchbtn.addEventListener('click', getApi);