import React from 'react';
import './HourlyWeather.css';

const formatDate = (dateString) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date(dateString);
    const dayOfWeek = days[date.getDay()];
    return `${dayOfWeek}`;
};

const formatHour = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

const HourlyWeather = ({ dailyData }) => {
    if (!dailyData) {
        return <div>Loading...</div>;
    }
    return (
        <div className="hourlyWeather">
            {dailyData.map((day, index) => (
                <div key={index} className="hour">
                    <h5>{formatDate(day.date)}</h5>
                    <h4>{formatHour(day.date)}</h4>
                    <img src={day.icon} alt="" />
                    <p>{day.temperature}°C</p>
                </div>
            ))}
        </div>
    );
};

export default HourlyWeather;