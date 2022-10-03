import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import countryInfo from './templates/country-info.hbs';
import countryList from './templates/country-list.hbs';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchWeather } from './js/fetchWeather';
import { fetchGeoLocation } from './js/fetchWeather';

const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  const trimInput = evt.target.value.trim();
  if (trimInput === '') {
    marcUpClean();
    return;
  }
  const country = fetchCountries(trimInput);
  list(country);
  info(country);
}

function list(fetchInput) {
  fetchInput
    .then(res => {
      if (res.length > 10) {
        marcUpClean();
        setTimeout(() => refs.countryList.classList.remove('translate'), 200);
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (res.length === 1) {
        refs.countryList.innerHTML = '';
        return;
      }
      refs.countryList.innerHTML = '';
      res.map(obj => {
        renderList(obj);
        setTimeout(() => refs.countryList.classList.add('translate'), 200);
      });
    })
    .catch(err =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}

function info(fetchInput) {
  fetchInput
    .then(res => {
      if (res.length > 1) {
        refs.countryInfo.innerHTML = '';
        setTimeout(() => refs.countryList.classList.add('translate'), 200);
        setTimeout(() => refs.countryInfo.classList.remove('opacity'), 200);
        return;
      }

      res.map(obj => {
        console.log(obj);
        obj.languages = obj.languages.map(lang => lang.name).join(', ');
        renderInfo(obj);
      });
    })
    .catch(err => console.log(err));
  setTimeout(() => refs.countryList.classList.remove('translate'), 200);
  setTimeout(() => refs.countryInfo.classList.add('opacity'), 200);
}

function renderList(countries) {
  const markUp = countryList(countries);
  refs.countryList.insertAdjacentHTML('afterbegin', markUp);
  linkClick();
}

function renderInfo(country) {
  console.log('info', country);
  const markUp = countryInfo(country);
  console.log(markUp);
  refs.countryInfo.innerHTML = markUp;
}

function marcUpClean() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function linkClick() {
  const countryLink = document.querySelector('.country-list__link');
  countryLink.onclick = evt => {
    evt.preventDefault();

    const selectedCountry = countryLink.lastElementChild.textContent;
    const country = fetchCountries(selectedCountry);
    marcUpClean();
    country
      .then(res => {
        res[0].languages = res[0].languages.map(lang => lang.name).join(', ');
        renderInfo(res[0]);
      })
      .catch(err => console.log(err));
    setTimeout(() => refs.countryList.classList.remove('translate'), 200);
    setTimeout(() => refs.countryInfo.classList.add('opacity'), 200);
    console.log(evt, selectedCountry, country);
  };
}

// fetchWeather('london').then(res => console.log(res));

// fetchCountries('georgia').then(r => console.log(r));
// fetchCountries('sudan').then(r => console.log(r));
