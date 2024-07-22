import React, { useEffect, useState, useRef } from 'react'
import './Weather.css'
import DayWeather from './DayWeather';
import NowWeather from "./NowWeather";
import search_icon from '../assets/search_icon.png'
import humidity_icon from '../assets/humidity.png'
import windspeed_icon from '../assets/windspeed.png'
import clear_sky from '../assets/clear_sky.png'
import clear_sky_n from '../assets/clear_sky_n.png'
import few_clouds from '../assets/few_clouds.png'
import few_clouds_n from '../assets/few_clouds_n.png'
import scattered_clouds from '../assets/scattered_clouds.png'
import scattered_clouds_n from '../assets/scattered_clouds_n.png'
import shower_rain from '../assets/shower_rain.png'
import shower_rain_n from '../assets/shower_rain_n.png'
import rain from '../assets/rain.png'
import rain_n from '../assets/rain_n.png'
import thunderstorm from '../assets/thunderstorm.png'
import thunderstorm_n from '../assets/thunderstorm_n.png'
import snow from '../assets/snow.png'
import snow_n from '../assets/snow_n.png'
import mist from '../assets/mist.png'
import mist_n from '../assets/mist_n.png'


const Weather = () => {
    const API_KEY = '3eee5d4598de74a916e6c327678ed871';
    const inputRef = useRef();
    const [weatherDataNow, setWeatherDataNow] = useState({});
    const [weatherDataForecast, setWeatherDataForecast] = useState({});

    const Icons = {
        '01d': clear_sky,
        '02d': few_clouds,
        '03d': scattered_clouds,
        '04d': scattered_clouds,
        '09d': shower_rain,
        '10d': rain,
        '11d': thunderstorm,
        '13d': snow,
        '50d': mist,
        '01n': clear_sky_n,
        '02n': few_clouds_n,
        '03n': scattered_clouds_n,
        '04n': scattered_clouds_n,
        '09n': shower_rain_n,
        '10n': rain_n,
        '11n': thunderstorm_n,
        '13n': snow_n,
        '50n': mist_n
    }

    const search = async (city) => {
        try {
            const urlNow = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
            const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

            const responseNow = await fetch(urlNow);
            const responseForecast = await fetch(urlForecast);

            const dataNow = await responseNow.json();
            const dataForecast = await responseForecast.json();
            const icon_now = Icons[dataNow.weather[0].icon];


            console.log(dataForecast);
            console.log(dataNow);
            setWeatherDataNow({
                temperature: Math.floor(dataNow.main.temp),
                location: dataNow.name,
                icon: icon_now,
                feels_like: Math.floor(dataNow.main.feels_like),
                windspeed: dataNow.wind.speed,
                humidity: dataNow.main.humidity,
                description: dataNow.weather[0].description,
            });

            setWeatherDataForecast({
                daily: dataForecast.list.filter((day) => day.dt_txt.includes("12:00:00")).map((day) => {
                    return {
                        temperature: Math.floor(day.main.temp),
                        icon: Icons[day.weather[0].icon],
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
        <div className="topbar">
            <NowWeather weatherDataNow={weatherDataNow} />
            <DayWeather dailyData={weatherDataForecast.daily} />
        </div>
    </div>
  )
}
export default Weather