document.addEventListener("DOMContentLoaded", function () {
    const weatherInfo = document.getElementById("weather-info");
    const cityForm = document.getElementById("city-form");

    // Function to fetch weather data from API
    function fetchWeatherData(city) {
        const apiKey = "91856a765ed48b76fa492890157e2d0d"; // Replace with your API key

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                const temperature = data.main.temp;
                const description = data.weather[0].description;
                const icon = data.weather[0].icon;

                const weatherHTML = `
                    <h2>${city}</h2>
                    <p>Temperature: ${temperature}°C</p>
                    <p>Description: ${description}</p>
                    <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
                `;
                weatherInfo.innerHTML = weatherHTML;
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                weatherInfo.innerHTML = "<p>Error fetching weather data.</p>";
            });
    }

    // Event listener for form submission
    cityForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission
        const city = document.getElementById("city").value.trim(); // Get city from input

        if (city === "") {
            alert("Please enter a city name.");
            return;
        }

        fetchWeatherData(city); // Call fetchWeatherData function with city parameter
    });

    // Fetch weather data when page loads
    fetchWeatherData("Kolkata"); // Default city
});
