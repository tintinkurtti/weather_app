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
            <img src={weatherDataNow.icon} alt=""/>
            <p>{weatherDataNow.description}</p>
        </div>

    );
}

export default NowWeather;