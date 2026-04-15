const dogBtn = document.getElementById("dogBtn");
const catBtn = document.getElementById("catBtn");
const weatherBtn = document.getElementById("weatherBtn");
const currencyBtn = document.getElementById("currencyBtn");
const githubBtn = document.getElementById("githubBtn");
const jokeBtn = document.getElementById("jokeBtn");
const movieBtn = document.getElementById("movieBtn");
const extraBtn = document.getElementById("extraBtn");

const dogResult = document.getElementById("dogResult");
const catResult = document.getElementById("catResult");
const weatherResult = document.getElementById("weatherResult");
const currencyResult = document.getElementById("currencyResult");
const githubResult = document.getElementById("githubResult");
const jokeResult = document.getElementById("jokeResult");
const movieResult = document.getElementById("movieResult");
const extraResult = document.getElementById("extraResult");

async function getDog() {
  try {
    dogResult.innerHTML = "<p>Loading...</p>";
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();

    dogResult.innerHTML = `
      <img src="${data.message}" alt="Random dog">
    `;
  } catch (error) {
    dogResult.innerHTML = "<p>Failed to load dog image.</p>";
  }
}

async function getCat() {
  try {
    catResult.innerHTML = "<p>Loading...</p>";
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await response.json();

    catResult.innerHTML = `
      <img src="${data[0].url}" alt="Random cat">
    `;
  } catch (error) {
    catResult.innerHTML = "<p>Failed to load cat image.</p>";
  }
}

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();

  if (!city) {
    weatherResult.innerHTML = "<p>Please enter a city.</p>";
    return;
  }

  try {
    weatherResult.innerHTML = "<p>Loading...</p>";

    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      weatherResult.innerHTML = "<p>City not found.</p>";
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`
    );
    const weatherData = await weatherResponse.json();

    weatherResult.innerHTML = `
      <p><strong>${name}, ${country}</strong></p>
      <p>Temperature: ${weatherData.current.temperature_2m}°C</p>
      <p>Wind Speed: ${weatherData.current.wind_speed_10m} km/h</p>
    `;
  } catch (error) {
    weatherResult.innerHTML = "<p>Failed to load weather.</p>";
  }
}

async function getCurrency() {
  try {
    currencyResult.innerHTML = "<p>Loading...</p>";
    const response = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await response.json();

    currencyResult.innerHTML = `
      <p>1 USD = ${data.rates.EUR} EUR</p>
      <p>1 USD = ${data.rates.JOD} JOD</p>
    `;
  } catch (error) {
    currencyResult.innerHTML = "<p>Failed to load currency data.</p>";
  }
}

async function getGitHubUser() {
  const username = document.getElementById("githubInput").value.trim();

  if (!username) {
    githubResult.innerHTML = "<p>Please enter a GitHub username.</p>";
    return;
  }

  try {
    githubResult.innerHTML = "<p>Loading...</p>";
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error("User not found");
    }

    const data = await response.json();

    githubResult.innerHTML = `
      <img src="${data.avatar_url}" alt="${data.login}">
      <p><strong>${data.name || data.login}</strong></p>
      <p>Followers: ${data.followers}</p>
      <p>Public Repos: ${data.public_repos}</p>
      <p><a href="${data.html_url}" target="_blank">View Profile</a></p>
    `;
  } catch (error) {
    githubResult.innerHTML = "<p>GitHub user not found.</p>";
  }
}

async function getJoke() {
  try {
    jokeResult.innerHTML = "<p>Loading...</p>";
    const response = await fetch("https://v2.jokeapi.dev/joke/Any?safe-mode");
    const data = await response.json();

    if (data.type === "single") {
      jokeResult.innerHTML = `<p>${data.joke}</p>`;
    } else {
      jokeResult.innerHTML = `
        <p><strong>${data.setup}</strong></p>
        <p>${data.delivery}</p>
      `;
    }
  } catch (error) {
    jokeResult.innerHTML = "<p>Failed to load joke.</p>";
  }
}


async function getMovies() {
  const apiKey = "85a61d71d1a217d6972a43792920cabf";

  try {
    movieResult.innerHTML = "<p>Loading...</p>";

    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
    );
    const data = await response.json();

    const movies = data.results.slice(0, 3);

    movieResult.innerHTML = movies
      .map(
        movie => `
          <p><strong>${movie.title}</strong></p>
          <p>⭐ Rating: ${movie.vote_average}</p>
        `
      )
      .join("<hr>");
  } catch (error) {
    movieResult.innerHTML = "<p>Failed to load movies.</p>";
  }
}

async function getExtra() {
  try {
    extraResult.innerHTML = "<p>Loading...</p>";

    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();

    extraResult.innerHTML = `
      <p>"${data.slip.advice}"</p>
    `;
  } catch (error) {
    extraResult.innerHTML = "<p>Failed to load advice.</p>";
  }
}

dogBtn.addEventListener("click", getDog);
catBtn.addEventListener("click", getCat);
weatherBtn.addEventListener("click", getWeather);
currencyBtn.addEventListener("click", getCurrency);
githubBtn.addEventListener("click", getGitHubUser);
jokeBtn.addEventListener("click", getJoke);
movieBtn.addEventListener("click", getMovies);
extraBtn.addEventListener("click", getExtra);


getDog();
getCat();
getJoke();