import React, { useEffect, useRef } from 'react';
import './NowWeatherInfo.css';
import humidity_icon from "../assets/humidity.png";
import windspeed_icon from "../assets/windspeed.png";
import cloud from "../assets/scattered_clouds.png";
import wind_dir from "../assets/wind_dir.png";

const NowWeatherInfo = ({ weatherDataNow }) => {
    const windDirRef = useRef(null);

    useEffect(() => {
        if (windDirRef.current) {
            const degree = weatherDataNow.wind_direction || 0; // Standardvärde om wind_direction är undefined
            windDirRef.current.style.setProperty('--rotate-degree', `${degree}deg`);
            windDirRef.current.style.transform = `rotate(${degree}deg)`;
            windDirRef.current.style.transition = 'transform 1s ease-in-out';
        }
    }, [weatherDataNow.wind_direction]);

    if (!weatherDataNow) {
        return <div>Loading...</div>;
    }

    return (
        <div className="info">
            <div className="cloud_hum">
                <h4><img src={cloud} alt="" className="cloud" />{weatherDataNow.cloudiness}%</h4>
                <h4><img src={humidity_icon} alt="" className="humidity_icon"/> {weatherDataNow.humidity}%</h4>
            </div>
            <div className="windspeed_dir">
                <h4><img src={windspeed_icon} alt="" className="windspeed_icon"/> {weatherDataNow.windspeed} m/s </h4>
                <h4><img src={wind_dir} alt="" className="wind_dir" ref={windDirRef} /></h4>
            </div>
        </div>
    );
}

export default NowWeatherInfo;