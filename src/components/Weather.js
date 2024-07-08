import React, { useEffect, useState, useRef } from 'react'
import './Weather.css'
import search_icon from '../assets/search_icon.png'

const Weather = () => {

    const API_KEY = '3eee5d4598de74a916e6c327678ed871';
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);
    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setWeatherData({
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: data.weather[0].icon
            })
        } catch (error) {

        }
    }

    useEffect(() => {
        search('London');
    }, [])
  return (
    <div className='weather'>
        <div className='searchbar'>
            <input ref={inputRef} type='text' placeholder='Search...' />
            <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </div>
        <div className='weather__info'>
            <h1>{weatherData.location}</h1>
            <h2>{weatherData.temperature}</h2>
            <h3>Weather</h3>
        </div>
    </div>
  )
}
export default Weather