


var searchbtn = document.querySelector('.search-btn')
var citydiv = document.getElementById('city-div')
var statsdiv = document.getElementById('stats-div')

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

        // create a new div, set the textcontext to data.name and append to statsdiv
        var cityName = document.createElement('h2');
            cityName.textContent = 'current day '+data.name;
            statsdiv.appendChild(cityName);

                    // create a new div, set the textcontext to data.main.temp and append to statsdiv
        var tempValue = document.createElement('h3');
        tempValue.textContent = 'temp: '+data.main.temp;
        statsdiv.appendChild(tempValue);

        // create a new div, set the textcontext to data.name and append to statsdiv
        var humValue = document.createElement('h3');
        humValue.textContent = 'Humidity: '+data.main.humidity;
        statsdiv.appendChild(humValue);

        // // create a new div, set the textcontext to data.name and append to statsdiv
        // var uvValue = document.createElement('div');
        // uvalue.textContent = data.main.temp;
        // statsdiv.appendChild(uvValue);


      
    })
}

searchbtn.addEventListener('click', getApi);