import React from 'react';
import './NowWeatherInfo.css';
import humidity_icon from "../assets/humidity.png";
import windspeed_icon from "../assets/windspeed.png";

const NowWeatherInfo = ({ weatherDataNow }) => {
    if (!weatherDataNow) {
        // Optionally, render a loading indicator or return null
        return <div>Loading...</div>;
    }
    return (
        <div className="hum_win">
            <h4>Feels like: {weatherDataNow.feels_like}°C</h4>
            <h4>Min: {weatherDataNow.temp_min}°C / Max: {weatherDataNow.temp_max}°C</h4>
            <h4>Cloud coverage: {weatherDataNow.cloudiness}%</h4>
            <h4><img src={humidity_icon} alt="" className="humidity_icon"/> {weatherDataNow.humidity}%</h4>
            <h4><img src={windspeed_icon} alt="" className="windspeed_icon"/> {weatherDataNow.windspeed} m/s </h4>
        </div>
    );
}

export default NowWeatherInfo;