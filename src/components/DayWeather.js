import React from 'react';
import './DayWeather.css'; // Stil för den vertikala listan


function getDayOfWeek(dateString) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    return days[dayOfWeek];
}

const DayWeather = ({ dailyData }) => {
    if (!dailyData) {
        // Optionally, render a loading indicator or return null
        return <div>Loading...</div>;
    }

    const filteredData = dailyData.filter((day) => day.date.includes("12:00:00"));

    return (
        <div className="dailyWeather">
            {filteredData.map((day, index) => (
                <div key={index} className="day">
                    <h4>{getDayOfWeek(day.date)}</h4>
                    <img src={day.icon} alt=""/>
                    <p>{day.temperature}°C</p>
                    <p>{day.description}</p>
                </div>
            ))}
        </div>
    );
};

export default DayWeather;