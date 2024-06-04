// main div elements
const mainContainer = document.querySelector(".main-container");
const body = document.querySelector("body");
const dateElement = document.querySelector(".date");
const locationElement = document.querySelector("#location");
const tempElement = document.querySelector(".temperature");
const imageContainer = document.querySelector(".image-container");
const conditionContainer = document.querySelector(".condition");

//buttons
const toggleTempButton = document.querySelector(".temp-toggle");
const refreshWeatherButton = document.querySelector(".refresh-button");
const changeLocation = document.querySelector(".change-location");

//variables
let date = "";
let temperature = "";
let location2 = "";
let weather = "";
let condition2 = "";

function setImagesForCondition(object) {
  switch (object.current.condition.text) {
    case "Sunny":
      body.style.backgroundImage = 'url("images/sunny.jpg")';
      break;
    case "Partly cloudy":
    case "Cloudy":
    case "Overcast":
      body.style.backgroundImage = 'url("images/cloudy.jpg")';
      break;
    case "Mist":
    case "Fog":
    case "Freezing fog":
      body.style.backgroundImage = 'url("images/fog.jpg")';
      break;
    case "Patchy rain possible":
    case "Patchy light drizzle":
    case "Light drizzle":
    case "Patchy light rain":
    case "Light rain":
    case "Moderate rain at times":
    case "Moderate rain":
    case "Heavy rain at times":
    case "Heavy rain":
    case "Light rain shower":
    case "Moderate or heavy rain shower":
    case "Torrential rain shower":
      body.style.backgroundImage = 'url("images/rain.jpg")';
      break;
    case "Patchy snow possible":
    case "Patchy sleet possible":
    case "Patchy freezing drizzle possible":
    case "Blowing snow":
    case "Blizzard":
    case "Freezing drizzle":
    case "Heavy freezing drizzle":
    case "Light freezing rain":
    case "Moderate or heavy freezing rain":
    case "Light sleet":
    case "Moderate or heavy sleet":
    case "Patchy light snow":
    case "Light snow":
    case "Patchy moderate snow":
    case "Moderate snow":
    case "Patchy heavy snow":
    case "Heavy snow":
    case "Ice pellets":
    case "Light sleet showers":
    case "Moderate or heavy sleet showers":
    case "Light snow showers":
    case "Moderate or heavy snow showers":
    case "Light showers of ice pellets":
    case "Moderate or heavy showers of ice pellets":
      body.style.backgroundImage = 'url("images/snow.jpg")';
      break;
    case "Thundery outbreaks possible":
    case "Patchy light rain with thunder":
    case "Moderate or heavy rain with thunder":
    case "Patchy light snow with thunder":
    case "Moderate or heavy snow with thunder":
      body.style.backgroundImage = 'url("images/rain.jpg")';
      break;
  }
}

function updateImages(object) {
  imageContainer.src = object.current.condition.icon;
  setImagesForCondition(object);
}

function updateDate(object) {
  const inputDateStr = object.location.localtime;
  const inputDate = new Date(inputDateStr);

  const formattedDate = inputDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return formattedDate;
}

async function getWeatherData() {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=36fd27a0bf5746749f0211144243105&q=${location2}`,
    { mode: "cors" }
  );
  const weatherData = await response.json();
  weather = weatherData;
  resetDisplay(weather);
  console.log(weather);
  return weatherData;
}

//event listeners
toggleTempButton.addEventListener("click", () => {
  toggleTempType();
  resetDisplay(weather);
});

changeLocation.addEventListener("click", () => {
  location2 = prompt("Enter Desired Location");
});

refreshWeatherButton.addEventListener("click", () => {
  getWeatherData();
});

function resetDisplay(object) {
  updateVariables(object);
  //   clearDisplayData();
  updateDisplayData();
  updateImages(object);
}

function clearDisplayData() {
  dateElement.innerHTML = "";
  locationElement.innerHTML = "";
  tempElement.innerHTML = "";
  conditionContainer.innerHTML = "";
}

function updateDisplayData() {
  dateElement.innerHTML = date;
  locationElement.innerHTML = location2;
  tempElement.innerHTML = temperature;
  conditionContainer.innerHTML = condition2;
}

function updateVariables(object) {
  date = updateDate(object);
  location2 = object.location.name;
  condition2 = object.current.condition.text;
  getValidTemp(object);
}

function toggleTempType() {
  if (toggleTempButton.textContent === "Celsius") {
    toggleTempButton.textContent = "Fahrenheit";
  } else {
    toggleTempButton.textContent = "Celsius";
  }
}
function getValidTemp(object) {
  if (toggleTempButton.textContent === "Celsius") {
    temperature = object.current.temp_f + "F";
  } else {
    temperature = object.current.temp_c + "C";
  }
}

// function checkObject(object) {
//     if (object !== "") {

//     }
// }

// getWeatherData();

weather2 = [
  {
    location: {
      name: "New York",
      region: "New York",
      country: "United States of America",
      lat: 40.71,
      lon: -74.01,
      tz_id: "America/New_York",
      localtime_epoch: 1717437333,
      localtime: "2024-06-03 13:55",
    },
    current: {
      last_updated_epoch: 1717436700,
      last_updated: "2024-06-03 13:45",
      temp_c: 28.9,
      temp_f: 84,
      is_day: 1,
      condition: {
        text: "Sunny",
        icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
        code: 1000,
      },
      wind_mph: 8.1,
      wind_kph: 13,
      wind_degree: 350,
      wind_dir: "N",
      pressure_mb: 1012,
      pressure_in: 29.89,
      precip_mm: 0,
      precip_in: 0,
      humidity: 37,
      cloud: 0,
      feelslike_c: 28.9,
      feelslike_f: 84,
      windchill_c: 27.8,
      windchill_f: 82,
      heatindex_c: 27.8,
      heatindex_f: 82.1,
      dewpoint_c: 13.7,
      dewpoint_f: 56.6,
      vis_km: 16,
      vis_miles: 9,
      uv: 7,
      gust_mph: 12.5,
      gust_kph: 20.2,
    },
  },
];

location2 = "New York City";
getWeatherData();

// resetDisplay(weather[0]);
