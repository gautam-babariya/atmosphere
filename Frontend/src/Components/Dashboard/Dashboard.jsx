import React from 'react';
import './Dashboard.css';
import sunrise from './storage/sunrise.svg'
import sunset from './storage/sunset.svg'
import Humidity from './storage/humidity.svg'
import Pressure from './storage/pressure.svg'
import uv from './storage/uv.svg'
import wind from './storage/wind.svg'
import sun from './storage/sunsvg.svg'

const Dashboard = () => {
    return (
        <div className="dashboard-div">
            <div className="temperature-div">
                <div>
                    <h1>24°C</h1>
                    <p>Feels like: 22°C</p>
                </div>
                <div className="detail-item-dash2">
                    <img src={sunrise} alt='sunset' />
                    <div className='sunadjust'>
                        <p>Sunrise</p>
                        <p>06:37 AM</p>
                    </div>
                </div>
                <div className="detail-item-dash2">
                    <img src={sunset} alt='sunset' />
                    <div className='sunadjust'>
                        <p>Sunset</p>
                        <p>20:37 PM</p>
                    </div>
                </div>
            </div>
            <div className="weather-info">
                <div className="sun-icon">
                    <img src={sun} alt='sun' />
                </div>
                <h2>Sunny</h2>
            </div>
            <div className="details-dash">
                <div className='two-items' >
                    <div className="detail-item-dash">
                        <img src={Humidity} alt='humidity' />
                        <p>41%</p>
                        <p>Humidity</p>
                    </div>
                    <div className="detail-item-dash">
                    <img src={wind} alt='wind' />
                        <p>2 km/h</p>
                        <p>Wind Speed</p>
                    </div>
                </div>
                <div className='two-items' >
                    <div className="detail-item-dash">
                    <img src={Pressure} alt='pressure' />
                        <p>997 hPa</p>
                        <p>Pressure</p>
                    </div>
                    <div className="detail-item-dash">
                    <img src={uv} alt='uv' />
                        <p>8</p>
                        <p>UV Index</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;