const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("city");
const temperatureDiv = document.getElementById("temperature");
const descriptionDiv = document.getElementById("description");
const iconDiv = document.getElementById("icon");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value;
  if (city === "") {
    showError("Enter Your City");
    return;
  }

  const apiKey = "746c550e55bb25cc27fda32bdbfa9739";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        showError("City not found");
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      temperatureDiv.innerText = `${data.main.temp} °F`;
      descriptionDiv.innerText = data.weather[0].description;
      iconDiv.innerHTML = `<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon">`;
    })
    .catch(error => console.log(error));
});

function showError(message) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "error";
  errorDiv.innerText = message;

  const containerDiv = document.getElementById("container");
  containerDiv.insertBefore(errorDiv, temperatureDiv);
}
