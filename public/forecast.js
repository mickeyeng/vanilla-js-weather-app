// get weather information
const getWeather = async id => {
  const base = `/weather/${id}`;
  const response = await fetch(base);
  const data = await response.json();
  return data[0];
};

// get city information
const getCity = async city => {
  const base = `/weather/location/${city}`;
  const response = await fetch(base);
  const data = await response.json();
  return data[0];
};
