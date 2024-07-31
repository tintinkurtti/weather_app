import React, { useLayoutEffect, useRef } from 'react';
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
    const hourlyWeatherRef = useRef(null);

    useLayoutEffect(() => {
        const handleWheel = (event) => {
            if (event.deltaY !== 0) {
                event.preventDefault();
                const scrollAmount = event.deltaY;
                const scrollStep = scrollAmount / 20;
                let currentScroll = 0;

                const smoothScroll = () => {
                    if (currentScroll < Math.abs(scrollAmount)) {
                        hourlyWeatherRef.current.scrollLeft += scrollStep;
                        currentScroll += Math.abs(scrollStep);
                        window.requestAnimationFrame(smoothScroll);
                    }
                };

                window.requestAnimationFrame(smoothScroll);
            }
        };

        const hourlyWeatherElement = hourlyWeatherRef.current;
        if (hourlyWeatherElement) {
            hourlyWeatherElement.addEventListener('wheel', handleWheel);
        }

        return () => {
            if (hourlyWeatherElement) {
                hourlyWeatherElement.removeEventListener('wheel', handleWheel);
            }
        };
    }, [hourlyWeatherRef]);

    if (!dailyData) {
        return <div>Loading...</div>;
    }

    return (
        <ul className="hourlyWeather" ref={hourlyWeatherRef}>
            {dailyData.map((day, index) => (
                <li key={index} className="hour">
                    <h5>{formatDate(day.date)}</h5>
                    <h4>{formatHour(day.date)}</h4>
                    <img src={day.icon} alt="" />
                    <p>{day.temperature}°C</p>
                </li>
            ))}
        </ul>
    );
};

export default HourlyWeather;