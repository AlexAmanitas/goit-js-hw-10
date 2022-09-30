import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
// import countryInfo from '../templates/country-info.hbs';
import countryList from './templates/country-list.hbs';

const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

console.log(fetchCountries('ukr'));

const country = fetchCountries('ukr');
country.then(res => console.log(res));

country.then(renderList).catch(er => console.log(er));

function renderList(country) {
  const markUp = countryList(country);
  refs.countryList.insertAdjacentHTML('afterbegin', markUp);
}

// function marcUpList(array) {
//   return array.map(
//     array => `<li class="item">
//   <a href=""><img src="" alt=""><p>${array}</p></a>
// </li>`
//   );
// }
