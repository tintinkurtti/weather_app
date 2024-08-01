import React from 'react';
import './NowWeather.css';

const NowWeather = ({ weatherDataNow }) => {
    if (!weatherDataNow) {
        // Optionally, render a loading indicator or return null
        return <div>Loading...</div>;
    }
    return (
        <div className="curr_weather">
            <h3>{weatherDataNow.location}, {weatherDataNow.country}</h3>
            <h1>{weatherDataNow.temperature}°C</h1>
            <p>Feels like: {weatherDataNow.feels_like}°C</p>
            <p>Min: {weatherDataNow.temp_min}°C / Max: {weatherDataNow.temp_max}°C</p>
            <img src={weatherDataNow.icon} alt=""/>
            <p>{weatherDataNow.description}</p>
        </div>

    );
}

export default NowWeather;