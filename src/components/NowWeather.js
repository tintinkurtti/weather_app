import React from 'react';
import './NowWeather.css';
import humidity_icon from "../assets/humidity.png";
import windspeed_icon from "../assets/windspeed.png";

const NowWeather = ({ weatherDataNow }) => {
    if (!weatherDataNow) {
        // Optionally, render a loading indicator or return null
        return <div>Loading...</div>;
    }
    return (
        <div className='weather__info'>
            <h3>{weatherDataNow.location}</h3>
            <h1>{weatherDataNow.temperature}°C</h1>
            <img src={weatherDataNow.icon} alt=""/>
            <h3>{weatherDataNow.description}</h3>
            <p>Feels like: {weatherDataNow.feels_like}°C</p>
            <h4><img src={humidity_icon} alt="" className="humidity_icon"/> {weatherDataNow.humidity}%</h4>
            <h4><img src={windspeed_icon} alt="" className="windspeed_icon"/> {weatherDataNow.windspeed} m/s </h4>
        </div>
    );
}

export default NowWeather;