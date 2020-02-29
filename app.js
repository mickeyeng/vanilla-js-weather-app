const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = data => {
  const { cityDets, weather } = data;

  // update details template
  details.innerHTML = `
  <h2>${cityDets.EnglishName}</h2>
  <p>${weather.WeatherText}</>
    <p id="weather-condition">${weather.Temperature.Metric.Value}<span> &deg;C</span></p>
  `;

  // update the night / day & icon images
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);

  let timeSrc = null;
  weather.isDayTime ? (timeSrc = 'img/day.svg') : (timeSrc = 'img/night.svg');
  time.setAttribute('src', timeSrc);

  // remove the d-none class if present
  card.classList.contains('d-none') ? card.classList.remove('d-none') : null;
};

const updateCity = async city => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);
  return { cityDets, weather };
};

cityForm.addEventListener('submit', e => {
  // prevent default action
  e.preventDefault();

  // get city value
  const city = cityForm.city.value.trim();

  // set local storage
  localStorage.setItem('city', city);

  // update the ui with new city
  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});

if (localStorage.getItem('city')) {
  updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}
