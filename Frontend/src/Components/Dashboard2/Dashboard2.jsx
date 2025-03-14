import React from 'react';
import './Dashboard2.css';

const Dashboard2 = () => {
    return (
        <div className="dashboard2">
            <h2 className="dashboard-title">Weekly Temperature Overview</h2>
            <div className="chart-container">
                <svg className="temperature-chart" viewBox="0 0 700 200">
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#cfe2f3', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#b6d7a8', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    <path d="M 50 150 C 100 50, 200 50, 250 150 S 400 250, 700 150" fill="url(#gradient)" stroke="#000" strokeWidth="2" />
                    <circle className="highlight-point" cx="250" cy="50" r="5" />
                    <line className="dashed-line" x1="250" y1="150" x2="250" y2="50" />
                    <text className="value-label" x="260" y="40">3°</text>
                </svg>
                <div className="day-labels">
                    <span className="day">Mon</span>
                    <span className="day">Tue</span>
                    <span className="day">Wed</span>
                    <span className="day">Thu</span>
                    <span className="day">Fri</span>
                    <span className="day">Sat</span>
                    <span className="day">Sun</span>
                </div>
            </div>
        </div>
    );
};

export default Dashboard2;