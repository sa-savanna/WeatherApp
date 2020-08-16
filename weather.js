const city = document.querySelector(".city")
const description = document.querySelector('.description')
const localTime = document.querySelector('.local-time')
const date = document.querySelector('.date')
const temp = document.querySelector('.temp')
const values = document.querySelectorAll(".value")
const [pressure, humidity, wind] = values;
const imgIcon = document.querySelector('.icon')
const _edit = document.querySelector('._edit img')
const searchDiv = document.querySelector('div.search');




class WeatherApp {
    constructor(city) {
        this.city = city;
        this.API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=f6211bc24c258c57f7a7fba887afdd17`
        this.API_HOURS = `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&appid=f6211bc24c258c57f7a7fba887afdd17`
    }

    getByHours() {
        fetch(this.API_HOURS)
            .then((response) => {
                return response.json()
            })
            .then((data1) => {
                // console.log(data1);
                let hour1 = new Date(data1.list[0].dt_txt).getHours()
                let hour2 = new Date(data1.list[1].dt_txt).getHours()
                let hour3 = new Date(data1.list[2].dt_txt).getHours()
                let hour4 = new Date(data1.list[3].dt_txt).getHours()
                let hour5 = new Date(data1.list[4].dt_txt).getHours()

                var ampm1 = (hour1 >= 12) ? "PM" : "AM";
                var ampm2 = (hour2 >= 12) ? "PM" : "AM";
                var ampm3 = (hour3 >= 12) ? "PM" : "AM";
                var ampm4 = (hour4 >= 12) ? "PM" : "AM";
                var ampm5 = (hour5 >= 12) ? "PM" : "AM";

                document.querySelector('.morning').innerHTML =
                    `<img src='http://openweathermap.org/img/wn/${data1.list[0].weather[0].icon}@2x.png' alt="">
                <span class="hours">${hour1} ${ampm1}</span>`

                document.querySelector('.noon').innerHTML =
                    `<img src='http://openweathermap.org/img/wn/${data1.list[1].weather[0].icon}@2x.png' alt="">
                <span class="hours">${hour2} ${ampm2}</span>`

                document.querySelector('.afternoon').innerHTML =
                    `<img src='http://openweathermap.org/img/wn/${data1.list[2].weather[0].icon}@2x.png' alt="">
                <span class="hours">${hour3} ${ampm3}</span>`

                document.querySelector('.evening').innerHTML =
                    `<img src='http://openweathermap.org/img/wn/${data1.list[3].weather[0].icon}@2x.png' alt="">
                <span class="hours">${hour4} ${ampm4}</span>`

                document.querySelector('.night').innerHTML =
                    `<img src='http://openweathermap.org/img/wn/${data1.list[4].weather[0].icon}@2x.png' alt="">
                <span class="hours">${hour5} ${ampm5}</span>`

            })
            .catch((err) => console.log(err))

    }

    getWeather() {

        fetch(this.API_URL)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                // console.log(data)
                city.innerHTML = data.name;
                description.innerHTML = data.weather[0].description;
                temp.innerHTML = `<span>${Math.floor(data.main.temp - 273.15)}</span><sup class="unit">°C</sup>`;
                imgIcon.innerHTML = `<img src='http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png' alt="">`;
                pressure.innerHTML = `${data.main.pressure} hPa`;
                humidity.innerHTML = `${data.main.humidity}%`;
                wind.innerHTML = `${data.wind.speed} m/sec`;

                let currentTime = new Date();
                var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                document.querySelector('.date').innerHTML = `${days[currentTime.getDay()]}, ${currentTime.getDate()} ${months[currentTime.getMonth()]} ${currentTime.getFullYear()}`;


            })

            .catch((err) => console.log(err))
    }
}






_edit.addEventListener('click', () => {

    _edit.style.display = "none";
    city.style.display = "none";

    const searchInput = `<input type"text" id="searchCity" placeholder="Location">`
    searchDiv.insertAdjacentHTML('afterbegin', searchInput)

    const searchCityInputField = document.getElementById('searchCity');
    searchCityInputField.addEventListener('change', function (e) {
        console.log(searchCityInputField.value)
        let app = new WeatherApp(searchCityInputField.value)
        app.getWeather()
        app.getByHours()
    })

    searchCityInputField.focus();

})

document.body.onload = () => {
    let app = new WeatherApp('Brussels');
    app.getWeather();
    app.getByHours();
    date.innerHTML = ` ${new Date().toJSON().slice(0, 10)}`
}