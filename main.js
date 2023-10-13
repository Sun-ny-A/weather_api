

console.log('Weather API')

async function requestAPI(city) {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bbad0dc35936eaaae3f5be4d4252eec9`)
    if (res.ok) {
        const data = await res.json()
        console.log(data)
        weatherTable(data)
        if (['rain', 'raining', 'rainy', 'drizzle'].includes(data.weather[0].main.toLowerCase())) {
            document.body.style.backgroundImage = 'url("rain.jpg")'
        } else if (['sun', 'clear', 'sunny', 'sunshine'].includes(data.weather[0].main.toLowerCase())) {
            document.body.style.backgroundImage = 'url("sun.jpg")'
        } else if (['cloudy', 'clouds', 'cloud'].includes(data.weather[0].main.toLowerCase())) {
            document.body.style.backgroundImage = 'url("cloud.jpg")'
        } 
        return data
    } else window.alert('Bad Request')
}

function weatherTable(data) {
    const highTempElement = document.getElementById("highTemp")
    const lowTempElement = document.getElementById("lowTemp")
    const forecastElement = document.getElementById("forecast")
    const humidityElement = document.getElementById("humidity")

    const highTemp = convertKelvinToFahrenheit(data.main.temp_max)
    const lowTemp = convertKelvinToFahrenheit(data.main.temp_min)
    const forecast = data.weather[0].description
    const humidity = data.main.humidity

    highTempElement.textContent = `${highTemp} °F`
    lowTempElement.textContent = `${lowTemp} °F`
    forecastElement.textContent = `${forecast}`
    humidityElement.textContent = `${humidity}%`

    function convertKelvinToFahrenheit(kelvinTemp) {
        return ((kelvinTemp - 273.15) * 9/5 + 32).toFixed(2)
    }
}

function displayRain() {
    document.getElementById('rain').style.display = 'block'
    document.getElementById('sun').style.display = 'none'
    document.getElementById('cloud').style.display = 'none'
}

function displaySun() {
    document.getElementById('rain').style.display = 'none'
    document.getElementById('sun').style.display = 'block'
    document.getElementById('cloud').style.display = 'none'
}

function displayCloud() {
    document.getElementById('rain').style.display = 'none'
    document.getElementById('sun').style.display = 'none'
    document.getElementById('cloud').style.display = 'block'
}

// test requestAPI("Chicago")

//formEventListener
document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault()
    getInfo()
})

function getInfo() {
    const cityInput = document.getElementById("cityInput").value;
    requestAPI(cityInput)
}

