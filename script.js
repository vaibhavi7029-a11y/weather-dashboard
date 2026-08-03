const apiKey = "49b10747e8a37e1ee8fd3faa5da0a195";

const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", (e)=>{
    if(e.key==="Enter"){
        getWeather();
    }
});

async function getWeather(){

    const city = cityInput.value.trim();

    if(city===""){
        alert("Enter city name");
        return;
    }

    searchBtn.innerHTML="⏳";

    try{

        const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        if(data.cod!=200){

            alert("City Not Found");

            searchBtn.innerHTML="🔍";

            return;
        }

        document.getElementById("temp").innerHTML=
        Math.round(data.main.temp)+"°C";

        document.getElementById("cityName").innerHTML=
        data.name+", "+data.sys.country;

        document.getElementById("description").innerHTML=
        data.weather[0].description;

        document.getElementById("humidity").innerHTML=
        data.main.humidity+"%";

        document.getElementById("wind").innerHTML=
        data.wind.speed+" m/s";

        document.getElementById("feels").innerHTML=
        Math.round(data.main.feels_like)+"°C";

        document.getElementById("visibility").innerHTML=
        data.visibility/1000+" km";

        document.getElementById("sunrise").innerHTML=
        new Date(data.sys.sunrise*1000)
        .toLocaleTimeString();

        document.getElementById("sunset").innerHTML=
        new Date(data.sys.sunset*1000)
        .toLocaleTimeString();

        document.getElementById("icon").src=
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

        changeBackground(data.weather[0].main);

    }

    catch(error){

        alert("Something went wrong");

        console.log(error);

    }

    searchBtn.innerHTML="🔍";

}

function changeBackground(weather){

    weather=weather.toLowerCase();

    if(weather.includes("cloud")){

        document.body.style.background=
        "linear-gradient(135deg,#374151,#1e293b,#0f172a)";

    }

    else if(weather.includes("rain")){

        document.body.style.background=
        "linear-gradient(135deg,#1e3a8a,#0f172a,#020617)";

    }

    else if(weather.includes("clear")){

        document.body.style.background=
        "linear-gradient(135deg,#2563eb,#0ea5e9,#1e40af)";

    }

    else if(weather.includes("snow")){

        document.body.style.background=
        "linear-gradient(135deg,#cbd5e1,#94a3b8,#64748b)";

    }

}
