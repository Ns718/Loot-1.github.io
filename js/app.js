const spinner = document.querySelector('.spinner');
const block = document.querySelector('.block');
const region = document.querySelector('.block__head-region');
const icon = document.querySelector('.block__head-icon');
const tempBlock = document.querySelector('.block__temp');
const tempBaseValue = document.querySelector('.block__temp-base-value');
const tempBaseType = document.querySelector('.block__temp-base-type');
const tempFeelsValue = document.querySelector('.block__temp-feels-value');
const tempFeelsType = document.querySelector('.block__temp-feels-type');
const wind = document.querySelector('.block__addition-wind__info');
const pressure = document.querySelector('.block__addition-pressure__info');
const humidity = document.querySelector('.block__addition-humidity__info');
const descText = document.querySelector('.block__state');

window.addEventListener('load', () => {
	let lon;
	let lat;
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			lon = position.coords.longitude;
			lat = position.coords.latitude;
			const apiNow = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&cnt=5&units=metric&appid=${APIkey}`;
			const apiHourly = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`;
			fetch(apiNow)
				.then((response) => response.json())
				.then((data) => {
					spinner.style.display = 'none';
					spinner.classList.add('animated');
					setTimeout(() => {
						block.style.display = 'flex';
					}, 100);

					let responseData = data;
					let regionData = responseData['name'];
					let desriptionData =
						responseData['weather'][0]['description'];
					let iconData = responseData['weather'][0]['icon'];
					let tempDataBase = Math.round(responseData['main']['temp']);
					let tempDataFeels = Math.round(
						responseData['main']['feels_like']
					);
					region.innerText = regionData;
					let iconURL = `http://openweathermap.org/img/wn/${iconData}@2x.png`;
					icon.innerHTML = `<img src="${iconURL}"></img>`;
					tempBaseValue.innerText = tempDataBase;
					tempFeelsValue.innerText = tempDataFeels;
					descText.innerText = desriptionData;
					wind.innerText = responseData['wind']['speed'];
					pressure.innerText = responseData['main']['pressure'];
					humidity.innerText = responseData['main']['humidity'];
				})
				.catch((err) => console.error(err));

			// fetch(apiHourly)
			// 	.then((response) => response.json())
			// 	.then((data) => {
			// 		console.log(data);
			// 	})
			// 	.catch((err) => console.error(err));
		});
	} else {
		alert('Your browser do not support Geo Location');
	}
});

let tempBlockState = 'c';

tempBlock.addEventListener('click', (e) => {
	const celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;
	const fahrenheitToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;
	if (tempBlockState === 'c') {
		tempBaseValue.innerText = Math.round(
			celsiusToFahrenheit(tempBaseValue.innerText)
		);
		tempFeelsValue.innerText = Math.round(
			celsiusToFahrenheit(tempFeelsValue.innerText)
		);
		tempBaseType.innerText = 'F';
		tempFeelsType.innerText = 'F';
		tempBlockState = 'f';
	} else if (tempBlockState === 'f') {
		tempBaseValue.innerText = Math.round(
			fahrenheitToCelsius(tempBaseValue.innerText)
		);
		tempFeelsValue.innerText = Math.round(
			fahrenheitToCelsius(tempFeelsValue.innerText)
		);
		tempBaseType.innerText = 'C';
		tempFeelsType.innerText = 'C';
		tempBlockState = 'c';
	}
});
