const API_KEY = '3cc925506e89005bc434ff86cbdc5ae6';

// function fetchGeoLocation(city) {
//   return fetch(
//     `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
//   ).then(res => res.json());
// }

function fetchWeather(city) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  ).then(res => res.json());
}

// export { fetchGeoLocation };
export { fetchWeather };
