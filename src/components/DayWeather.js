import React from 'react';
import './DayWeather.css'; // Stil för den vertikala listan

const DayWeather = ({ dailyData }) => {
    if (!dailyData) {
        // Optionally, render a loading indicator or return null
        return <div>Loading...</div>;
    }
    return (
        <div className="dailyWeather">
            {dailyData.filter((data, index) => index % 8 === 0).map((day, index) => (
                <div key={index} className="day">
                    <h4>{day.date}</h4>
                    <img src={`http://openweathermap.org/img/w/${day.icon}.png`} alt="" />
                    <p>{day.temperature}°C</p>
                    <p>{day.description}</p>
                </div>
            ))}
        </div>
    );
};

export default DayWeather;