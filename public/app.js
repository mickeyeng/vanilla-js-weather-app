const cityForm = document.querySelector('form');
const heading = document.querySelector('.nav');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const checkbox = document.querySelector('checkbox');

// Toggle dark mode
document.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  details.classList.toggle('dark');
  card.classList.toggle('dark');
  heading.classList.toggle('dark');
});

const updateUI = data => {
  const { cityDetails, weather } = data;

  details.innerHTML = `
  <h2>${cityDetails.EnglishName}</h2>
  <p>${weather.WeatherText}</>
    <p id="weather-condition">${weather.Temperature.Metric.Value}<span> &deg;C</span></p>
  `;

  // update the night / day & icon images
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);

  let timeSrc = null;
  weather.isDayTime ? (timeSrc = 'img/day.svg') : (timeSrc = 'img/night.svg');
  time.setAttribute('src', timeSrc);

  card.classList.contains('d-none') ? card.classList.remove('d-none') : null;
};

const updateCity = async city => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);
  return { cityDetails, weather };
};

cityForm.addEventListener('submit', e => {
  e.preventDefault();

  const city = cityForm.city.value.trim();

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
