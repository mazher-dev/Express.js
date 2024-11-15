const express = require('express');
const axios = require('axios'); // Correct spelling of axios
const app = express();
const port = 3000;

app.use(express.json()); // Correct function call for JSON middleware

const API_KEY = 'a8f2354d8f28488de5d6cb8287ad6563';

// Weather route
app.get('/weather', async (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        const weatherData = response.data;

        res.json({
            city: weatherData.name,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description,
            humidity: weatherData.main.humidity,
            windSpeed: weatherData.wind.speed,
        });
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        
        // Handle specific errors (e.g., city not found)
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ error: 'City not found' });
        }
        
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
