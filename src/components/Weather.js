import React, { useEffect, useState, useRef } from 'react'
import './Weather.css'
import search_icon from '../assets/search_icon.png'
import DayWeather from './DayWeather';
import HourlyWeather from "./HourlyWeather";

const Weather = () => {
    const API_KEY = '3eee5d4598de74a916e6c327678ed871';
    const inputRef = useRef();
    const [weatherDataNow, setWeatherDataNow] = useState({});
    const [weatherDataForecast, setWeatherDataForecast] = useState({});

    const search = async (city) => {
        try {
            const urlNow = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
            const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

            const responseNow = await fetch(urlNow);
            const responseForecast = await fetch(urlForecast);

            const dataNow = await responseNow.json();
            const dataForecast = await responseForecast.json();
            console.log(dataForecast);
            console.log(dataNow);
            setWeatherDataNow({
                temperature: Math.floor(dataNow.main.temp),
                location: dataNow.name,
                icon: dataNow.weather[0].icon,
                feels_like: Math.floor(dataNow.main.feels_like),
                humidity: dataNow.main.humidity,
                description: dataNow.weather[0].description,
            });

            setWeatherDataForecast({
                daily: dataForecast.list.map((day) => {
                    return {
                        temperature: Math.floor(day.main.temp),
                        icon: day.weather[0].icon,
                        description: day.weather[0].description,
                        date: day.dt_txt
                    };
                })
            });

        } catch (error) {
            console.log(error);
            alert('City not found. Please try another search.');
        }
    }

    useEffect(() => {
        search('Stockholm');
    }, [])

    return (
        <div className='weather'>
            <div className='searchbar'>
                <input ref={inputRef} type='text' placeholder='Search...'
                       onKeyPress={(event) => {
                           if (event.key === 'Enter') {
                               search(inputRef.current.value);
                           }
                       }}/>
                <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
            </div>
            <div className='weather__info'>
                <h1>{weatherDataNow.location}</h1>
                <h2>{weatherDataNow.temperature}°C</h2>
                <img src={`http://openweathermap.org/img/w/${weatherDataNow.icon}.png`} alt=""/>
                <h3>{weatherDataNow.description}</h3>
                <p>Feels like: {weatherDataNow.feels_like}°C</p>
                <p>Humidity: {weatherDataNow.humidity}%</p>
            </div>
            <HourlyWeather dailyData={weatherDataForecast.daily} />
            <DayWeather dailyData={weatherDataForecast.daily} />
        </div>
    )
}
export default Weather