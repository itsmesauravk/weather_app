let details = document.querySelector('.details');
let search = document.querySelector('#search');
let main = document.querySelector(".main");
let card  = document.querySelector(".card");
let card2 = document.querySelector(".card2")
let history = document.getElementById("history");
let back = document.getElementById("back")
let buttons = document.querySelectorAll(".btn")


// to check online or not
function isOnline() {
    return navigator.onLine;
}


function weather(city) {
    // Fetch weather data from the PHP file
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7909a3f6027a002f28a9f982feb7917c&units=metric`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            if (data.cod === 200) {
                // Updating the HTML with the value
                const {
                    name,
                    main: {
                        temp: temperature,
                        humidity: humidityV,
                        pressure: pressureV,
                    },
                    weather: [{ description }],
                    wind: { speed },
                    dt: timeValue,
                } = data;
                //for localstorage
                localStorage.setItem(name,JSON.stringify(data))
                //
                let cityname = name;
                let weatherImg = data.weather[0].icon;
                console.log(weatherImg);
                let weatherDes =  description;
        
                details.innerHTML = `
                <div class='weather'>
                    <span class="title">${cityname}</span>
                    <span class="temp">${Math.floor(temperature)}°c</span>
                    <img class="imageEl" src="http://openweathermap.org/img/w/${weatherImg}.png">
                    <h4>${weatherDes}</h4>
                    <div id='extra'>
                        <div class='extra-details'>max/min temp:<br> <p>${data.main.temp_max}°c <br>${data.main.temp_min}°c</p></div>
                        <div class='extra-details'>Wind-speed:<br> <p>${speed}m/s</p></div>
                        <div class='extra-details'>Humidity:<br><p> ${humidityV}%</p></div>
                        <div class='extra-details'>Pressure:<br> <p>${pressureV}mbar</p> </div>
                    </div>
                </div>
                `;
                // localStorage.clear()
                // Call the function to save data to the database
                saveWeatherDataToDatabase(city, data)
                .then(response => {
                    console.log(response); // Log the response from the server
                })
                .catch(error => {
                    console.error(error);
                });
            } else {  // if failed in finding the city, gives City not found as a result
                details.innerHTML = `<div id='error'>Unknown location,<br> please check and enter again !!<br>Thank you :)</h1>`;
                card.style.backgroundColor = "rgba(200, 0, 0, 0.2)";
            }
        })
        .catch(error => {
            console.error(error);
            details.innerHTML = `Oops !, error occurred.. `;
            card.style.border = "2px solid Red";
        });                
            
}
//using local storage//


function localDisplay(city) {
    console.log("localStorage: " + city);
    const data = localStorage.getItem(city);
    if (!data) {
        console.log("Data not found in localStorage.");
        details.textContent = "No data found in Local Storage"
        card.style.backgroundColor = "rgba(200, 0, 0, 0.2)";
        return; // Exit the function if data is not available
    }
    try {
        const result = JSON.parse(data);
        console.log(result)
        // console.log(result.name)
        let cityname = result.name
        let weatherImg = result.weather[0].icon
        console.log(weatherImg)
        let weatherDes = result.weather[0].description
        details.innerHTML = `
        <div class='weather'>
            <span class="title">${cityname}</span>
            <span class="temp">${Math.floor(result.main.temp)}°c</span>
            <img class="imageEl" src="http://openweathermap.org/img/w/${weatherImg}.png">
            <h4>${weatherDes}</h4>
            <div id='extra'>
                <div class='extra-details'>max/min temp:<br> <p>${result.main.temp_max}°c <br>${result.main.temp_min}°c</p></div>
                <div class='extra-details'>Wind-speed:<br> <p>${result.wind.speed}m/s</p></div>
                <div class='extra-details'>Humidity:<br><p> ${result.main.humidity}%</p></div>
                <div class='extra-details'>Pressure:<br> <p>${result.main.pressure}mbar</p> </div>
            </div>
        </div>
        `
    } catch (error) {
        console.error("Error parsing data:", error);
    }
}


//
weather("New Forest");


search.addEventListener('click', () => {
    let getCity = document.querySelector(".enterValue");
    if (isOnline()){
        weather(getCity.value);
    }else{
        localDisplay(getCity.value);
    }
    getCity.value = "";
});

// Save weather data to the local database
function saveWeatherDataToDatabase(city, data) {
    // Sending weather data to the PHP file
    return fetch("weather.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ city, data })
    })
    .then(response => response.text())
    .catch(error => {
        throw new Error("Error saving data to the database.");
    });
}

//for time display
setInterval(()=>{
    document.querySelector(".time").textContent = Date();
}, 1000);

history.addEventListener("click",()=>{
    card.style.display = "none"
    card2.style.display = "flex"
})
back.addEventListener("click",()=>{
    // console.log('clicked unhide btn')
    card.style.display = "flex" ;
    card2.style.display = "none"
})


// //for history
//for seven day 
function historY() {
    fetch('weather_his.php') // Use the correct path to your PHP script
    .then(response => response.json())
    .then(data => {
        // Process the JSON data and display it in your HTML
        const weatherTable = document.querySelector(".historyW");

        data.forEach(item => {
            const tableRow = document.createElement("tr");
            tableRow.innerHTML = `
                <td>${item.city}</td>
                <td>${item.date}</td>
                <td>${item.temperature}°C</td>
                <td>${item.humidity}%</td>
                <td>${item.pressure} Pa</td>
                <td>${item.wind} m/s</td>
                <td>${item.description}</td>
            `;
            weatherTable.appendChild(tableRow);
        });
        
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });
}

// Call the function to fetch and display the data
historY();