const apiKey = "49b10747e8a37e1ee8fd3faa5da0a195";

async function getWeather() {
    const city = document.getElementById("cityInput").value;

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod != 200) {
            alert(data.message);
            return;
        }

        document.getElementById("cityName").innerText = data.name;
        document.getElementById("temperature").innerText =
            `${Math.round(data.main.temp)}°C`;
        document.getElementById("description").innerText =
            data.weather[0].description;

        document.getElementById("humidity").innerText =
            `${data.main.humidity}%`;

        document.getElementById("wind").innerText =
            `${data.wind.speed} m/s`;

        document.getElementById("feelsLike").innerText =
            `${Math.round(data.main.feels_like)}°C`;

        document.getElementById("visibility").innerText =
            `${data.visibility / 1000} km`;

        const sunrise = new Date(data.sys.sunrise * 1000);
        const sunset = new Date(data.sys.sunset * 1000);

        document.getElementById("sunrise").innerText =
            sunrise.toLocaleTimeString();

        document.getElementById("sunset").innerText =
            sunset.toLocaleTimeString();

        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

    } catch (error) {
        alert("Something went wrong!");
        console.log(error);
    }
                                                 }
