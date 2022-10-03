const API_KEY = '3cc925506e89005bc434ff86cbdc5ae6';

function fetchGeoLocation(city) {
  return fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
  ).then(res => res.json());
}

function fetchWeather(city) {
  let lon = 0;
  fetchGeoLocation(city).then(r =>
    r.map(it => {
      lon = it.lon;
      return lon;
    })
  );
  let lat = 0;
  fetchGeoLocation(city).then(r => r.map(it => (lat = it.lat)));
  console.log(lon, lat);

  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${+lat}&lon=${+lon}&appid=${API_KEY}&units=metric`
  ).then(res => res.json());
}

export { fetchGeoLocation };
export { fetchWeather };
