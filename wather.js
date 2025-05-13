 const btn = document.getElementById('btn');
    const city = document.getElementById('city');
    const result = document.getElementById('result');
    const cityname = document.getElementById('cityname');
    const temp = document.getElementById('temp');
    const description = document.getElementById('description');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');
    const pressure = document.getElementById('pressure');
    const icon = document.getElementById('icon');
    const sunrise = document.getElementById('sunrise');

    const apiKey = 'ae0384db882542449fb112729251205';

    btn.addEventListener('click', function () {
      const cityValue = city.value.trim();
      if (cityValue) {
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityValue}&days=1&aqi=yes`)
          .then(response => response.json())
          .then(data => {
            if (data.error) {
              result.innerHTML = `<h3>${data.error.message}</h3>`;
            } else {
              cityname.innerHTML = `City: ${data.location.name}`;
              temp.innerHTML = `Temperature: ${data.current.temp_c}°C`;
              description.innerHTML = `Description: ${data.current.condition.text}`;
              humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
              wind.innerHTML = `Wind Speed: ${data.current.wind_kph} kph`;
              pressure.innerHTML = `Pressure: ${data.current.pressure_mb} mb`;
              icon.innerHTML = `<img src="${data.current.condition.icon}" alt="Weather Icon">`;
              sunrise.innerHTML = `Sunrise: ${data.forecast.forecastday[0].astro.sunrise}`;
            }
          })
          .catch(error => {
            console.error('Error:', error);
            result.innerHTML = `<h3>Failed to fetch weather data. Please try again later.</h3>`;
          });
      } else {
        result.innerHTML = `<h3>Please enter a city name</h3>`;
      }
    });

    // Optional input event listeners
    city.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        btn.click();
      }
    });

    city.addEventListener('input', function () {
      if (city.value === '') {
        result.innerHTML = '';
      }
    });

    city.addEventListener('focus', function () {
      result.innerHTML = '';
    });

    city.addEventListener('paste', function (event) {
      event.preventDefault();
      const pastedData = event.clipboardData.getData('text');
      city.value = pastedData;
    });

    city.addEventListener('cut', function (event) {
      event.preventDefault();
      const cutData = city.value;
      city.value = '';
      result.innerHTML = `<h3>${cutData} has been cut</h3>`;
    });