import React from 'react';
import './HourlyWeather.css'; // Stil för den vertikala listan

const HourlyWeather = ({ dailyData }) => {
    if (!dailyData) {
        // Optionally, render a loading indicator or return null
        return <div>Loading...</div>;
    }
    return (
        <div className="hourlyWeather">
            {dailyData.map((day, index) => (
                <div key={index} className="hour">
                    <h4>{day.date}</h4>
                    <img src={day.icon} alt="" />
                    <p>{day.temperature}°C</p>
                    <p>{day.description}</p>
                </div>
            ))}
        </div>
    );
};

export default HourlyWeather;