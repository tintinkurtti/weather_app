import React, { useRef, useState } from 'react';
import search_icon from '../assets/search_icon.png';
import './Header.css';

const Header = ({ search }) => {
    const inputRef = useRef();
    const [showLinks, setShowLinks] = useState(false);

    const quickLinks = ['Stockholm', 'New York', 'Paris', 'Tokyo'];

    const toggleLinks = () => {
        setShowLinks(prevShowLinks => !prevShowLinks);
    };

    const handleCityClick = (city) => {
        search(city);
        setShowLinks(false); // Stänger quick-links listan
    };

    return (
        <header className="header">
            <div className="searchbar">
                <input ref={inputRef} type="text" placeholder="Search..."
                       onKeyPress={(event) => {
                           if (event.key === 'Enter') {
                               search(inputRef.current.value);
                           }
                       }} />
                <img src={search_icon} alt="Search" onClick={() => search(inputRef.current.value)} />
            </div>
            <button className="collapse-button" onClick={toggleLinks}>
                ☰
            </button>
            <div className={`quick-links ${showLinks ? 'show' : ''}`}>
                {quickLinks.map((city) => (
                    <button key={city} onClick={() => handleCityClick(city)}>
                        <h2>{city}</h2>
                    </button>
                ))}
            </div>
        </header>
    );
};

export default Header;