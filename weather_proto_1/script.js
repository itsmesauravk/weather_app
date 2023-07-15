let details = document.querySelector('.details')
let search = document.querySelector('#search')
let main = document.querySelector(".main")


function weather(currentCity){
    let p = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=7909a3f6027a002f28a9f982feb7917c&units=metric`)
    p.then((response)=> {
    return response.json()}
    ).then((result)=>{
    console.log(result)
    try{
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
                <div class='extra-details'>Wind-speed:<br> <p>${result.wind.speed}</p></div>
                <div class='extra-details'>Humidity:<br><p> ${result.main.humidity}</p></div>
                <div class='extra-details'>Pressure:<br> <p>${result.main.pressure}atm</p> </div>
            </div>
        </div>
        `
        
    }catch(error){
        console.log("error occored sir!!!")
        details.innerHTML = `<div id='error'>Unknown location,<br> please check and enter again !!<br>Thank you :)</h1>`
    }
    })
}       
weather("New Forest")

search.addEventListener('click',()=>{
    let getCity = document.querySelector(".enterValue").value
    weather(`${getCity}`)
    console.log(getCity)
})

//for time display
setInterval(()=>{
    document.querySelector(".time").textContent = Date()
},1000)